const { QueryTypes } = require('sequelize');
const _ = require('lodash');
const uuid4 = require('uuid4');
const {
    models: { 
        product_orders: productOrders
    },
  } = require('../models');
const sequelize = require('../models');

exports.getAllproducts = (req, res) => {
    const productDetails = 'select p.product_id, p.title, p.description, p.price, i.count from products p join inventory i on p.product_id = i.product_id where i.count > 0'
    sequelize.query(productDetails, { type: QueryTypes.SELECT }). then((data) => {
        res.status(200).send({
            success : true,
            data,
        });
    }).catch((err) => {
        res.status(500).send({
            success : false,
            error: err
        });
    })

};

exports.checkoutProduct = (req, res) => {
    const { body } = req;
    const { coupon, products } = body;
    if(products.length > 0) {
        const uid = uuid4();
        const countData = [];
        const orderData = products.map((val) => {
            const queryData = `update inventory set count = (count - ${val.count}) where product_id = '${val.productId}'`;
            countData.push(sequelize.query(queryData, { type: QueryTypes.UPDATE }));
            return {
                orderId: uid,
                productId: val.productId,
                count: val.count,
                updatedAt: new Date(),
                coupon,
            }
        });
        productOrders.bulkCreate(orderData).then(async (resData) => {
            Promise.all(countData).then(() => {
                res.status(200).send({
                    success: true,
                    orderId: uid,
                    message: 'Order Placed Successfully.'
                })
            }).catch((error)=> {
                res.status(409).send({
                    success: false,
                    message: 'Your transaction was unsuccessful, please check your details and try again.'
                })
            })
        }).catch((err) => {
            res.status(409).send({
                success: false,
                message: 'Your transaction was unsuccessful, please check your details and try again.'
            })
        })
    } else {
        res.status(400).send({
            success: false,
            message: 'Cart Product list Empty'
        });
    }
};

exports.getAllOrders = (req, res) => {
    const getOrders = 'select sum(po.count) count,  sum(po.count * p.price) price, po.order_id from product_orders po join products p on po.product_id = p.product_id GROUP BY po.order_id'
    sequelize.query(getOrders, { type: QueryTypes.SELECT }).then((resData) => {
        res.status(200).send({
            success: true,
            data: resData
        })
    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        });
    })
};


exports.getOrderDetails = (req, res) => {
    const {params} = req;
    const {productOrderId} = params;
    const discount = `select discountPrice, code from coupons where code = (select distinct(coupon) from product_orders po where order_id = '${productOrderId}')`;
    const productData = `select p.*, po.count count from products p join product_orders po on po.product_id = p.product_id where po.order_id = '${productOrderId}'`;
    const totalamount = `select sum(po.count * p.price) total_price from product_orders po join products p on po.product_id = p.product_id where po.order_id = '${productOrderId}'`;
    const queryArr = [
        sequelize.query(discount, { type: QueryTypes.SELECT }),
        sequelize.query(productData, { type: QueryTypes.SELECT }),
        sequelize.query(totalamount, { type: QueryTypes.SELECT })
    ];
    Promise.all(queryArr).then((resData) => {
        const [couponData, productData, totalamount] = resData;
        const amountOwed =  _.isEmpty(couponData[0]) ? totalamount[0].total_price :(totalamount[0].total_price - ((totalamount[0].total_price/100)* couponData[0].discountPrice));
        const data = {
            coupon: _.isEmpty(couponData[0]) ? '' : couponData[0].code,
            product: productData,
            totalAmount: totalamount[0].total_price,
            amountOwed,
        }
        res.status(200).send({
            success: true,
            data: data
        });
    }).catch((err) => {
        console.log(err);
    })
}