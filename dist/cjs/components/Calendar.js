"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
require("./calendar.css");
var constants_1 = require("./constants");
var DoubleBack_svg_1 = (0, tslib_1.__importDefault)(require("../assets/DoubleBack.svg"));
var SingleBack_svg_1 = (0, tslib_1.__importDefault)(require("../assets/SingleBack.svg"));
function Calendar(_a) {
    var onChange = _a.onChange, initialStartDate = _a.initialStartDate, initialEndDate = _a.initialEndDate, _b = _a.YearBackIcon, YearBackIcon = _b === void 0 ? DoubleBack_svg_1["default"] : _b, _c = _a.MonthBackIcon, MonthBackIcon = _c === void 0 ? SingleBack_svg_1["default"] : _c, _d = _a.dateKeyDimension, dateKeyDimension = _d === void 0 ? '35px' : _d, _e = _a.inRangeClassName, inRangeClassName = _e === void 0 ? '' : _e, _f = _a.selectedClassName, selectedClassName = _f === void 0 ? '' : _f, _g = _a.weekDayClassName, weekDayClassName = _g === void 0 ? '' : _g, _h = _a.dateClassName, dateClassName = _h === void 0 ? '' : _h, _j = _a.yearPanelClassName, yearPanelClassName = _j === void 0 ? '' : _j, _k = _a.calendarPopupClassName, calendarPopupClassName = _k === void 0 ? '' : _k, _l = _a.hideDisabledDate, hideDisabledDate = _l === void 0 ? false : _l;
    var _m = (0, react_1.useState)(!isNaN(new Date(initialStartDate).getTime())
        ? new Date(initialStartDate).getFullYear()
        : new Date().getFullYear()), thisYear = _m[0], setThisYear = _m[1];
    var _o = (0, react_1.useState)(!isNaN(new Date(initialStartDate).getTime())
        ? new Date(initialStartDate).getMonth()
        : new Date().getMonth()), thisMonth = _o[0], setThisMonth = _o[1];
    var _p = (0, react_1.useState)(0), daysThisMonth = _p[0], setDaysThisMonth = _p[1];
    var _q = (0, react_1.useState)(0), endingWeekDay = _q[0], setEndingWeekDay = _q[1];
    var _r = (0, react_1.useState)(0), startingWeekDay = _r[0], setStartingWeekDay = _r[1];
    var _s = (0, react_1.useState)(0), lastMonthDays = _s[0], setLastMonthDays = _s[1];
    var _t = (0, react_1.useState)(null), limitRangeDate = _t[0], setLimitRangeDate = _t[1];
    var _u = (0, react_1.useState)(!isNaN(new Date(initialStartDate).getTime()) ? new Date(initialStartDate) : null), startRangeDate = _u[0], setStartRangeDate = _u[1];
    var _v = (0, react_1.useState)(!isNaN(new Date(initialEndDate).getTime()) ? new Date(initialEndDate) : null), endRangeDate = _v[0], setEndRangeDate = _v[1];
    var calendarDateStyles = {
        width: dateKeyDimension,
        height: dateKeyDimension
    };
    var handleSelectDate = function (date) { return function () {
        var clickedDate = new Date(thisYear, thisMonth, date);
        if (!startRangeDate) {
            setStartRangeDate(clickedDate);
            onChange(clickedDate, endRangeDate);
        }
        else if (clickedDate < startRangeDate) {
            setStartRangeDate(clickedDate);
            onChange(clickedDate, endRangeDate);
        }
        else {
            setEndRangeDate(clickedDate);
            onChange(startRangeDate, clickedDate);
        }
    }; };
    var handleMonthSwitch = function (skip) { return function () {
        if (skip === -1 && thisMonth === 0) {
            setThisMonth(11);
            setThisYear(function (year) { return year - 1; });
        }
        else if (skip === 1 && thisMonth === 11) {
            setThisMonth(0);
            setThisYear(function (year) { return year + 1; });
        }
        else {
            setThisMonth(thisMonth + skip);
        }
    }; };
    var getActiveClasses = function (date) {
        var currentDate = new Date(thisYear, thisMonth, date + 1);
        var className = '';
        // Add selected class if the date is either equal to range start date or end date
        if ((0, constants_1.areDatesEqual)(currentDate, startRangeDate) || (0, constants_1.areDatesEqual)(currentDate, endRangeDate))
            className += "selected " + selectedClassName + " ";
        // Add inrange class if the date is between start and end range date / hovered date
        else if (startRangeDate &&
            currentDate > startRangeDate &&
            (currentDate < limitRangeDate || currentDate < endRangeDate))
            className += "inrange " + inRangeClassName + " ";
        return className;
    };
    (0, react_1.useEffect)(function () {
        setDaysThisMonth(new Date(thisYear, thisMonth + 1, 0).getDate()); // new Date(2024, 2, 0)
        setEndingWeekDay(new Date(thisYear, thisMonth + 1, 0).getDay()); // new Date(2024, 2, 0)
        setStartingWeekDay(new Date(thisYear, thisMonth, 1).getDay()); // new Date(2024, 1, 1)
        setLastMonthDays(new Date(thisYear, thisMonth, 0).getDate()); // new Date(2024, 1, 0)
    }, [thisYear, thisMonth]);
    return (react_1["default"].createElement("div", { className: "glossary " + calendarPopupClassName },
        react_1["default"].createElement("div", { className: 'yearContainer' },
            react_1["default"].createElement("div", { className: 'back' },
                react_1["default"].createElement("div", { className: 'yearBack', onClick: function () { return setThisYear(function (year) { return year - 1; }); } },
                    react_1["default"].createElement("img", { alt: 'yearBack', src: YearBackIcon })),
                react_1["default"].createElement("div", { className: 'monthBack', onClick: handleMonthSwitch(-1) },
                    react_1["default"].createElement("img", { alt: 'monthBack', src: MonthBackIcon }))),
            react_1["default"].createElement("div", { className: "monthYear " + yearPanelClassName },
                react_1["default"].createElement("div", { className: 'month' }, constants_1.YEAR_CALENDAR[thisMonth]),
                react_1["default"].createElement("div", { className: 'year' }, thisYear)),
            react_1["default"].createElement("div", { className: 'next' },
                react_1["default"].createElement("div", { className: 'monthNext', onClick: handleMonthSwitch(1) },
                    react_1["default"].createElement("img", { alt: 'monthNext', src: MonthBackIcon })),
                react_1["default"].createElement("div", { className: 'yearNext', onClick: function () { return setThisYear(function (year) { return year + 1; }); } },
                    react_1["default"].createElement("img", { alt: 'yearNext', src: YearBackIcon })))),
        react_1["default"].createElement("div", { className: 'dateContainer' },
            react_1["default"].createElement("div", { className: 'days' },
                constants_1.WEEK_DAYS.map(function (day) { return (react_1["default"].createElement("div", { key: day, className: "weekdayName " + weekDayClassName, style: { width: dateKeyDimension } }, day)); }),
                startingWeekDay > 0 &&
                    Array(startingWeekDay)
                        .fill(null)
                        .map(function (_, date) { return (react_1["default"].createElement("div", { className: "day  " + (hideDisabledDate ? 'hidden' : 'disabled'), key: thisYear + "-" + thisMonth + "-" + (date + 1) + "-backfill", style: calendarDateStyles }, lastMonthDays - startingWeekDay + date + 1)); }),
                daysThisMonth &&
                    Array(daysThisMonth)
                        .fill(null)
                        .map(function (_, date) { return (react_1["default"].createElement("div", { onMouseOver: function () {
                            if (!endRangeDate && startRangeDate)
                                setLimitRangeDate(new Date(thisYear, thisMonth, date + 1));
                        }, onMouseOut: function () {
                            if (limitRangeDate)
                                setLimitRangeDate(null);
                        }, onClick: handleSelectDate(date + 1), className: "day " + dateClassName + " " + getActiveClasses(date), key: thisYear + "-" + thisMonth + "-" + (date + 1), style: calendarDateStyles }, date + 1)); }),
                6 > endingWeekDay &&
                    Array(6 - endingWeekDay)
                        .fill(null)
                        .map(function (_, date) { return (react_1["default"].createElement("div", { className: "day " + (hideDisabledDate ? 'hidden' : 'disabled'), key: thisYear + "-" + thisMonth + "-" + (date + 1) + "-forwardfill", style: calendarDateStyles }, date + 1)); })))));
}
exports["default"] = Calendar;
//# sourceMappingURL=Calendar.js.map