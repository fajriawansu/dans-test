const { default: axios } = require("axios");
const { FieldException } = require("../../handler/errorHandler");

class JobController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {*} next 
     */
  static async getJobList(req, res, next) {
    try {
      const creatorId = req.user.userId;
      const { description, location, full_time, page } = req.query;
      console.log({description, location, full_time, page})

      if (!creatorId) throw new FieldException(400, "not authenticated", "USERID");

      let baseUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${description ?? ""}`;

      if(location){
        baseUrl += `&location=${location}`
      }
      if(full_time){
        baseUrl += `&full_time=${full_time}`
      }
      if(page){
        baseUrl += `&page=${page}`
      }

      console.log(baseUrl)

      const data = await axios.get(baseUrl);

      return res.json(data.data);
    } catch (e) {
      console.log("error")
      next(e);
    }
  }

  static async getJobDetail(req, res, next){
    try {
      console.log("ASW")
      const { jobId } = req.params;
      let baseUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${jobId}`;
      const data = await axios.get(baseUrl);
      console.log(data)
      return res.json(data.data);
    } catch (e) {
      console.log("error")
      next(e);
    }
  }
}

module.exports = JobController;
