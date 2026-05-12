const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(err);

  });

/* =========================
   MOBILE SCHEMA
========================= */

const MobileSchema =
  new mongoose.Schema(

    {

      shopName: String,

      mobileBrand: String,

      mobileModel: String,

      mobileIssue: String,

      mobileParts: [String],



     



      entryDate: String,

      status: {

        type: String,

        default: "Pending",

      },

    },

    {

      timestamps: true,

    }

  );

const Mobile =
  mongoose.model(
    "Mobile",
    MobileSchema
  );

/* =========================
   SHOP SCHEMA
========================= */

const ShopSchema =
  new mongoose.Schema(

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

const Shop =
  mongoose.model(
    "Shop",
    ShopSchema
  );

/* =========================
   USER SCHEMA
========================= */

const UserSchema =
  new mongoose.Schema(

    {

      shopName: String,

      username: {

        type: String,

        unique: true,

      },

      password: String,

      role: {

        type: String,

        default: "shop",

      },

    },

    {

      timestamps: true,

    }

  );

const User =
  mongoose.model(
    "User",
    UserSchema
  );

/* =========================
   HOME
========================= */

app.get("/", (req, res) => {

  res.send(
    "Backend Running"
  );

});

/* =========================
   SHOP ROUTES
========================= */

/* ADD SHOP */

app.post(
  "/api/shop/add",

  async (req, res) => {

    try {

      const shop =
        await Shop.create(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Shop Added Successfully",

        data: shop,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* GET SHOPS */

app.get(
  "/api/shop/all",

  async (req, res) => {

    try {

      const shops =
        await Shop.find();

      res.status(200).json({

        success: true,

        data: shops,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* UPDATE SHOP */

app.put(
  "/api/shop/update/:id",

  async (req, res) => {

    try {

      const updatedShop =

        await Shop.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

          }

        );

      res.status(200).json({

        success: true,

        message:
          "Shop Updated Successfully",

        data: updatedShop,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* DELETE SHOP */

app.delete(
  "/api/shop/delete/:id",

  async (req, res) => {

    try {

      await Shop.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        success: true,

        message:
          "Shop Deleted Successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* =========================
   MOBILE ROUTES
========================= */

/* ADD MOBILE */

app.post(
  "/api/mobile/add",

  async (req, res) => {

    try {

      const mobile =
        await Mobile.create(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Mobile Added Successfully",

        data: mobile,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* GET ALL MOBILES */

app.get(
  "/api/mobile/all",

  async (req, res) => {

    try {

      const mobiles =
        await Mobile.find();

      const updatedMobiles =

        mobiles.map((item) => {

          const today =
            new Date();

          const entryDate =
            new Date(
              item.entryDate
            );

          const diffTime =

            today.getTime() -

            entryDate.getTime();

          const diffDays =
            Math.floor(

              diffTime /

              (1000 *
                60 *
                60 *
                24)

            );

          let remainingDays =
            3 - diffDays;

          if (
            remainingDays < 0
          ) {

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

        message:
          error.message,

      });

    }

  }
);

/* GET SHOP MOBILES */

app.get(
  "/api/mobile/shop/:shopName",

  async (req, res) => {

    try {

      const mobiles =

        await Mobile.find({

          shopName:
            req.params.shopName,

        });

      res.status(200).json({

        success: true,

        data: mobiles,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* UPDATE MOBILE */

app.put(
  "/api/mobile/update/:id",

  async (req, res) => {

    try {

      const updatedMobile =

        await Mobile.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

          }

        );

      res.status(200).json({

        success: true,

        message:
          "Mobile Updated Successfully",

        data: updatedMobile,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* UPDATE STATUS */

app.put(
  "/api/mobile/status/:id",

  async (req, res) => {

    try {

      const updatedStatus =

        await Mobile.findByIdAndUpdate(

          req.params.id,

          {

            status:
              req.body.status,

          },

          {

            new: true,

          }

        );

      res.status(200).json({

        success: true,

        message:
          "Status Updated Successfully",

        data: updatedStatus,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* DELETE MOBILE */

app.delete(
  "/api/mobile/delete/:id",

  async (req, res) => {

    try {

      await Mobile.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        success: true,

        message:
          "Mobile Deleted Successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* =========================
   USER ROUTES
========================= */

/* CREATE USER */

app.post(
  "/api/user/create",

  async (req, res) => {

    try {

      const user =
        await User.create(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "User Created Successfully",

        data: user,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* LOGIN */

app.post(
  "/api/user/login",

  async (req, res) => {

    try {

      const user =
        await User.findOne({

          username:
            req.body.username,

          password:
            req.body.password,

        });

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid Username or Password",

        });

      }

      res.status(200).json({

        success: true,

        data: user,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server Running On Port ${PORT}`

  );

});