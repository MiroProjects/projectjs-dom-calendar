var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var dateObject = new Date();
var currentMonth = dateObject.getMonth();
var currentYear = dateObject.getFullYear();
const elementToAppendToID = "js-calendar";

var getNameOfFirstDayOfMonth = function(year, month){
    var date = new Date(year, month, 1).toDateString();
    var nameOfDay = date.substr(0, 3);
    return nameOfDay;
};

var getNumberOfLastDayOfMonth = function(year, month){
    var date =  new Date(year, month + 1, 0).toDateString();
    var lastDayOfMonth = date.substr(8, 2);
    return lastDayOfMonth;
};

var createCalendar = function(year, month){
    var child = JSDomL.getChilds(elementToAppendToID)[0];
    JSDomL.deleteElement(child);

    currentYear = year;
    currentMonth = month;

    var element = JSDomL.appendElement("DIV", elementToAppendToID);
    addFunctionality(year, month, element);
    JSDomL.addAttribute(element, "id", "main-div")
          .addAttribute(element, "class", "container-div");

    var table = JSDomL.appendElement("TABLE", element);
    showDaysOfWeek(table);
    printDaysInMonth(year, month, table);
}

var showDaysOfWeek = function(table){
    var tableRow = JSDomL.appendElement("tr", table);
    for (let index = 0; index < daysOfWeek.length; index++) {
        var tableColumn = JSDomL.appendElement("td", tableRow);
        JSDomL.changeHTMLContent(tableColumn, daysOfWeek[index])
              .addAttribute(tableColumn, "class", "table-week-rows");
    }
};

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
            if (counter > lastDay) {
                break;
            }
            var tableColumn = JSDomL.appendElement("td", tableRow);
            JSDomL.changeHTMLContent(tableColumn, counter++)
                  .addAttribute(tableColumn, "class", "table-days-rows");
        }
    }
};

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

window.onload = createCalendar(currentYear, currentMonth);