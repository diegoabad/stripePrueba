const Stripe = require('stripe');

require('dotenv').config();
const STRIPE_SECRET = process.env.STRIPE_SECRET;

class PaymentService{
    constructor(){
        this.stripe = new Stripe(STRIPE_SECRET);
    }
    //Mandar intencion de pago y recibir el ID de esa intencion de pago 
    async createPaymentIntent(data){
        return this.stripe.paymentIntents.create(data);
    }
}

const stripe = new Stripe(STRIPE_SECRET);
const checkout = async(req,res) =>{
    //INTENCION DE PAGO
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    product_data:{
                        name:"PC GAMER",
                        description: "bla bla bla"
                    },
                    currency:'usd',
                    unit_amount:200000
                },
                quantity:3
            },
            {
                price_data:{
                    product_data:{
                        name:"HELADERA",
                        description: "bla bla bla"
                    },
                    currency:'usd',
                    unit_amount:1000000
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:'http://localhost:8080/api/payments/success',
        cancel_url: "http://localhost:8080/api/payments/cancel",
    })
    return res.json(session);
}

const success = (req,res)=>{
    res.send("PAGO EXITOSO");
}

const cancel = (req,res)=>{
    res.send("PAGO FALLIDO");
}

module.exports = {
    PaymentService,
    checkout,
    success,
    cancel
}