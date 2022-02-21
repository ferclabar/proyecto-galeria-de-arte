"use strict";

import {photosAPI} from "/js/api/photos.js ";
import {messageRenderer} from "/js/renderers/messages.js ";
import {sessionManager} from "/js/utils/session.js ";
import { validateUpload } from "./validators/validateUpload.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    if(photoId!==null){
        loadCurrentPhoto();
    }
    let form = document.getElementById("edit/upload");
    form.onsubmit = handleEditPhoto;
}

function loadCurrentPhoto() {
    let title = document.getElementById("title");
    let url = document.getElementById("url");
    let des = document.getElementById("description");
    let vis = document.getElementById("vis");
    let name=document.getElementById("namee");
    name.textContent = "Editing a photo";
    photosAPI.getByPhotoId(0,photoId)
        .then(photos => {
            currentPhoto = photos[0];
            url.value = currentPhoto.url;
            title.value = currentPhoto.title;
            des.value = currentPhoto.description;
            if(currentPhoto.visibility==="Private"){
                vis.checked=true;
            }
                })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleEditPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let vis = document.getElementById("vis");
    if(vis.checked===true){
        formData.append("visibility", "Private");
    }else{
        formData.append("visibility", "Public");
    }
    

    if(currentPhoto!==null){
        let errors = validateUpload.validateUpload(formData);
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);
        if (errors.length > 0) {
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
            for (let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        } else {
            photosAPI.update(photoId, formData)
            .then(data => window.location.href = `picture.html?photoId=${currentPhoto.photoId}`)
            .catch(error => messageRenderer.showMessageAsAlert(error));
        }
    }else{
        let errors = validateUpload.validateUpload(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        // Add the current user ID
        formData.append("userId", sessionManager.getLoggedUser().userId);//sessionManager.getLoggedId()
        photosAPI.create(formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
    }

    
}


document.addEventListener("DOMContentLoaded", main);