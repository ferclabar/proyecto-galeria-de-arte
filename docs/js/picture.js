" use strict "

import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
import { marksAPI } from "./api/marks.js";
import {photosAPI} from "/js/api/photos.js";
import {pictureRenderer} from "/js/renderers/pictureRenderer.js";


let urlParams = new URLSearchParams ( window.location.search ) ;
let photoId = urlParams.get("photoId");

function main () {
    let photoContainer = document.querySelector("div.include");
    photosAPI.getByPhotoId(0, photoId)
        .then(photos => {
            let photoDetails = pictureRenderer.asCard(photos[0]);
            photoContainer.appendChild(photoDetails);
            let del=photoContainer.querySelector ("a.deletephoto");
            del.onclick=handleDelete;
        })
        .catch( error => messageRenderer.showErrorMessage(error));

        
    }


function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo ?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener ("DOMContentLoaded", main) ;