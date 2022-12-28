const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { response } = require('express');

const axios = require('axios').default;
const stripe = require('stripe')(process.env.STRIPESECRETKEY);



exports.getCheckoutSession = catchAsync(async (req, res, next) => {

    // 2) create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/failed',
        line_items: [
            {
                name: `${req.body.tickets.quantity} tickets for match: ${req.body.matchNumber} category: ${req.body.tickets.category}`,
                amount: req.body.tickets.price *100 ,
                currency: 'usd',
                quantity: req.body.tickets.quantity,
                description: 'FIFA World Cup Ticket Reservation'
            }
        ],

    });


    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session
    });


});

////////////////////////////////////////////////////////////////////////



