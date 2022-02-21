" use strict ";

import { sessionManager } from "../utils/session.JS";
import { validateWords } from "/js/validators/validateWords.js ";
const validateUpload = {
    validateUpload: function ( formData ) {
        let errors = [];

        let title = formData.get ("title") ;
        let url = formData.get ("url") ;
        let desc=formData.get("description");
        
        if(!sessionManager.isLogged()){
            errors.push("You must be logged");
        }

        let badtitle=validateWords.validateWords(title);
        let baddes=validateWords.validateWords(desc);
        if(badtitle>0 || baddes>0){
            errors.push("The there are non-correct words in the title or description");
        }
        if (title.length<1){
            errors.push("Title is too short");
        }
        
        return errors;
    },

};
export {validateUpload};