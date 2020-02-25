// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    // your code goes here

    let base = "";

    if (obj === null) {
        return 'null';
    }

    if (typeof obj === 'string') {
        return `"${obj}"`;
    }

    if (typeof obj === 'number' || typeof obj === 'boolean') {
        return `${obj.toString()}`;
    }

    if (Array.isArray(obj) && obj.length === 0) {

        return '[]';

    } else if (Array.isArray(obj) && obj.length > 0) {

        var strings = obj.map(function(value, index) {
            return stringifyJSON(value)
        }).join(`,`)

        return `[${strings}]`

    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {

        let objKeys = Object.keys(obj);

        objKeys.forEach((key) => {
            if (key === "functions" || key === "undefined") {
                delete obj[key];
            }
        })

        if (objKeys.length === 0) {

            return '{}';

        } else {

            let objArr = [];

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    objArr.push(stringifyJSON(prop) + ":" + stringifyJSON(obj[prop]))
                }
            }

            return `{${objArr}}`
        }
    }

    return base

};