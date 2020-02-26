// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// You should use document.body, element.childNodes, and element.classList

const getElementsByClassName = function(className) {
	
    let elementsWithClass = [];
    let findClass = function(element) {
        //if the element has a classlist and that classlist contains the argument className
        if (element.classList && element.classList.contains(className)) {
            //push the element meeting the above condition to the array 
            elementsWithClass.push(element);
        }
        //if the element has childNodes
        if (element.hasChildNodes()) {
            //loop through the childNodes of said element
            for (let i = 0; i < element.childNodes.length; i++) {
                //checking each to see if it has the className
                findClass(element.childNodes[i]);
            }
        }
    }

    findClass(document.body);
    return elementsWithClass;
};


