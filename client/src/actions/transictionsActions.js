import axios from "axios";

import { GET_ERRORS } from "./types";


export const registerTransictions = (transictionData, history) => dispatch => {
  axios
    .post("/api/transictions/registerTransiction", transictionData)
    .then(res => {alert("Transiction Saved")})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllTransictions = (callback) => dispatch =>{
  axios
    .get("/api/transictions/getAllTransictions")
    .then(res => callback(null,res.data))
    .catch(err =>
      callback(err,null)
    );
};

export const getUserTransictions = (userSection,callback) => dispatch =>{
  axios
    .post("/api/transictions/getUserTransictions", userSection)
    .then(res => callback(null,res.data))
    .catch(err =>
      callback(err,null)
    );
};
