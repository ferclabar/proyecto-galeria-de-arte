"use strict"

import {sessionManager} from "./utils/session.js";
import { marksAPI } from "./api/marks.js";

let urlParams = new URLSearchParams ( window.location.search ) ;
let photoId = urlParams.get("photoId");

function main () {

    let form=document.getElementById("valuate");
    form.onsubmit=handleEvaluatePhoto;


    }


function handleEvaluatePhoto(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedUser().userId);
    formData.append("photoId", photoId);
    
        marksAPI.create(formData)
                .then(data => window.location.href = `picture.html?photoId=${photoId}`)
                .catch(error=>{
                    marksAPI.update(sessionManager.getLoggedUser().userId,photoId,formData)
                    .then(data => window.location.href = `picture.html?photoId=${photoId}`)
                    .catch( error => messageRenderer.showErrorMessage(error));
                });
    

}


document.addEventListener ("DOMContentLoaded", main) ;