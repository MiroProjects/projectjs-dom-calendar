//Global arrays for accessing the months and days of week
var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

//Global variables for the current month and year
var dateObject = new Date();
var currentMonth = dateObject.getMonth();
var currentYear = dateObject.getFullYear();

//Variable for checking if it is attached to an input
var isInputType = false;

//Constant variable for holding the element to which the callendar is atteched
//Change the parameter to "input-test" and uncomment the input in the HTML to show the datepicker functionality
const elementToAppendToID = addElementToAppendTo("js-calendar");

//Function for changing the appended element
//It is declared this way so it can be invoked before its declaration on the previous line  
function addElementToAppendTo(id){
    var element = JSDomL.getElementUsingId(id);
    var isInputTypeText = element instanceof HTMLInputElement && element.type == 'text';
    if (isInputTypeText) {
        isInputType = true;
    }
    
    return element;
};

//Global array for holding all created events
var eventsCollection = [];

//Function for getting the name of the month using the global array
var getNameOfFirstDayOfMonth = function(year, month){
    var date = new Date(year, month, 1).toDateString();
    var nameOfDay = date.substr(0, 3);
    return nameOfDay;
};

//Function for getting the last date(1-31) of the month
var getNumberOfLastDayOfMonth = function(year, month){
    var date =  new Date(year, month + 1, 0).toDateString();
    var lastDayOfMonth = date.substr(8, 2);
    return lastDayOfMonth;
};

//Main parameterized function for displaying the calendar
var createCalendar = function(year, month){
    var element = mainCalendarFunctions(year, month);

    //Creating for the calendar
    var table = JSDomL.appendElement("TABLE", element);
    showDaysOfWeek(table);
    printDaysInMonth(year, month, table, 6);
    currentDayOfMonth(table);
    showAllEvents(table);
    createButtons(element);
}

//Function for creating the buttons
var createButtons = function(element){
    //For creating the buttons
    var btnForMonthView = JSDomL.appendElement("INPUT", element);
    var btnForFirstWeekView  = JSDomL.appendElement("INPUT", element);
    var btnForSecondtWeekView  = JSDomL.appendElement("INPUT", element);
    var btnForThirdWeekView  = JSDomL.appendElement("INPUT", element);

    JSDomL.addAttribute(btnForMonthView, "class", "btn-month-view")
          .addAttribute(btnForFirstWeekView, "class", "btn-first-week-view")
          .addAttribute(btnForSecondtWeekView, "class", "btn-second-week-view")
          .addAttribute(btnForThirdWeekView, "class", "btn-third-week-view")
          .addAttribute(btnForMonthView, "type", "button")
          .addAttribute(btnForFirstWeekView, "type", "button")
          .addAttribute(btnForSecondtWeekView, "type", "button")
          .addAttribute(btnForThirdWeekView, "type", "button")
          .addAttribute(btnForMonthView, "value", "Month view")
          .addAttribute(btnForFirstWeekView, "value", "First week")
          .addAttribute(btnForSecondtWeekView, "value", "First and second week")
          .addAttribute(btnForThirdWeekView, "value", "First second and third week")
          .addAction(btnForMonthView, "click", showMonthView)
          .addAction(btnForFirstWeekView, "click", function(){showWeekView(1)})
          .addAction(btnForSecondtWeekView, "click", function(){showWeekView(2)})
          .addAction(btnForThirdWeekView, "click", function(){showWeekView(3)});
};

//Function for showing the month view
var showMonthView = function(){
    createCalendar(currentYear, currentMonth);
};

//Function for showing the week view
var showWeekView = function (numberOfWeeks) {
    var element = mainCalendarFunctions(currentYear, currentMonth);

    //Creating for the week view
    var table = JSDomL.appendElement("TABLE", element);
    showDaysOfWeek(table);
    printDaysInMonth(currentYear, currentMonth, table, numberOfWeeks);
    showAllEvents(table);
    createButtons(element);
};

