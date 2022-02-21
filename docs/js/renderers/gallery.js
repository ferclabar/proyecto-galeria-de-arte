"use strict";
import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRenderer} from "./photoRenderer.js";
import { sessionManager } from "/js/utils/session.js ";
    const galleryRenderer = {
        asCardGallery: function(photos) {
            let galleryContainer = parseHTML ( '<div class="photo-gallery"> </div > ');
            let row = parseHTML ( '<div class="row text-center"> </div>') ;
            galleryContainer.appendChild (row) ;
            let counter = 0;
            for(let photo of photos){
                if(sessionManager.isLogged()){
                    if(sessionManager.getLoggedUser().userId===photo.userId){
                        let card = photoRenderer.asCard(photo);
                row.appendChild(card);
                counter += 1;
                if ( counter % 3 === 0) {
                    row = parseHTML ('<div class="row"> </div >');
                    galleryContainer.appendChild(row);
                }
                    }else{
                        if(photo.visibility==="Public"){
                            let card = photoRenderer.asCard(photo);
                            row.appendChild(card);
                            counter += 1;
                            if ( counter % 3 === 0) {
                                row = parseHTML ('<div class="row"> </div >');
                                galleryContainer.appendChild(row);
                            }
                        }
                    }
                }else{
                    if(photo.visibility==="Public"){
                        let card = photoRenderer.asCard(photo);
                        row.appendChild(card);
                        counter += 1;
                        if ( counter % 3 === 0) {
                            row = parseHTML ('<div class="row"> </div >');
                            galleryContainer.appendChild(row);
                        }
                    }
                }
 
            }

        return galleryContainer;
        }
    };
export {galleryRenderer};