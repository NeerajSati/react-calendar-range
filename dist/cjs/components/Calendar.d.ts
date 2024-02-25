import React from 'react';
import './calendar.css';
declare type CalendarPropsType = {
    onChange: (startDate: Date | null, endDate: Date | null) => void;
    initialStartDate: Date | null;
    initialEndDate: Date | null;
    YearBackIcon: string;
    MonthBackIcon: string;
    hideDisabledDate: boolean;
    dateKeyDimension: string;
    inRangeClassName: string;
    selectedClassName: string;
    weekDayClassName: string;
    dateClassName: string;
    yearPanelClassName: string;
    calendarPopupClassName: string;
};
export default function Calendar({ onChange, initialStartDate, initialEndDate, YearBackIcon, MonthBackIcon, dateKeyDimension, inRangeClassName, selectedClassName, weekDayClassName, dateClassName, yearPanelClassName, calendarPopupClassName, hideDisabledDate, }: CalendarPropsType): React.JSX.Element;
export {};
