const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('products', {
        productId: {
            field: 'product_id',
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DOUBLE
    }, {
        timestamps: false
    });
};
