var monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

var dateFunction = function(){
    var date = new Date();

    var monthNumber = date.getMonth();
    var monthName = monthNames[monthNumber];

    var dayOfWeekNumber = date.getDay(); // Day of the week
    var dayOFWeekName = daysOfWeek[dayOfWeekNumber];

    var year = date.getFullYear();
    var date = date.getDate();
    
    console.log(`Current date: ${dayOFWeekName} ${date} ${monthName} ${year}`);
};

dateFunction();

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

console.log(getNameOfFirstDayOfMonth(2019, 1));
console.log(getNumberOfLastDayOfMonth(2019, 1));

var createCalendar = function(year, month, elementToAppendTheCalendar){
    var element = JSDomL.appendElement("DIV", elementToAppendTheCalendar);
    addFunctionality(month, year, element);
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

var addFunctionality = function(month, year, element){
    var div = JSDomL.appendElement("DIV", element);
    JSDomL.addAttribute(div, "class", "label");
    var divLeftButton = JSDomL.appendElement("DIV", div);
    JSDomL.changeHTMLContent(divLeftButton, "<")
          .addAttribute(divLeftButton, "class", "left-btn");
    var divRightButton = JSDomL.appendElement("DIV", div);
    JSDomL.changeHTMLContent(divRightButton, ">")
          .addAttribute(divRightButton, "class", "right-btn");;

    var showDate = JSDomL.appendElement("DIV", div);
    JSDomL.addAttribute(showDate, "class", "show-date")
          .changeHTMLContent(showDate, `${monthNames[month]} ${year}`);

    var showYear = JSDomL.appendElement("SELECT", div);
    JSDomL.addAttribute(showYear, "class", "show-year");

    for (let index = 1900; index < 2101; index++) {
        var option = JSDomL.appendElement("OPTION", showYear);
        JSDomL.changeHTMLContent(option, index);
    }
};

var date = new Date();
createCalendar(date.getFullYear(), date.getMonth(), "js-calendar");