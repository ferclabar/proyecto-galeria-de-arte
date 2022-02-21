"use strict"
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import {usersAPI} from "/js/api/users.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main () {
    usersAPI.getById(userId)
    .then (users => {
        let username = users[0].username;
        let avatar=users[0].avatarUrl;
        let name=users[0].name;
        let surname=users[0].username;
        let email=users[0].email
        let puser = document.querySelector ("h1.username") ;
        puser.textContent = username;
        let pname = document.querySelector ("p.nombre") ;
        pname.textContent = "Nombre: "+name;
        let psur = document.querySelector ("p.apellidos") ;
        psur.textContent = "Apellidos: "+surname;
        let pemail = document.querySelector ("p.email") ;
        pemail.textContent = "Email: "+email;
        let i = document.querySelector ("img.avatarperfil") ;
        i.src=avatar;
    }) ;

    let galleryContainer = document.querySelector("div.include") ;
    
    photosAPI.getUserPhotos(userId)
        .then(photos => {
            
            let gallery = galleryRenderer.asCardGallery(photos) ;
            galleryContainer.appendChild(gallery);
        })
        .catch( error => {
                messageRenderer.showErrorMessage(error);
    });
}
document.addEventListener ("DOMContentLoaded", main ) ;