//Function for showing all events
var showAllEvents = function (table) {
    //For showing all the events for the current month
    for (let index = 0; index < eventsCollection.length; index++) {
        var event = eventsCollection[index].split("|");
        addEventToADay(event[0], event[1], event[2], event[3], table);
    }
};

//Function for the generating the main parts of the calendar
var mainCalendarFunctions = function (year, month) {
    //Firstly delete the previous calender 
    var child = JSDomL.getChilds(elementToAppendToID)[0];
    JSDomL.deleteElement(child);

    //Set the current year and month to be the parameters values
    currentYear = year;
    currentMonth = month;

    //Create div element for holding the title(displaying the arrows, date and the select field) and the table with the dates
    var element = JSDomL.appendElement("DIV", elementToAppendToID);
    addFunctionality(year, month, element);
    JSDomL.addAttribute(element, "id", "main-div")
        .addAttribute(element, "class", "container-div");

    return element;
};

//Function for displaying the days of week (Mon-Sun) in the table using the global array
var showDaysOfWeek = function(table){
    var tableRow = JSDomL.appendElement("tr", table);
    for (let index = 0; index < daysOfWeek.length; index++) {
        var tableColumn = JSDomL.appendElement("td", tableRow);
        JSDomL.changeHTMLContent(tableColumn, daysOfWeek[index])
              .addAttribute(tableColumn, "class", "table-week-rows");
    }
};

//Function for finding the current day of this year and month and adding to the element class for chainging its style
//in order to be different from the others
var currentDayOfMonth = function(table){
    var day = dateObject.getDate();
    var month = dateObject.getMonth();
    var year = dateObject.getFullYear();

    if (currentMonth == month && currentYear == year) {
        for (let i = 1, row; row = table.rows[i]; i++) {
            for (let j = 0, col; col = row.cells[j]; j++) {
                if (JSDomL.getHTML(col) == day) {
                    JSDomL.addAttribute(col, "class", "table-days-rows current-day")
                          .addAttribute(col, "title", "Today");
                    break;
                }
            }        
        }   
    }
};

//Function for default alert for days without events
var addDefaultEvent = function(){
    alert("Not events for this day");
};

//Main function for printing all the days for the current year and month and the table parameter is for where to attach these elements
var printDaysInMonth = function(year, month, table, numberOfWeeks){
    var counter = 1;
    var firstDayName = getNameOfFirstDayOfMonth(year, month);
    var numberOfFirstDay = daysOfWeek.indexOf(firstDayName);
    var lastDay = getNumberOfLastDayOfMonth(year, month);

    for (let i = 0; i < numberOfWeeks; i++) {
        var tableRow = JSDomL.appendElement("tr", table);
        if (i == 0) {
            for (let j = 0; j < numberOfFirstDay; j++) {
                var tableColumn = JSDomL.appendElement("td", tableRow);
                JSDomL.changeHTMLContent(tableColumn, "");
            }

            for (let j = numberOfFirstDay; j < 7; j++) {
                creatingCellsForEachDay(tableRow, counter, table, year, month);
                counter++;
            }
            continue;
        }

        for (let j = 0; j < 7; j++) {
            //If the value of the counter is larger number then the last day of the month then break
            //All of the days of the month are already displayed
            if (counter > lastDay) {
                break;
            }
            creatingCellsForEachDay(tableRow, counter, table, year, month);
            counter++;
        }
    }
};

//Function used to create a cell for each day
var creatingCellsForEachDay = function(tableRow, counter, table, year, month){
    var tableColumn = JSDomL.appendElement("td", tableRow);
    JSDomL.changeHTMLContent(tableColumn, counter)
        .addAttribute(tableColumn, "class", "table-days-rows");

    //If it is a calendar add events
    if (!isInputType) {
        JSDomL.addAction(tableColumn, "click", addDefaultEvent);
    }
    //If it is a datepicker add get value for the input fiel
    else{
        JSDomL.addAction(tableColumn, "click", function(){
            var value = table.rows[this.parentElement.rowIndex].cells[this.cellIndex].innerHTML;
            var date = new Date(year, month, value).toDateString();
            JSDomL.changeValue(elementToAppendToID, date);
        });
    }
};

