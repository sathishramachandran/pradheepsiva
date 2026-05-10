const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },

    mobileBrand: {
      type: String,
      required: true,
    },

    mobileModel: {
      type: String,
      required: true,
    },

    mobileIssue: {
      type: String,
      required: true,
    },

    entryDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mobile", mobileSchema);