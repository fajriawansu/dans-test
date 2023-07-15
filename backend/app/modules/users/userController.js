const userService = require("./userService");
const jwt = require("jsonwebtoken");

class UserController {
  static async create(req, res, next) {
    try {
      const { username, password } = req.body;

      const data = await userService.createUser(username, password);

      return res.json(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
        const { username, password } = req.body;
      const data = await userService.login(username, password, req.app.get("secretKey"));

      return res.json(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async authenticate(req, res, next) {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.SECRETKEY);

      return res.json(decoded);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = UserController;