//Function for recreating the calendar for diplaying the prevoius month
var previousMonth = function(){
    if (currentMonth == 0) {
        currentYear--;
        currentMonth = 11;
    }
    else{
        currentMonth--;
    }

    if (isInputType) {
        createDatePicker(currentYear, currentMonth);
        return;
    }

    createCalendar(currentYear, currentMonth);
};

//Function for recreating the calendar for diplaying the next month
var nextMonth = function(){
    if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0;
    }
    else{
        currentMonth++;
    }

    if (isInputType) {
        createDatePicker(currentYear, currentMonth);
        return;
    }

    createCalendar(currentYear, currentMonth);
};

//Function for returning to todays date
var returnToTodaysDate = function(){
    currentMonth = dateObject.getMonth();
    currentYear = dateObject.getFullYear();

    if (isInputType) {
        createDatePicker(currentYear, currentMonth);
        return;
    }

    createCalendar(currentYear, currentMonth);
};

//Function for creating the left and right arrow for the months
//For creating the text for the date
//For creating the select filed with all the options
var addFunctionality = function(year, month, element){
    var div = JSDomL.appendElement("DIV", element);
    JSDomL.addAttribute(div, "class", "label");

    var divLeftButton = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(divLeftButton, "class", "left-btn")
          .addAttribute(divLeftButton, "title", "Previous month")
          .addAction(divLeftButton, "click", previousMonth);

    var divRightButton = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(divRightButton, "class", "right-btn")
          .addAttribute(divRightButton, "title", "Next month")
          .addAction(divRightButton, "click", nextMonth);

    //When clicked it calls the returnToTodaysDate function
    var showDate = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(showDate, "class", "show-date")
          .addAttribute(showDate, "title", "Click me to see today's date")
          .changeHTMLContent(showDate, `${monthNames[month]} ${year}`)
          .addAction(showDate, "click", returnToTodaysDate);

    var showYear = JSDomL.appendElement("SELECT", div);
    JSDomL.addAttribute(showYear, "class", "show-year")
          .addAttribute(showYear, "title", "Choose a year")
          .addAction(showYear, "change", function(){
              currentYear = showYear.value;
              if (isInputType) {
                  createDatePicker(currentYear, 0);
              }
              else{
                createCalendar(currentYear, 0);
              }
          });

    for (let index = 1900; index < 2120; index++) {
        var option = JSDomL.appendElement("OPTION", showYear);
        if (index == currentYear) {
            JSDomL.addAttribute(option, "selected", "selected");
        }
        JSDomL.changeHTMLContent(option, index);
    }
};

//Function for creating a datepicker
var createDatePicker = function (year, month) {
    //It will append to the body
    var elementToAppendTo = JSDomL.getElementUsingCssSelectors("body");

    //Delete previos datepicker from body
    var previousDatepicker = JSDomL.getElementUsingId("main-div");
    if (previousDatepicker != null) {
        JSDomL.deleteElement(previousDatepicker);
    }
    
    //Set the current year and month to be the parameters values
    currentYear = year;
    currentMonth = month;

    //Create div element for holding the title(displaying the arrows, date and the select field) and the table with the dates
    var element = JSDomL.appendElement("DIV", elementToAppendTo);
    addFunctionality(year, month, element);
    JSDomL.addAttribute(element, "id", "main-div")
          .addAttribute(element, "class", "container-div datepicker");

    //Creating the datepicker
    var table = JSDomL.appendElement("TABLE", element);
    showDaysOfWeek(table);
    printDaysInMonth(year, month, table, 6);

    var btnForClosing = JSDomL.appendElement("INPUT", element);
    JSDomL.addAttribute(btnForClosing, "type", "button")
          .addAttribute(btnForClosing, "value", "X")
          .addAttribute(btnForClosing, "class", "close")
          .addAction(btnForClosing, "click", function(){
            var previousDatepicker = JSDomL.getElementUsingId("main-div");
            if (previousDatepicker != null) {
                JSDomL.deleteElement(previousDatepicker);
            }
          });
};

