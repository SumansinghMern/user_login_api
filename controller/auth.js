const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { createHash, compare, signJwt, decryptJwt } = require("../utils/utils");

exports.signUp = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let status = req.body.status;
    let role = req.body.role;

    let hashedPassword = await createHash(password);

    let user = new User({
      email: email,
      name: name,
      password: hashedPassword,
      status,
      role,
    });

    let createdUser = await user.save();

    res.status(201).json({
      message: "User is created Successfully!",
      data: createdUser,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser = await User.findOne({ email: email }).populate("role");
    console.log(
      "🚀 ~ file: auth.js:45 ~ exports.login= ~ loadedUser:",
      loadedUser
    );
    if (!loadedUser) {
      const error = new Error("USer Not Found");
      error.statusCode = 404;
      throw error;
    }

    let isEqual = await compare(password, loadedUser.password);
    console.log("🚀 ~ file: auth.js:56 ~ exports.login= ~ isEqual:", isEqual);

    if (!isEqual) {
      const error = new Error("Wrong Password!");
      error.statusCode = 401;
      throw error;
    }

    let payload = {
      userId: loadedUser._id.toString(),
      role: loadedUser.role.role,
      privilegeRank: loadedUser.role.privilegeRank,
    };

    // create JWT token
    const token = signJwt(payload);
    console.log("🚀 ~ file: auth.js:71 ~ exports.login= ~ token:", token);

    req.session.userId = loadedUser._id;
    req.session.token = token;
    req.session.privilegeRank = loadedUser.role.privilegeRank;

    res.send({
      message: "User LogedIn",
      data: {
        token: token,
        userId: loadedUser._id.toString(),
        privilegeRank: loadedUser.role.privilegeRank,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
