export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatTime(date) {
    var d = new Date(date);
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    if (hour < 10)
        hour = '0' + hour;
    if (minute < 10)
        minute = '0' + minute;
    if (second < 10)
        second = '0' + second;

    let result = `${hour}:${minute}:${second}`
    return result;
}

export const getFormattedDateTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    let newDate = new Date(dateTimeString);
    newDate.setHours(newDate.getHours() + 1);
    return newDate.toLocaleString('en-GB', options);
}

export const getMonthName = (date) => {
    
    let monthNames= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[date.getMonth()];
}