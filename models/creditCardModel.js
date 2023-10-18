'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CreditCards extends Model {
        static associate(models) {
            CreditCards.belongsTo(models.users);
        }
    }
    CreditCards.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cardNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'credit_cards',
            indexes: [
                {
                    fields: ['id'],
                    using: 'BTREE',
                    name: 'credit_cards_id_btree_index',
                },
                {
                    fields: ['fullName'],
                    using: 'BTREE',
                    name: 'credit_cards_fullName_btree_index',
                },
                {
                    fields: ['cardNumber'],
                    using: 'BTREE',
                    name: 'credit_cards_cardNumber_btree_index',
                },
            ],
        }
    );
    return CreditCards;
};
