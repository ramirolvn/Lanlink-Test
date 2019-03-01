import axios from "axios";

import { GET_ERRORS} from "./types";


export const registerSection = (transictionData, history) => dispatch => {
  axios
    .post("/api/sections/registerSection", transictionData)
    .then(res => {alert("Department Saved")})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllSections = (callback) => dispatch =>{
  axios
    .get("/api/sections/getAllSections")
    .then(res => callback(null,res.data))
    .catch(err =>
      callback(err,null)
    );
};