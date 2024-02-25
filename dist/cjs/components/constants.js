"use strict";
exports.__esModule = true;
exports.areDatesEqual = exports.WEEK_DAYS = exports.YEAR_CALENDAR = void 0;
exports.YEAR_CALENDAR = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var areDatesEqual = function (date1, date2) {
    if (!date1 || !date2)
        return false;
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
};
exports.areDatesEqual = areDatesEqual;
//# sourceMappingURL=constants.js.map