const { createUser, findUser, findAllUsers ,deletUser} = require("../modules/userModule");
const { createHash } = require("../utils/utils");

const { sendSingleMail, myBase } = require("../utils/utils");

const { TempDetail } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = "active.123";
    let name = req.body.name;
    let status = req.body.status;
    let role = req.body.role;

    let hashedPassword = await createHash(password);

    const [err, checkUser] = await findUser({ email });

    if (err) {
      return next(err);
    }

    if (checkUser) {
      let err = new Error("User already Exist with this Email");
      err.statusCode = 403;
      return next(err);
    }

    let userData = {
      email: email,
      name: name,
      password: hashedPassword,
      status,
      role,
    };

    let [error, savedUser] = await createUser(userData);

    if (error) {
      next(error);
      return;
    }

    let tempDetails = {
      userId: savedUser._id,
      name: savedUser.name,
    };

    let newTemp = await TempDetail.create(tempDetails);

    let url = `${myBase}/getResetPassword/${newTemp._id}`;

    // Send Mail to User
    let [mailerr, responce] = await sendSingleMail(email,url);

    if (mailerr) {
      console.log(
        "🚀 ~ file: userController.js:47 ~ module.exports.createUser= ~ mailerr:",
        mailerr
      );
    }

    res.status(201).json({
      message: "User is created Successfully!",
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    let { skip, limit } = req.query;

    let [error, allUsers] = await findAllUsers({ skip, limit });

    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(
      "🚀 ~ file: adminController.js:56 ~ module.exports.getAllUser= ~ error:",
      error
    );
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    let {userId, email} = req.body;

    if(!email){
      let err = new Error("Email is Required!");

      return next(err)
    }

    let [error,deletedUser] = await deletUser({email: email});
    if(error){
      return next(error)
    }

    res.status(200).json({
      message: "USer is Deleted",
      data: deletedUser,
    });

  } catch (error) {
    console.log("🚀 ~ file: userController.js:93 ~ module.exports.deleteUser ~ error:", error)
    next(error)
  }
}
