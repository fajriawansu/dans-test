const { User } = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { FieldException } = require("../../handler/errorHandler");
const saltRounds = bcrypt.genSaltSync(10);

class UserService {
  async createUser(username, password) {
    let resp;
    let user = await User.findOne({ username });
    const encryptedPass = bcrypt.hashSync(password.toString(), saltRounds);

    if (user) {
      if (!user) throw new FieldException(400, "user already exist", "USER");
    } else {
      user = await new User({username, password: encryptedPass}).save();
      resp = {status: 200, message: "User Registered Successfuly"}
      console.log(
        new Date().getSeconds(),
        new Date(new Date().getTime() + 10000).getSeconds()
      );
    }

    return resp;
  }

  async login(username, password, secret) {
    let user = await User.findOne({username});

    if (!user) throw new FieldException(400, "user not found", "USER");

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user._id, username: user.username }, secret, {
        expiresIn: "48h",
      });
      return { token };
    } else throw new FieldException(400, "wrong username or password", "USER");
  }
}

module.exports = new UserService();
