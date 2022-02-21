" use strict ";
import { validateWords } from "/js/validators/validateWords.js ";
const registerValidator = {
    validateRegister: function ( formData ) {
        let errors = [];

        let name = formData.get("name");
        let surname = formData.get("surname");
        let username = formData.get("username");
        let email = formData.get("email");
        let pass = formData.get("password") ;
        let pass2 = formData.get("reppassword") ;
        
        if (name.length<3 | surname.length<3){
            errors.push("The first and last name should have more than 3 characters ");
        }

        if (pass!==pass2){
            errors.push("The passwords doesn't match");
        }
        let malname=validateWords.validateWords(username);
        if(malname>0){
            errors.push("The there are non-correct words in the username");
        }
        return errors;
    }


};
export {registerValidator};