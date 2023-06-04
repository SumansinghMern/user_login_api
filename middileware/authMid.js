const { decryptJwt } = require("../utils/utils");

module.exports.isAdmin = (req, res, next) => {
  try {
    // console.log(req, "AAAAAAAAAAA");
    if (!req.headers.authorization) {
      let error = new Error("User Not authorize");
      error.statusCode = 401;
      return next(error);
    }

    let token = req.headers.authorization.split("|")[1];

    if (token === req.session.token) {
      let data = decryptJwt(token);
      if (data && data.privilegeRank === 1) {
        console.log(data.privilegeRank, "AAAAAAAAAAUUUTHH");
        req.userId = data.userId;
        next();
        return;
      }
    }

    let error = new Error("User Not authorize");
    error.statusCode = 401;
    next(error);
  } catch (error) {
    next(error);
  }
};

module.exports.isSuperUser = (req, res, next) => {
  try {
    // console.log(req, "AAAAAAAAAAA");
    if (!req.headers.authorization) {
      let error = new Error("User Not authorize");
      error.statusCode = 401;
      return next(error);
    }

    let token = req.headers.authorization.split("|")[1];

    if (token === req.session.token) {
      let data = decryptJwt(token);
      if (data && data.privilegeRank === 2) {
        console.log(data.privilegeRank, "AAAAAAAAAAUUUTHH");
        req.userId = data.userId;
        next();
        return;
      }
    }

    let error = new Error("User Not authorize");
    error.statusCode = 401;
    next(error);
  } catch (error) {
    next(error);
  }
};

module.exports.isUser = (req, res, next) => {
  try {
    // console.log(req, "AAAAAAAAAAA");
    if (!req.headers.authorization) {
      let error = new Error("User Not authorize");
      error.statusCode = 401;
      return next(error);
    }

    let token = req.headers.authorization.split("|")[1];

    if (token === req.session.token) {
      let data = decryptJwt(token);
      if (data && data.privilegeRank === 3) {
        console.log(data.privilegeRank, "AAAAAAAAAAUUUTHH");
        req.userId = data.userId;
        next();
        return;
      }
    }

    let error = new Error("User Not authorize");
    error.statusCode = 401;
    next(error);
  } catch (error) {
    next(error);
  }
};

module.exports.isLogedIn = (req, res, next) => {
  try {
    // console.log(req, "AAAAAAAAAAA");
    if (!req.headers.authorization) {
      let error = new Error("User Not authorize");
      error.statusCode = 401;
      return next(error);
    }

    let token = req.headers.authorization.split("|")[1];
    console.log(
      req.session.token,
      "🚀 ~ file: authMid.js:100 ~ req.headers.authorization:",
      token
    );

    if (token === req.session.token) {
      let data = decryptJwt(token);

      req.userId = data.userId;
      next();
      return;
    }

    let error = new Error("User Not authorize");
    error.statusCode = 401;
    next(error);
  } catch (error) {
    next(error);
  }
};
