const express = require('express');
const cors = require('cors');
const app = express();
const paymentRouter = require('./routes/payments.router.js')

require('dotenv').config();

app.use(cors());
app.use('/api/payments/',paymentRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Todo bien")
})