//Function for adding an event to the calendar by parsing the table and JSON data
var addEventToADay = function(day, month, year, JsonData, table){
    if (currentMonth == month && currentYear == year) {
        var obj = JSON.parse(JsonData);
        for (let i = 1, row; row = table.rows[i]; i++) {
            for (let j = 0, col; col = row.cells[j]; j++) {
                if (JSDomL.getHTML(col) == day) {
                    //Removing the default message and adding the new one for the event
                    JSDomL.removeAction(col, "click",addDefaultEvent);
                    JSDomL.addAction(col, "click", function(){
                        alert(`Event name: ${obj.eventName}, Event info: ${obj.eventInfo}, Date: ${day}/${month}/${year}`);
                    })
                          .changeStyle(col, "boxShadow", "10px 5px 10px rgba(204, 204, 204, 0.5)")
                          .addAttribute(col, "title", `Event: ${obj.eventName}. Click here to learn more!`);
                    break;
                }
            }        
        }   
    }
};

var addEventListenersToTheInput = function () {
    JSDomL.addAction(elementToAppendToID, "focus", function () { createDatePicker(currentYear, currentMonth) });
};

//Simplified function for the user to call by parsing the date and the data
var addEvent = function(day, month, year, JsonData){
    var date = new Date(year, month, day).getTime();
    var today = new Date().getTime();

    if (date < today) {
        alert("Sorry not valid date for a furure event!");
        return;
    }

    eventsCollection.push(`${day}|${month-1}|${year}|${JsonData}`);
};

//The month is from: 1-12
//The JsonData is in format:
//'{"eventName":"some name", "eventInfo":"some information"}'
//The properties are eventName and eventInfo
//Some events:
addEvent(14, 5, 2020, '{"eventName":"Birthday", "eventInfo":"Gosho\'s 30 year birthday party!"}');
addEvent(15, 2, 2024, '{"eventName":"Wedding", "eventInfo":"Pesho\'s wedding party!"}');
addEvent(17, 2, 2019, '{"eventName":"Party", "eventInfo":"Best party!"}');
addEvent(01, 10, 2019, '{"eventName":"Sport Event", "eventInfo":"Sport event in the spoprt base!"}');
addEvent(23, 11, 2019, '{"eventName":"Concert", "eventInfo":"Best concert in the world"}');
addEvent(18, 12, 2019, '{"eventName":"Party", "eventInfo":"Cool beach party!"}');
addEvent(19, 6, 2019, '{"eventName":"Wedding", "eventInfo":"Pesho and Mariya\'s wedding!"}');
addEvent(10, 6, 2019, '{"eventName":"Concert", "eventInfo":"Concert under the night sky!"}');
addEvent(09, 7, 2019, '{"eventName":"Movie night", "eventInfo":"Movie night event!"}');
addEvent(08, 2, 2019, '{"eventName":"Cinema", "eventInfo":"Cinema event! Great movies!"}');

//Function for what to start based on the element the calendar is attached to
var loadFirstCalendar = function(){
    if (isInputType) {
        window.onload = addEventListenersToTheInput();
    }
    else {
        //On load of the page call the function createCalendar with the current year and month
        //For test to show good parametrization change the current year and month to whatever you like: everything will
        //change based on the given information
        //Ex: window.onload = createCalendar(1967, 5);
        window.onload = createCalendar(currentYear, currentMonth);
    }
};

loadFirstCalendar();