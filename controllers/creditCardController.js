// Import models
const usersModel = require('../models').users;
const creditCardModel = require('../models').credit_cards;

//Import controllers
const globalController = require('./globalController');

//Import files
const {
    successObjectResponse,
    errorObjectResponse,
    successArrayResponse,
    errorArrayResponse,
} = require('../utils/response');
const { IsNullOrEmpty, IsNotNullOrEmpty } = require('../utils/enum');
const { creditCardMessages } = require('../utils/messages');
const Sequelize = require('sequelize');
const db = require('../models/index');
module.exports = {

    /*
      * Register
      * name : string
      * email : email
      * password : string
      */
    async addCreditCard(req, res) {
        let successObjectRes = successObjectResponse;
        let errorObjectRes = errorObjectResponse;
        try {
            const { fullName, cardNumber } = req.body;
            let newCardId = '';
            await db.sequelize.transaction(
                {
                    deferrable: Sequelize.Deferrable.SET_DEFERRED,
                },
                async (t1) => {
                    const existingUserCardDetails = await globalController.getModuleDetails(
                        creditCardModel,
                        'findOne',
                        { cardNumber: cardNumber, userId: req.headers.loggedInUserId },
                        ['id'],
                        true
                    );
                    if (IsNotNullOrEmpty(existingUserCardDetails.id)) {
                        throw new Error(creditCardMessages.userCreditCardAlreadyExists);
                    } else {
                        const luhnCardValidator = await globalController.luhnCardValidator(cardNumber);
                        if (luhnCardValidator) {
                            await creditCardModel
                                .create(
                                    { fullName, cardNumber, userId: req.headers.loggedInUserId },
                                    { transaction: t1 }
                                )
                                .then(async (newUserCardDetails) => {
                                    if (IsNotNullOrEmpty(newUserCardDetails.id)) {
                                        newCardId = newUserCardDetails.id;
                                    } else {
                                        throw new Error(creditCardMessages.cardCreationFail);
                                    }
                                })
                                .catch(async (error) => {
                                    let message =
                                        await globalController.getMessageFromErrorInstance(error);
                                    if (message) {
                                        throw new Error(message);
                                    } else {
                                        throw new Error(error.message);
                                    }
                                });
                        } else {
                            throw new Error(creditCardMessages.cardVerificationFail);
                        }
                    }
                }
            );
            successObjectRes.message = creditCardMessages.cardVerificationSuccess;
            successObjectRes.data = await globalController.getModuleDetails(
                creditCardModel,
                'findOne',
                { id: newCardId },
                ['id', 'fullName', 'cardNumber'],
                true
            );
            res.status(201).send(successObjectRes);
        } catch (error) {
            errorObjectRes.message = error.message;
            res.status(400).send(errorObjectRes);
        }
    },


    async getUserCreditCards(req,res){
    let successArrRes = successArrayResponse;
    let errorArrRes = errorArrayResponse;
    try {
        const userCreditCardDetails = await globalController.getModuleDetails(
          creditCardModel,
          'findAll',
          { userId : req.headers.loggedInUserId },
          ['id','fullName','cardNumber'],
          false,
          [
            {   
              model: usersModel,
              attributes: ['id'],
            },
          ],
          [['updatedAt', 'DESC']],
        );
        successArrRes.message = creditCardMessages.userCreditCardDetailsFound;
        successArrRes.data = IsNotNullOrEmpty(userCreditCardDetails)?  userCreditCardDetails:  [];
      res.status(201).send(successArrRes);
    } catch (error) {
      errorArrRes.message = error.message;
      res.status(400).send(errorArrRes);
    }
  },


    async deleteCreditCard(req, res) {

    },
};

