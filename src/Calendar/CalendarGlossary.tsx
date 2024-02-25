import React, { useState, useEffect } from "react";
import { YEAR_CALENDAR, WEEK_DAYS, areDatesEqual } from "./constants";

export default function CalendarGlossary({
  dateKeyDimension = "35px",
  inRangeClassName = "",
  selectedClassName = "",
  weekDayClassName = "",
  dateClassName = "",
  hideDisabledDate = false,
}: any) {
  const [thisYear, setThisYear] = useState<number>(new Date().getFullYear());
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
  const [daysThisMonth, setDaysThisMonth] = useState<number>(0);
  const [endingWeekDay, setEndingWeekDay] = useState<number>(0);
  const [startingWeekDay, setStartingWeekDay] = useState<number>(0);
  const [lastMonthDays, setLastMonthDays] = useState<number>(0);
  const [startRangeDate, setStartRangeDate] = useState<Date | null>(null);
  const [endRangeDate, setEndRangeDate] = useState<Date | null>(null);
  const [limitRangeDate, setLimitRangeDate] = useState<Date | null>(null);

  const calendarDateStyles = {
    width: dateKeyDimension,
    height: dateKeyDimension,
  };

  //   console.log("render????");

  const handleSelectDate = (date: number) => () => {
    let clickedDate = new Date(thisYear, thisMonth, date);
    console.log(clickedDate, startRangeDate);
    if (!startRangeDate) setStartRangeDate(clickedDate);
    else if (clickedDate < startRangeDate) {
      setStartRangeDate(clickedDate);
    } else setEndRangeDate(clickedDate);
  };

  const handleMonthSwitch = (skip: number) => () => {
    console.log("month", skip, thisMonth);
    if (skip === -1 && thisMonth === 0) {
      setThisMonth(11);
      setThisYear((year) => year - 1);
    } else if (skip === 1 && thisMonth === 11) {
      console.log("hehehheheehehhere");
      setThisMonth(0);
      setThisYear((year) => year + 1);
    } else {
      setThisMonth(thisMonth + skip);
    }
  };

  const getActiveClasses = (date: number) => {
    const currentDate = new Date(thisYear, thisMonth, date + 1);
    let className = "";

    console.log(
      currentDate > (startRangeDate as Date),
      startRangeDate as Date,
      currentDate
    );
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
    <div className="glossary">
      <div className="yearContainer">
        <div className="back">
          <div
            className="yearBack"
            onClick={() => setThisYear((year: any) => year - 1)}
          >
            {"<<"}
          </div>
          <div className="monthBack" onClick={handleMonthSwitch(-1)}>
            {"<"}
          </div>
        </div>
        <div className="monthYear">
          <div className="month">{YEAR_CALENDAR[thisMonth]}</div>
          <div className="year">{thisYear}</div>
        </div>
        <div className="next">
          <div className="monthNext" onClick={handleMonthSwitch(1)}>
            {">"}
          </div>
          <div
            className="yearNext"
            onClick={() => setThisYear((year: any) => year + 1)}
          >
            {">>"}
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
                    if (!endRangeDate)
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
