" use strict ";
import { parseHTML } from "/js/utils/parseHTML.js";
import {usersAPI} from "/js/api/users.js";
import {marksAPI} from "/js/api/marks.js";
import { sessionManager } from "/js/utils/session.js ";
const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
        <div class="card">
            <img src="${photo.url}">
            <div class="card-body">
                <img class="logouser" src="" alt="">
                <p class="mark"></p>
                <a href="/picture.html?photoId=${photo.photoId}" class="btn btn-outline-primary btn-block">See details...</a>
            </div>

        </div>
    </div>`;
        let card = parseHTML ( html ) ;
       loadUserAvatar(card,photo.userId);
       loadMark(card,photo.photoId);
        return card;
    },


    loadMark:function (card,photoId){
        let p = card.querySelector ("span.finalMark") ;
            p.textContent = "0";
        marksAPI.getByPhotoId ( photoId )
        .then ( marks => {
            let number=0;
            let total=0;
            for (let mark of marks) {
                if(mark.mark!==null){
                    total=total+mark.mark;
                    number=number+1;
                }
            }
            let final = total/number;
            let final2 = final.toFixed();
            let p = card.querySelector ("span.finalMark") ;
            p.textContent = final2;
        })
        .catch( error =>null);
    }

};

function loadUserAvatar (card , userId ) {
    usersAPI.getById ( userId )
        .then ( users => {
            let avatar = users[0].avatarUrl;
            let p = card.querySelector ("img.logouser") ;
            p.src = avatar;
            
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




export{photoRenderer};

