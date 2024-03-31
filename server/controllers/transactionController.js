const Transaction = require("../models/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { CF_CLIENT_APP_ID, CF_CLIENT_SECRET_KEY, CF_API_VERSION } = require("../config");

const { Cashfree } = require("cashfree-pg");
const User = require("../models/userModel");

Cashfree.XClientId = CF_CLIENT_APP_ID;
Cashfree.XClientSecret = CF_CLIENT_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user._id });

  res.send(transactions);
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id).populate("user");

  console.log({ transaction });

  if (transaction.user._id.toString() !== req.user._id.toString()) {
    return next(new AppError("Forbidden", 403));
  }

  if (transaction.status === undefined) {
    const order = await Cashfree.PGFetchOrder(CF_API_VERSION, req.params.id);

    const orderStatus = order.data.order_status;
    console.log({ orderStatus });

    if (orderStatus === "PAID") {
      transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { status: true },
        { new: true, runValidators: true }
      ).populate("user");

      await User.findByIdAndUpdate(req.user._id, {
        wallet: {
          money: req.user.wallet.money + transaction.amount * (transaction.ride ? -1 : 1),
        },
      });
    }
  }

  res.send(transaction);
});
