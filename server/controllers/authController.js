const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const userController = require("../controllers/userController");
const User = require("../models/userModel");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN_DAYS,
} = require("../config");

const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage" // <- LEAVE THIS AS-IS! Do NOT insert your actual redirect URI
);

const verifyJwt = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    return { payload: ticket.getPayload() };
  } catch (err) {
    throw new AppError("Unauthorized", 401);
  }
};

const signToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_IN_DAYS}d`,
  });
};

const login = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  if (!code) return next(new AppError(`Missing "code" in request body`, 400));

  const { tokens } = await client.getToken(code);
  const { id_token: idToken } = tokens;

  if (!idToken) return next(new AppError("Unauthorized", 401));

  const verification = await verifyGoogleToken(idToken);

  const profile = verification.payload;

  let user;
  const { email, given_name: firstName, family_name: lastName } = profile;
  user = await User.findOne({ email });

  if (!user) {
    user = {
      email,
      name: `${firstName} ${lastName}`,
    };

    user = await User.create(user);
  }

  // sign and set JWT with email and role
  const token = signToken(user.email);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + JWT_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Login successful!", user });
});

const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.send({ message: "Logout successful" });
});

const isLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("No token provided.", 403));
  }

  try {
    const decoded = await verifyJwt(token, JWT_SECRET);

    if (!decoded.email) throw "invalid";

    const user = await User.findOne({ email: decoded.email });

    if (!user) throw "invalid";

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError("Unauthorized! Token is invalid or expired.", 401));
  }
});

const getLoginStatus = catchAsync(async (req, res, next) => {
  console.log({ user: req.user });
  res.send(req.user);
});

module.exports = { logout, isLoggedIn, getLoginStatus, login };
