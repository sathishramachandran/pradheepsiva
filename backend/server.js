const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* =========================
   MOBILE SCHEMA
========================= */

const MobileSchema = new mongoose.Schema(
  {
    shopName: String,

    mobileBrand: String,

    mobileModel: String,

    mobileIssue: String,

    entryDate: String,

    status: {
      type: String,
      default: "Pending",
    },

    remainingDays: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Mobile = mongoose.model("Mobile", MobileSchema);

/* =========================
   SHOP SCHEMA
========================= */

const ShopSchema = new mongoose.Schema(
  {
    shopName: String,

    ownerName: String,

    mobileNumber: String,

    address: String,
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", ShopSchema);

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Backend Running");
});

/* =========================
   ADD SHOP
========================= */

app.post("/api/shop/add", async (req, res) => {
  try {

    const shop = await Shop.create(req.body);

    res.status(201).json({
      success: true,
      message: "Shop Added Successfully",
      data: shop,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET ALL SHOPS
========================= */

app.get("/api/shop/all", async (req, res) => {
  try {

    const shops = await Shop.find();

    res.status(200).json(shops);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   ADD MOBILE
========================= */

app.post("/api/mobile/add", async (req, res) => {
  try {

    const mobile = await Mobile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Mobile Added Successfully",
      data: mobile,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET ALL MOBILES
========================= */

app.get("/api/mobile/all", async (req, res) => {
  try {

    const mobiles = await Mobile.find();

    const updatedMobiles = mobiles.map((item) => {

      const today = new Date();

      const entry = new Date(item.entryDate);

      const diffTime = today - entry;

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      let remainingDays = 3 - diffDays;

      if (remainingDays < 0) {
        remainingDays = 0;
      }

      return {
        ...item._doc,
        remainingDays,
      };
    });

    res.status(200).json({
      success: true,
      data: updatedMobiles,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE MOBILE
========================= */

app.delete("/api/mobile/delete/:id", async (req, res) => {
  try {

    await Mobile.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Mobile Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   UPDATE MOBILE
========================= */

app.put("/api/mobile/update/:id", async (req, res) => {
  try {

    const updatedMobile = await Mobile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Mobile Updated Successfully",
      data: updatedMobile,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   UPDATE STATUS
========================= */

app.put("/api/mobile/status/:id", async (req, res) => {
  try {

    const updatedStatus = await Mobile.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      data: updatedStatus,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   SERVER
========================= */

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
/* =========================
   DELETE SHOP
========================= */

app.delete("/api/shop/delete/:id", async (req, res) => {

  try {

    await Shop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shop Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

app.put("/api/shop/update/:id", async (req, res) => {

  try {

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Shop Updated Successfully",
      data: updatedShop,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});