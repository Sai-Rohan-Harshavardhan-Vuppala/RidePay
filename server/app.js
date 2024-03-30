const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const requestLogger = require("./utils/requestLogger");

const authRouter = require("./routes/authRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const userRouter = require("./routes/userRoutes");
const fileRouter = require("./routes/fileRoutes");

const app = express();

app.enable("trust proxy");
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

app.use(cors(corsOptions));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use(compression());

app.use(requestLogger);

// 3) ROUTES
// app.use("/", viewRouter);
app.use("/api/v1/vehicle", vehicleRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
