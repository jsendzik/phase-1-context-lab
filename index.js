/* Your Code Here */


function createEmployeeRecord(employeeArray) {
    let employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

function createEmployeeRecords(employeeArrays) {
    let employeeRecords = [];
    employeeArrays.forEach((employee) => {
        let employeeRecord = createEmployeeRecord(employee);
        employeeRecords.push(employeeRecord)
    })
    return employeeRecords
}

function createTimeInEvent(dateTimeString) {
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(`${dateTimeString.slice(11,13) * 100}`),
            date: `${dateTimeString.slice(0,10)}`
        }
    )
    return this
}

function createTimeOutEvent(dateTimeString) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(`${dateTimeString.slice(11,13) * 100}`),
        date: `${dateTimeString.slice(0,10)}`
    })
    return this
}

function hoursWorkedOnDate(dateString) {
    let timeIn = this.timeInEvents.find((event) => event.date === dateString);
    let timeOut = this.timeOutEvents.find((event) => event.date === dateString);
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked
}

function wagesEarnedOnDate(dateString) {
    const wagesEarned = hoursWorkedOnDate.call(this, dateString) * this.payPerHour
    return wagesEarned
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    let match = srcArray.find((name) => name.firstName === firstName)
    return match
}

function calculatePayroll(arrayOfRecords) {
    let sum = arrayOfRecords.reduce(function (total, record) {
        return total + allWagesFor.call(record);
    }, 0);
    return sum;
}