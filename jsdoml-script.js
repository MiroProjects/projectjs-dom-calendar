//Collection used to save all selected or created elements using the JSDomL library 
var collectionOfElements = [];

//Creating a library for abstracting the main functions JS uses for manipulating and iteracting with the DOM tree
//JSDomL = Java Script Document object model Library
JSDomL = {
    getElement: function(selector){
        var element = document.querySelector(selector);
        collectionOfElements.push(element);
        return element;
    },

    getElements: function(selector){
        var elements = document.querySelectorAll(selector);

        //Add all the selected elements in the library's cache
        for (const element of elements) {
            collectionOfElements.push(element);
        }

        return elements;
    },

    createElement: function(element){
        var element = document.createElement(element);
        collectionOfElements.push(element);
        return element;
    },

    appendElement: function(elementToCreate, exsistingElementToAppendTo){
        var element = this.createElement(elementToCreate);
        exsistingElementToAppendTo.appendChild(element);
        return element;
    },

    //To remove a child you must know its parent
    //To remove a child we use the function parent.removeChild()
    deleteElement: function(element){
        element = this.checkForSelector(element);

        var parent = this.getParent(element);
        parent.removeChild(element);
        return this;
    },

    //Function used to check the parameter: If it is string it uses this string to get the element
    //If it is the element itself then it returns it
    //This way as parameter for (element) we can pass both the element itself and a selector for this element
    checkForSelector: function(element){
        if (typeof(element) === 'string') {
            return this.getElement(element);
        }

        return element;
    },

    addAttribute: function(element, attribute, value){
        element = this.checkForSelector(element);
        element.setAttribute(attribute, value);
        return this;
    },

    addText: function(element, text){
        element = this.checkForSelector(element);

        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
        return this;
    },

    changeHTMLContent: function(element, htmlContent){
        element = this.checkForSelector(element);
        element.innerHTML = htmlContent;
        return this;
    },

    changeStyle: function(element, styleProperty, styleValue){
        element = this.checkForSelector(element);
        element.style[styleProperty] = styleValue;
        return this;
    },

    getParent: function(element){
        element = this.checkForSelector(element);
        return element.parentNode;
    },

    getPreviousSibling: function(element){
        element = this.checkForSelector(element);       
        return element.previousElementSibling;
    },

    getNextSibling: function(element){
        element = this.checkForSelector(element);
        return element.nextElementSibling;
    },
    
    getChilds: function(element){
        element = this.checkForSelector(element);
        return element.childNodes;
    },

    addAction: function(element, event, callback){
        element = this.checkForSelector(element);
        element.addEventListener(event, callback);
        return this;
    }
};

var element = JSDomL.getElement("#id2");

//JSDomL.appendElement("INPUT", element);
//JSDomL.deleteElement(element);
//JSDomL.addAttribute(element, "id", "10");

// JSDomL.changeHTMLContent(element, "<input type='button' value='Hi'>");
// JSDomL.addText(element, "Hello");
// JSDomL.changeStyle(element, "color", "blue");
// JSDomL.addAction(element, "click", function(){alert("Hello");});

JSDomL.changeHTMLContent(element, "<input type='button' value='Hi'>")
        .addText(element, "Hello")
        .changeStyle(element, "color", "blue")
        .addAction(element, "click", function(){alert("Hello");});