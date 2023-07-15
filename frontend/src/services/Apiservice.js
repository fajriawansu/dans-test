import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getToken = () => {
    return localStorage.getItem("dans_test_token");
}

const invokeGet = async (url) => {
    return axios.get(url, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        if (err.response.status == 401) {
            return {
                data: {
                    message: "Unauthorized"
                }
            }
        }

        return err.response;
    });
}

const invokePostNoAuth = (url, body) => {
    return axios.post(url, JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        if (err.response.status == 401) {
            return {
                data: {
                    message: "Unauthorized"
                }
            }
        }

        return err.response;
    })
}

///////////////
// user service
///////////////

const userLogin = async (username, password) => {
    const apiResult = await invokePostNoAuth(BASE_URL + "/users/login", {
        username,
        password
    })

    if(apiResult?.data?.token) localStorage.setItem("dans_test_token", apiResult?.data?.token)
    return apiResult
}

const userRegister = async (username, password) => {
    const apiResult = await invokePostNoAuth(BASE_URL + "/users/register", {
        username,
        password
    })

    return apiResult
}

const userAuthentication = async () => {
    const token = getToken();
    const apiResult = await invokePostNoAuth(BASE_URL + "/users/authenticate", {
        token
    })

    return apiResult
}

const UserService = {
    userLogin,
    userRegister,
    userAuthentication
}

///////////////
// job service
///////////////

const getJobList = async (page, description, location, full_time) => {
    let baseUrl = BASE_URL + `/jobs?desccription=${description}`
    if(location){
        baseUrl += `&location=${location}`
      }
      if(full_time){
        baseUrl += `&full_time=${full_time}`
      }
      if(page){
        baseUrl += `&page=${page}`
      }
    const apiResult = await invokeGet(baseUrl)

    return apiResult
}

const getJobDetail = async (jobId) => {
    const apiResult = await invokeGet(BASE_URL + `/jobs/${jobId}`)

    return apiResult
}

const JobService = {
    getJobList,
    getJobDetail
}

const Apiservice = {
    invokeGet,
    invokePostNoAuth,
    UserService,
    JobService
}

export default Apiservice