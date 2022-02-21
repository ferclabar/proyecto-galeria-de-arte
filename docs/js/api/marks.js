" use_strict ";
import {BASE_URL , requestOptions} from "./common.js";
    const marksAPI = {

        getByPhotoId: function(photoId){
            return new Promise (function (resolve , reject){
                axios
                .get(`${BASE_URL}/marks/${photoId} `,requestOptions)
                .then(response => resolve ( response.data))
                .catch(error => reject ( error.response.data.message));
            }) ;
        } ,


        create: function (formData) {
            return new Promise(function (resolve, reject) {
                axios
                    .post(`${BASE_URL}/marks`, formData, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            });
        },

        update: function (userId,photoId, formData) {
            return new Promise(function (resolve, reject) {
                axios
                    .put(`${BASE_URL}/marks/${userId}/${photoId} `, formData, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            });
        },

    };
    
export {marksAPI};
