// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    // set base to undefined
    let base; 
    // turns value null into a string
    if (obj === null) { 
        return 'null';
    }
    // wraps string in extra quotes
    if (typeof obj === 'string') { 
        return `"${obj}"`;
    }
    // wraps number or boolean in quotes
    if (typeof obj === 'number' || typeof obj === 'boolean') { 
        return `${obj.toString()}`;
    }
    // return undefined for undefined values or functions 
    if (typeof obj === 'undefined' || typeof obj === 'function') { 
        return undefined;
    }
    // turns an empty array into a string
    if (Array.isArray(obj) && obj.length === 0) { 
        return '[]';
    // if array has elements
    } else if (Array.isArray(obj) && obj.length > 0) { 
        // take each element and call stringify on it
        let mapped = obj.map((elem) => { 
            // for functions or undefined stringify null   
            if (typeof elem === 'function' || typeof elem === 'undefined') { 
                return stringifyJSON(null);
            }
            return stringifyJSON(elem);
        })
        return `[${mapped}]` // return array as a string
    }
    // if the object is an object and not an array 
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        // get the keys of the object
        let objKeys = Object.keys(obj);
        // check to see if type of key is a function or undefined, if so, get rid of it
        objKeys.forEach((key) => {
            if (typeof obj[key] === "function" || obj[key] === undefined) {
                delete obj[key];
            }
        })
        // if object is empty return that empty object as a string 
        if (objKeys.length === 0) {
            return '{}';
        } // if object has key/values
        else {
            // create an empty array
            let objArr = [];
            // for every property in the object stringify the key and value then push it to the objArr as a string literal
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    objArr.push(`${stringifyJSON(key)}:${stringifyJSON(obj[key])}`)
                }
            }
            return `{${objArr}}` // returns whats between the square brackets in objArr and wraps it around quotes and curly braces
        }
    }
    // returns undefined if there was nothing passed in 
    return base
};