const catchAsync = require("../utils/catchAsync");

const { CF_CLIENT_APP_ID, CF_CLIENT_SECRET_KEY } = require("../config");

const sdk = require("api")("@cashfreedocs-new/v4#rnh0j17lu9sysws");
sdk.auth(CF_CLIENT_APP_ID);
sdk.auth(CF_CLIENT_SECRET_KEY);

const createPaymentLink = catchAsync(async (req, res, next) => {
  const { order_amount, return_url } = req.body;

  const customer_id = req.user.__id.toString();
  const customer_email = req.user.email;
  const customer_phone = req.user.phone;

  const order = await sdk.pGCreateOrder(
    {
      customer_details: {
        customer_id,
        customer_email,
        customer_phone,
      },
      order_amount,
      order_currency: "INR",
      return_url,
      order_meta: { return_url },
    },
    { "x-api-version": "2023-08-01" }
  );

  console.log({ order });
});

module.exports = { createPaymentLink };
