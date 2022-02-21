"use strict";

const validateWords={
    
    validateWords: function(text){
        let errors=0;
        let lista=["puta","pito","cabron","polla","hijoputa","jodete","nazi","franco","gilipollas"];
        for(let e of lista){
            if(text.toLowerCase().includes(e.toLowerCase())){
                errors=errors+1;
            }
        }

        return errors;
    }
};
export{validateWords};