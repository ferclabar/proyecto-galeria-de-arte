"use strict";
import {parseHTML} from "/js/utils/parseHTML.js";
import { sessionManager } from "/js/utils/session.js ";
import {usersAPI} from "/js/api/users.js";
import {marksAPI} from "/js/api/marks.js";
import {messageRenderer} from "/js/renderers/messages.js";
const pictureRenderer = {
    asCard: function (photo) {
        let html = `<div>
        <img src="${photo.url}" class="img">
        <p><a href="profile.html?userId=${photo.userId}" class="user"></a></p>
        <p>Title: ${photo.title}</p>
        <p>Descripción: ${photo.description}</p>
        <p class="mark"></p>
        <a class="ratephoto" href="/rate.html?photoId=${photo.photoId}" class="btn btn-outline-primary btn-block ratephoto">Rate</a><br>
        <a class="editphoto"  href="/post.html?photoId=${photo.photoId}" class="btn btn-outline-primary btn-block editphoto">Edit</a><br>
        <a class="deletephoto" href="" id="deletephoto"  class="btn btn-outline-primary deletephoto btn-block">Delete</a>
        </div>`;
        let card = parseHTML(html);
        loadUser(card,photo.userId);
        loadMark(card,photo.photoId);
        if(sessionManager.isLogged()){
            card.querySelector ("a.ratephoto").style='display:inline;'
            if(sessionManager.getLoggedUser().userId===photo.userId){
                card.querySelector ("a.editphoto").style='display:inline;'
                card.querySelector ("a.deletephoto").style='display:inline;color: red;" style="border: red;'
                }else{
                    card.querySelector ("a.editphoto").style='display:none;'
                card.querySelector ("a.deletephoto").style='display:none;color: red;" style="border: red;'
                }
            }else{
                card.querySelector ("a.editphoto").style='display:none;'
                card.querySelector ("a.deletephoto").style='display:none;color: red;" style="border: red;'
                card.querySelector ("a.ratephoto").style='display:none;'
            }

        //photoRenderer.loadMark(det,photo.photoId);
        return card;
    }

};

function loadUser (card , userId ) {
    usersAPI.getById ( userId )
        .then ( users => {
            let username = users[0].username;
            let p = card.querySelector ("a.user") ;
            p.textContent = username;
        }) ;
};

function loadMark(card,photoId){
    let p = card.querySelector ("p.mark") ;
            p.textContent = "Mark: 0/5";
        marksAPI.getByPhotoId ( photoId )
        .then ( marks => {
            let mark=marks[0].rate;
            if(mark!==null){
                p.textContent = `Mark: ${mark}/5`;
            }
        })
        .catch( error =>messageRenderer.showErrorMessage(error));
    };



export {pictureRenderer};