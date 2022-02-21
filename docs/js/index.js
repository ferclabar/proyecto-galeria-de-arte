" use strict "

import {photosAPI} from "/js/api/photos.js";
import {galleryRenderer} from "/js/renderers/gallery.js";
import {messageRenderer} from "/js/renderers/messages.js";

function main () { 
    let galleryContainer = document.querySelector("div.include") ;

    photosAPI.getAll()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos) ;
            galleryContainer.appendChild(gallery);
        })
        .catch( error => messageRenderer.showErrorMessage(error));
}
document.addEventListener ("DOMContentLoaded", main) ;