import React, { useState } from "react";
import "./calendarExample.css";
import Calendar from "./Calendar";
import CalendarIcon from "../assets/CalendarIcon.svg";

export default function CalendarGlossary() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const onDateChange = (startDate: Date | null, endDate: Date | null) => {
    if (startDate) {
      setStartDate(
        `${
          startDate.getMonth() + 1
        }/${startDate.getDate()}/${startDate.getFullYear()}`
      );
    }
    if (endDate) {
      setEndDate(
        `${
          endDate.getMonth() + 1
        }/${endDate.getDate()}/${endDate.getFullYear()}`
      );
      setCalendarOpen(false);
    }
  };

  return (
    <div className="calendar">
      From:
      <input
        onChange={(e) => {
          setCalendarOpen(false);
          setStartDate(e.target.value);
        }}
        className="input"
        type="text"
        placeholder="21/08/2012"
        value={startDate}
      ></input>
      To:
      <input
        onChange={(e) => {
          setCalendarOpen(false);
          setEndDate(e.target.value);
        }}
        className="input"
        type="text"
        placeholder="23/08/2012"
        value={endDate}
      ></input>
      <button
        onClick={() => setCalendarOpen(!calendarOpen)}
        type="button"
        className="button"
      >
        <img className="icon" src={CalendarIcon} />
      </button>
      {calendarOpen && (
        <div className="popupContainer">
          <Calendar
            dateKeyDimension="35px"
            hideDisabledDate={false}
            onChange={onDateChange}
            initialStartDate={startDate}
            initialEndDate={endDate}
          />
        </div>
      )}
    </div>
  );
}
