const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const factory = require("./handlerFactory");
const User = require("../models/userModel");

exports.updateUser = catchAsync(async (req, res, next) => {
  const phone = req.body?.phone;
  const photo = req.file?.filename;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { phNo: phone, photo },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    user: updatedUser,
  });
});

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);
