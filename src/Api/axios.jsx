import axios from "axios";
const axiosInstance = axios.create({
    // 1 .local instance of firebase function
    baseURL:"http://127.0.0.1:5001/clone-4a33b/us-central1/api"
//    2 .// deployed version of firebase functions
    // baseURL: " https://api-4gq7f4cawq-uc.a.run.app",
// 3 version  , deployed version of azazon server on render.comg
    // baseURL:"https://amazon-api-deploy-1-lnnr.onrender.com"
});
export{axiosInstance};