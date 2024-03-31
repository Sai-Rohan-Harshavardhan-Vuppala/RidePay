const catchAsync = require("../utils/catchAsync");

const { CF_CLIENT_APP_ID, CF_CLIENT_SECRET_KEY, CF_API_VERSION } = require("../config");
const Transaction = require("../models/transactionModel");

const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = CF_CLIENT_APP_ID;
Cashfree.XClientSecret = CF_CLIENT_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const createPayment = catchAsync(async (req, res, next) => {
  const { orderAmount, returnUrl } = req.body;

  const customerId = req.user._id.toString();
  const customerEmail = req.user.email;
  const customerPhone = req.user.phNo;
  const customerName = req.user.name;

  // const order = await sdk.pGCreateOrder(
  //   {
  //     customer_details: {
  //       customer_id,
  //       customer_email,
  //       customer_phone,
  //     },
  //     order_amount,
  //     order_currency: "INR",
  //     return_url,
  //     order_meta: { return_url },
  //   },
  //   { "x-api-version": "2023-08-01" }
  // );

  const transaction = await Transaction.create({
    amount: orderAmount,
    user: req.user._id,
  });

  const orderId = transaction._id.toString();

  var data = {
    order_amount: orderAmount,
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: customerId,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      customer_name: customerName,
    },
    order_meta: {
      return_url: `${returnUrl}/${orderId}`,
    },
  };

  const order = await Cashfree.PGCreateOrder(CF_API_VERSION, data);

  res.send({ order: order.data });

  // const link = await pg.orders.res.send(order);
});

module.exports = { createPayment };
