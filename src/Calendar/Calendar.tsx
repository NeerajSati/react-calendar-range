import React, { useState } from "react";
import "./calendar.css";
import CalendarGlossary from "./CalendarGlossary";
import CalendarIcon from "./CalendarIcon.svg"

export default function Calendar({ DateIcon = CalendarIcon }: any) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <div className="calendar">
      <input className="input" type="text" placeholder="21/08/2012"></input>
      <button
        onClick={() => setCalendarOpen(!calendarOpen)}
        type="button"
        className="button"
      >
        <img className="icon" src={DateIcon} />
      </button>
      {calendarOpen && (
        <div className="popupContainer">
          <div className="popup">
            <CalendarGlossary />
          </div>
        </div>
      )}
    </div>
  );
}
