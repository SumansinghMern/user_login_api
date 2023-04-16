const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let JWT_SECRET = "superscreate123string";

module.exports.createHash = (string) => bcrypt.hash(string, 12);

module.exports.compare = (givenPassword, password) =>
  bcrypt.compare(givenPassword, password);

module.exports.signJwt = (payload) => jwt.sign(payload, JWT_SECRET);

module.exports.decryptJwt = (token) => jwt.verify(token, JWT_SECRET);

let transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sumansinghfire7870@gmail.com",
    pass: "attudxuropcsosrv",
  },
});

module.exports.sendSingleMail = async (email, url) =>
  new Promise(async (resolve, reject) => {
    try {
      const mailOptions = {
        from: "sumansinghfire7870@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<h3>You SignUp Successfully! </h3>
              <p> Please reset your Plassword by Clicking on ${url} </p>
            `,
      };

      let responce = await transpoter.sendMail(mailOptions);
      console.log(
        "🚀 ~ file: utils.js:41 ~ module.exports.sendSingleMail= ~ responce:",
        responce
      );

      resolve([false, responce]);
    } catch (error) {
      resolve([error, {}]);
    }
  });

module.exports.myBase = "http://localhost:8081";
