const jwt = require("jsonwebtoken");

const secret = process.env.SECRETKEY;

const verifyToken = (req, res, next) => {

  const ber = req.headers["authorization"].split(' ')[0] === 'Bearer';
  if (!ber) {
    return res.status(401).send({error : "No bearer auth!! "});
  }

  const token =
    req.body.token || req.query.token || req.headers["authorization"].split(' ')[1];

    // console.log(req)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    // console.log(decoded)
  } catch (err) {
    return res.status(401).send({error : err});
  }
  return next();
};

module.exports = verifyToken;