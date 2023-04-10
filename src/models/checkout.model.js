const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product_orders', {
        id: {
            field: 'product_id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        orderId: {
            field: 'order_id',
            type: DataTypes.STRING,
        },
        productId: {
            field: 'product_id',
            type: DataTypes.STRING
        },
        count: DataTypes.INTEGER,
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        }
    }, {
        timestamps: false
    });
};
