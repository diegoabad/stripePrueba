const express = require('express');
const router = express.Router();
const {PaymentService,checkout,success,cancel} = require('../services/payments.service.js');

const products = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
]

router.post('/payment-intents', async(req,res)=>{
    const product = products.find(p=>p.id== parseInt(req.query.id));
    const info = {
        amount: product.price,
        currency: 'usd'
    }
    const paymentService = new PaymentService();
    const result = await paymentService.createPaymentIntent(info);
    res.json({status:'success',payload:result})
})

router.get('/checkout',checkout);
router.get('/success',success);
router.get('/cancel',cancel);

module.exports = router;