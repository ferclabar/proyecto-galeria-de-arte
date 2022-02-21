"use strict";
const loginValidator={
    validateLogin: function ( formData ) {
        let errors = [];

        let username = formData.get("username");
        let password = formData.get("password");
    
        if (password===null | username=== null){
            errors.push("Email and password can't be null");
        }
        return errors;
    }
};
export {loginValidator};