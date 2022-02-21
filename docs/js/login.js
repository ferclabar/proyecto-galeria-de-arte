" use strict ";
import { messageRenderer } from "./renderers/messages.js";
import { loginValidator } from "./validators/validateLogin.js";

import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";


function main() {
   let registerForm = document.getElementById("enter-form");
   registerForm.onsubmit = handleSubmitLogin;
}

function handleSubmitLogin(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = loginValidator.validateLogin(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        sendEnter(formData);
    }
}

function sendEnter(formData) {
    authAPI.login(formData)
        .then(loginData => {
            console.log(loginData);
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = `profile.html?userId=${loggedUser.userId}`;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);