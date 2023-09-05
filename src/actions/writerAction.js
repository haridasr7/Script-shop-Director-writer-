import axios from "axios";
import { scriptsRequest, scriptsSuccess, scriptsFail } from '../slices/writerslice';

export const getAllScripts = (writerId) => async (dispatch) => {
    console.log(writerId)
  dispatch(scriptsRequest());

  try {
    let response = await axios.get(`/api/v1/getallscripts/${writerId}`);

    console.log(response);

    const scripts = await Promise.all(
      response.data.map(async (item) => {
        let fileUrl;
        if (item.imageFile) {
          const response1 = await axios.get(`/api/v1/getImage/${item.imageFile}`, {
            responseType: 'blob',
          });
          fileUrl = URL.createObjectURL(response1.data);
        }

    
        return {
        ...item,fileUrl
        };
      })
    );
console.log(scripts)
    dispatch(scriptsSuccess(scripts));
  } catch (error) {
    console.log(error);
    dispatch(scriptsFail(error.response.data.message));
  }
};