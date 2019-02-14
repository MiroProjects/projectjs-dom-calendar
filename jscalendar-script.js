//Global arrays for accessing the months and days of week
var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

//Global variables for the current month and year
var dateObject = new Date();
var currentMonth = dateObject.getMonth();
var currentYear = dateObject.getFullYear();

//Constant variable for holding the element to which the callendar is atteched
const elementToAppendToID = "js-calendar";

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

    //Creating for the calendar
    var table = JSDomL.appendElement("TABLE", element);
    showDaysOfWeek(table);
    printDaysInMonth(year, month, table);
}

//Function for displaying the days of week (Mon-Sun) in the table using the global array
var showDaysOfWeek = function(table){
    var tableRow = JSDomL.appendElement("tr", table);
    for (let index = 0; index < daysOfWeek.length; index++) {
        var tableColumn = JSDomL.appendElement("td", tableRow);
        JSDomL.changeHTMLContent(tableColumn, daysOfWeek[index])
              .addAttribute(tableColumn, "class", "table-week-rows");
    }
};

//Main function for printing all the days for the current year and month and the table parameter is for where to attach these elements
var printDaysInMonth = function(year, month, table){
    var counter = 1;
    var firstDayName = getNameOfFirstDayOfMonth(year, month);
    var numberOfFirstDay = daysOfWeek.indexOf(firstDayName);
    var lastDay = getNumberOfLastDayOfMonth(year, month);

    for (let i = 0; i < 6; i++) {
        var tableRow = JSDomL.appendElement("tr", table);
        if (i == 0) {
            for (let j = 0; j < numberOfFirstDay; j++) {
                var tableColumn = JSDomL.appendElement("td", tableRow);
                JSDomL.changeHTMLContent(tableColumn, "");
            }

            for (let j = numberOfFirstDay; j < 7; j++) {
                var tableColumn = JSDomL.appendElement("td", tableRow);
                JSDomL.changeHTMLContent(tableColumn, counter++)
                      .addAttribute(tableColumn, "class", "table-days-rows");
            }
            continue;
        }

        for (let j = 0; j < 7; j++) {
            //If the value of the counter is larger number then the last day of the month then break
            //All of the days of the month are already displayed
            if (counter > lastDay) {
                break;
            }
            var tableColumn = JSDomL.appendElement("td", tableRow);
            JSDomL.changeHTMLContent(tableColumn, counter++)
                  .addAttribute(tableColumn, "class", "table-days-rows");
        }
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
          .addAction(divLeftButton, "click", previousMonth);

    var divRightButton = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(divRightButton, "class", "right-btn")
          .addAction(divRightButton, "click", nextMonth);

    var showDate = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(showDate, "class", "show-date")
          .changeHTMLContent(showDate, `${monthNames[month]} ${year}`);

    var showYear = JSDomL.appendElement("SELECT", div);
    JSDomL.addAttribute(showYear, "class", "show-year")
          .addAction(showYear, "change", function(){
              currentYear = showYear.value;
              createCalendar(currentYear, 0);
          });

    for (let index = 1900; index < 2101; index++) {
        var option = JSDomL.appendElement("OPTION", showYear);
        if (index == year) {
            JSDomL.addAttribute(option, "selected", "selected");
        }
        JSDomL.changeHTMLContent(option, index);
    }
};

//On load of the page call the function createCalendar with the current year and month
//For test to show good parametrization change the current year and month to whatever you like: everything will
//change based on the given information
window.onload = createCalendar(currentYear, currentMonth);