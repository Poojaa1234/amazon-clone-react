const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51IqgItSJC3ZBNQN59d5fJYezJQ7RVkz9nAlx98SVL4bpZ76EM0TDhXTGJl3CnDbevVdiAH9zn7LUN4nkxf2m7p6c00k4TpDydO')

// API

// App config
const app = express();
// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get('/',(request,response)=> response.status(200).send("hello World"));

app.post('/payments/create', async (request,response)=>{
    const total = request.query.total;

    console.log('Payment Request Received BOOM!!! for this amount >>>',total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,  // Subunits of currency
        currency: "usd",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-808c2/us-central1/api
