 "use strict"

import {sessionManager} from "./utils/session.js";

function main(){
    showUser();
    addLogoutHandler();
    
}

function addLogoutHandler () {
    let logoutButton = document.getElementById("out");
    logoutButton.addEventListener("click",function() {
    sessionManager.logout () ;
    window.location.href = " index.html ";
    }) ;
}

function showUser () {
    let login = document.getElementById("login") ;
    let out=  document.getElementById("out") ;
    let post=  document.getElementById("post") ;
    let me=  document.getElementById("me") ;
    if ( sessionManager.isLogged()) {
        login.style="display:none;";
        out.style="display:inline;";
        post.style="display:inline;";
        me.style="display:inline;";
        me.href=null;
        me.href=`profile.html?userId=${sessionManager.getLoggedUser().userId}`;
    } else {
        out.style="display:none;";
        login.style="display:inline;";
        post.style="display:none;";
        me.style="display:none;";
    }
}


    

    
document.addEventListener ("DOMContentLoaded", main ) ;