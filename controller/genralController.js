const { addRole, getAllRoles } = require("../modules/roleModule");

const { TempDetail } = require("../models");

const { findAndUpdateUser } = require("../modules/userModule");

const { createHash } = require("../utils/utils");

module.exports.addRoles = async (req, res, next) => {
  try {
    const { role, privilegeRank } = req.body;

    if (!role) {
      let error = new Error("role is required");
      error.statusCode = 400;
      next(error);
    }
    if (!privilegeRank) {
      let error = new Error("privilegeRank is required");
      error.statusCode = 400;
      next(error);
    }

    let [error, newRole] = await addRole(req.body);

    if (error) {
      next(error);
      return;
    }

    res.status(200).json(newRole);
  } catch (error) {
    // new Error(error.message)
    next(error);
  }
};

module.exports.getRoles = async (req, res, next) => {
  try {
    let [error, allRoles] = await getAllRoles({});
    if (error) {
      next(error);
      return;
    }

    res.status(200).json(allRoles);
  } catch (error) {
    next(error);
  }
};

module.exports.getResetPaswword = async (req, res, next) => {
  let { tempId } = req.params;

  let details = await TempDetail.findById(tempId);
  console.log(
    "🚀 ~ file: genralController.js:56 ~ module.exports.getResetPaswword= ~ details:",
    details
  );

  res.status(422).render("reset", {
    userId: details.userId,
    name: details.name,
  });
};

module.exports.resetPassword = async (req, res, next) => {
  // console.log(req.body, "pppppppp");
  const { userId, password } = req.body;

  const encryptedPassword = await createHash(password);

  let [error, update] = await findAndUpdateUser(
    { _id: userId },
    { password: encryptedPassword }
  );

  if (error) {
    return next(error);
  }

  if (update) {
    console.log(
      "🚀 ~ file: genralController.js:83 ~ module.exports.resetPassword= ~ update:",
      update
    );
    let resp = await TempDetail.findOneAndDelete({ userId });
    console.log(
      "🚀 ~ file: genralController.js:88 ~ module.exports.resetPassword= ~ resp:",
      resp
    );
  }

  res.send("<h2>Congratulations, Your Password is Set Now");
};
