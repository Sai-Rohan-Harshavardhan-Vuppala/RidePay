const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  stops: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stop",
      },
    ],
    validate: {
      validator: function (arr) {
        return arr.length >= 2;
      },
      message: (props) => `${props.path} must have at least 2 elements`,
    },
  },
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
