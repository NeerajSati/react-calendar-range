import React, { useState, useEffect } from "react";
import "./calendar.css";
import { YEAR_CALENDAR, WEEK_DAYS, areDatesEqual } from "./constants";
import YearBack from "../assets/DoubleBack.svg";
import MonthBack from "../assets/SingleBack.svg";

export default function Calendar({
  onChange,
  initialStartDate,
  initialEndDate,
  YearBackIcon = YearBack,
  MonthBackIcon = MonthBack,
  dateKeyDimension = "35px",
  inRangeClassName = "",
  selectedClassName = "",
  weekDayClassName = "",
  dateClassName = "",
  yearPanelClassName = "",
  calendarPopupClassName = "",
  hideDisabledDate = false,
}: any) {
  const [thisYear, setThisYear] = useState<number>(
    !isNaN(new Date(initialStartDate).getTime())
      ? new Date(initialStartDate).getFullYear()
      : new Date().getFullYear()
  );
  const [thisMonth, setThisMonth] = useState<number>(
    !isNaN(new Date(initialStartDate).getTime())
      ? new Date(initialStartDate).getMonth()
      : new Date().getMonth()
  );
  const [daysThisMonth, setDaysThisMonth] = useState<number>(0);
  const [endingWeekDay, setEndingWeekDay] = useState<number>(0);
  const [startingWeekDay, setStartingWeekDay] = useState<number>(0);
  const [lastMonthDays, setLastMonthDays] = useState<number>(0);
  const [limitRangeDate, setLimitRangeDate] = useState<Date | null>(null);
  const [startRangeDate, setStartRangeDate] = useState<Date | null>(
    !isNaN(new Date(initialStartDate).getTime())
      ? new Date(initialStartDate)
      : null
  );
  const [endRangeDate, setEndRangeDate] = useState<Date | null>(
    !isNaN(new Date(initialEndDate).getTime()) ? new Date(initialEndDate) : null
  );

  const calendarDateStyles = {
    width: dateKeyDimension,
    height: dateKeyDimension,
  };

  const handleSelectDate = (date: number) => () => {
    let clickedDate = new Date(thisYear, thisMonth, date);
    if (!startRangeDate) {
      setStartRangeDate(clickedDate);
      onChange(clickedDate, endRangeDate);
    } else if (clickedDate < startRangeDate) {
      setStartRangeDate(clickedDate);
      onChange(clickedDate, endRangeDate);
    } else {
      setEndRangeDate(clickedDate);
      onChange(startRangeDate, clickedDate);
    }
  };

  const handleMonthSwitch = (skip: number) => () => {
    if (skip === -1 && thisMonth === 0) {
      setThisMonth(11);
      setThisYear((year) => year - 1);
    } else if (skip === 1 && thisMonth === 11) {
      setThisMonth(0);
      setThisYear((year) => year + 1);
    } else {
      setThisMonth(thisMonth + skip);
    }
  };

  const getActiveClasses = (date: number) => {
    const currentDate = new Date(thisYear, thisMonth, date + 1);
    let className = "";

    // Add selected class if the date is either equal to range start date or end date
    if (
      areDatesEqual(currentDate, startRangeDate as Date) ||
      areDatesEqual(currentDate, endRangeDate as Date)
    )
      className += `selected ${selectedClassName} `;
    // Add inrange class if the date is between start and end range date / hovered date
    else if (
      startRangeDate &&
      currentDate > startRangeDate &&
      (currentDate < (limitRangeDate as Date) ||
        currentDate < (endRangeDate as Date))
    )
      className += `inrange ${inRangeClassName} `;

    return className;
  };

  useEffect(() => {
    setDaysThisMonth(new Date(thisYear, thisMonth + 1, 0).getDate()); // new Date(2024, 2, 0)
    setEndingWeekDay(new Date(thisYear, thisMonth + 1, 0).getDay()); // new Date(2024, 2, 0)
    setStartingWeekDay(new Date(thisYear, thisMonth, 1).getDay()); // new Date(2024, 1, 1)
    setLastMonthDays(new Date(thisYear, thisMonth, 0).getDate()); // new Date(2024, 1, 0)
  }, [thisYear, thisMonth]);

  return (
    <div className={`glossary ${calendarPopupClassName}`}>
      <div className="yearContainer">
        <div className="back">
          <div
            className="yearBack"
            onClick={() => setThisYear((year: any) => year - 1)}
          >
            <img alt="yearBack" src={YearBackIcon}></img>
          </div>
          <div className="monthBack" onClick={handleMonthSwitch(-1)}>
            <img alt="monthBack" src={MonthBackIcon}></img>
          </div>
        </div>
        <div className={`monthYear ${yearPanelClassName}`}>
          <div className="month">{YEAR_CALENDAR[thisMonth]}</div>
          <div className="year">{thisYear}</div>
        </div>
        <div className="next">
          <div className="monthNext" onClick={handleMonthSwitch(1)}>
            <img alt="monthNext" src={MonthBackIcon}></img>
          </div>
          <div
            className="yearNext"
            onClick={() => setThisYear((year: any) => year + 1)}
          >
            <img alt="yearNext" src={YearBackIcon}></img>
          </div>
        </div>
      </div>
      <div className="dateContainer">
        <div className="days">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className={`weekdayName ${weekDayClassName}`}
              style={{ width: dateKeyDimension }}
            >
              {day}
            </div>
          ))}
          {/* backfill */}
          {startingWeekDay > 0 &&
            Array(startingWeekDay)
              .fill(null)
              .map((_, date) => (
                <div
                  className={`day  ${hideDisabledDate ? "hidden" : "disabled"}`}
                  key={`${thisYear}-${thisMonth}-${date + 1}-backfill`}
                  style={calendarDateStyles}
                >
                  {lastMonthDays - startingWeekDay + date + 1}
                </div>
              ))}
          {/* This month */}
          {daysThisMonth &&
            Array(daysThisMonth)
              .fill(null)
              .map((_, date) => (
                <div
                  onMouseOver={() => {
                    if (!endRangeDate && startRangeDate)
                      setLimitRangeDate(
                        new Date(thisYear, thisMonth, date + 1)
                      );
                  }}
                  onMouseOut={() => {
                    if (limitRangeDate) setLimitRangeDate(null);
                  }}
                  onClick={handleSelectDate(date + 1)}
                  className={`day ${dateClassName} ${getActiveClasses(date)}`}
                  key={`${thisYear}-${thisMonth}-${date + 1}`}
                  style={calendarDateStyles}
                >
                  {date + 1}
                </div>
              ))}
          {/* Nextfill */}
          {6 > endingWeekDay &&
            Array(6 - endingWeekDay)
              .fill(null)
              .map((_, date) => (
                <div
                  className={`day ${hideDisabledDate ? "hidden" : "disabled"}`}
                  key={`${thisYear}-${thisMonth}-${date + 1}-forwardfill`}
                  style={calendarDateStyles}
                >
                  {date + 1}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
