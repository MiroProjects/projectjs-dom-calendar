//Collection used to save all selected elements by id
var collectionOfElements = [];

//Creating a library for abstracting the main functions JS uses for manipulating and iteracting with the DOM tree
//JSDomL = Java Script Document object model Library
JSDomL = {
    //Function used to get element using the specified id
    //If this function is used then once a html element is selected then it is cached in the collectionOfElements
    //array where it is saved until it is needed 
    getElementUsingId: function(selector){
        var element = document.getElementById(selector);
        if (element != null) {
            collectionOfElements.push(element);
        }
        else{
            console.log("This element does not exist!");
        }
        return element;
    },

    //Function for getting an element without chaching it and with using css selectors
    getElementUsingCssSelectors: function(selector){
        var element = document.querySelector(selector);
        return element;
    },

    //Function for getting elements without chaching them and with using css selectors
    getElementsUsingCssSelectors: function(selector){
        var elements = document.querySelectorAll(selector);
        return elements;
    },

    //Function for creating a new element
    createElement: function(element){
        var element = document.createElement(element);
        return element;
    },

    //Function for creating a new element and appending it to an existing one
    appendElement: function(elementToCreate, exsistingElementToAppendTo){
        exsistingElementToAppendTo = checkSelector(exsistingElementToAppendTo);
        if (checkForNullElement(exsistingElementToAppendTo)) {
            return;
        }

        var element = this.createElement(elementToCreate);
        exsistingElementToAppendTo.appendChild(element);
        return element;
    },

    //Function for deleting an element
    deleteElement: function(element){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        var parent = this.getParent(element);
        parent.removeChild(element);
        return this;
    },

    //Function for adding an attribute
    addAttribute: function(element, attribute, value){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.setAttribute(attribute, value);
        return this;
    },

    //Function for appending text to an existing HTML element
    appendText: function(element, text){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
        return this;
    },

    //Function for changing the entire text content of an HTML element
    changeTextContent: function(element, text){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.textContent = text;
        return this;
    },

    //Function for changing the HTML content of an HTML element
    changeHTMLContent: function(element, htmlContent){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.innerHTML = htmlContent;
        return this;
    },

    //Function for changing the value of an HTML element
    changeValue: function (element, value) {
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.value = value;
        return this;
    },

    //Function for changing some style properties of an HTML element
    changeStyle: function(element, styleProperty, styleValue){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.style[styleProperty] = styleValue;
        return this;
    },

    //Function for getting the parent of an HTML element
    getParent: function(element){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        return element.parentNode;
    },

    //Function for getting the previous sybling of an HTML element
    getPreviousSibling: function(element){
        element = checkSelector(element); 
        if (checkForNullElement(element)) {
            return;
        }

        return element.previousElementSibling;
    },

    //Function for getting the next sybling of an HTML element
    getNextSibling: function(element){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        return element.nextElementSibling;
    },
    
    //Function for getting all the childs of an HTML element
    getChilds: function(element){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        return element.childNodes;
    },

    //Function for getting the inner HTML of an HTML element
    getHTML: function(element){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        return element.innerHTML;
    },

    //Function for adding an event listener to an HTML element
    addAction: function(element, event, callback){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.addEventListener(event, callback);
        return this;
    },

    //Function for removing an event listener from an HTML element
    removeAction: function(element, event, callback){
        element = checkSelector(element);
        if (checkForNullElement(element)) {
            return;
        }

        element.removeEventListener(event, callback);
        return this;
    }
};

//Function used to check the parameter(element): If it is string it uses this string(passed as ID) to get the element
//If it is the element itself(as object) then it returns it
//This way for parameter "element" we can pass both the element itself and an ID for this element to get it
checkSelector = function(element) {
    //If the element parameter is string then an id for getting the HTML element is passed
    if (typeof (element) === 'string') {
        var result = null;

        result = checkCollectionForCachedElement(element);
        return result;
    }
    //If the element parameter is object then the HTML element is passed
    if (typeof (element) === 'object') {
        return element;
    }

    console.log("Wrong parameter!");
    return null;
};

//Function used to check the collectionOfElements array for the element with this id selector
checkCollectionForCachedElement = function (idSelector) {
    //Loop through the collection(cache)
    for (let index = 0; index < collectionOfElements.length; index++) {
        if (collectionOfElements[index].getAttribute("id") == idSelector) {
            return collectionOfElements[index];
        }
    }

    //If it is not in the collection try to get it and add it
    var result = JSDomL.getElementUsingId(idSelector);
    return result;
};

//Function used to check if element is null
checkForNullElement = function(element){
    if (element == null) {
        return true;
    }

    return false;
};