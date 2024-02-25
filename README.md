# react-calendar-range

> Select Date ranges with react hassle free, user can just use the Component and pass a onChange function which returns the date range.
> This can be easily modified by providing the classname width and functionality as required

[![NPM](https://img.shields.io/npm/v/react-calendar-range.svg)](https://www.npmjs.com/package/react-calendar-range) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Visit here to see a [Demo](https://codesandbox.io/s/react-calendar-range-mcpfhw)

## Usage

```jsx
import ImageUpload from 'react-calendar-range'

export default function NewComponent() {
  const onDateChange = (startDate, endDate) => {
    console.log(startDate, endDate)
  }

  return <Calendar dateKeyDimension='35px' hideDisabledDate={false} onChange={onDateChange} />
}
```

Props that can be passed:

```
type CalendarPropsType = {
  onChange: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: string
  initialEndDate?: string
  YearBackIcon?: string
  MonthBackIcon?: string
  hideDisabledDate?: boolean
  dateKeyDimension?: string
  inRangeClassName?: string
  selectedClassName?: string
  weekDayClassName?: string
  dateClassName?: string
  yearPanelClassName?: string
  calendarPopupClassName?: string
}
```

| Attributes          | type                                  | values                    | description                                                                                            |
| ------------------- | ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| onChange            | Function (startDate, endDate) => void | e.g, onChange(start,end)} | Provide onchange function to receive the values selected by the user as soon as user selects any value |
| initialStartDate    | string                                | "01-03-2003"              | Allow the user to type in input field and when open calendar see the value preselected                 |
| initialEndDate      | string                                | "01-03-2003"              | Allow the user to type in input field and when open calendar see the value preselected                 |
| YearBackIcon        | string or Svg                         | Image Url                 | Back Icon to change year                                                                               |
| MonthBackIcon       | string or Svg                         | Image Url                 | Back Icon to change month                                                                              |
| hideDisabledDate    | boolean                               | true\|false               | To hide the excess date of previous and next month                                                     |
| dateKeyDimension    | string                                | "26px" \| "2rem"          | To style the width of calendar dates                                                                   |
| Other Classes Names | string                                | ""                        | Custom class name to easily override styles                                                            |

## License

MIT © [NeerajSati](https://github.com/NeerajSati)
