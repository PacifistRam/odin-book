
import {
  format,
  differenceInCalendarYears,
  differenceInCalendarMonths,
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

type TimeStamp = Date;

export const formatDate = (timestamp: TimeStamp) => {
  return format(new Date(timestamp), "dd/MM/yyyy");
};

export const postTimestamp = (timeStamp: TimeStamp) => {
  const currentDate = new Date();
  const differenceInYears = differenceInCalendarYears(currentDate, timeStamp);
  const differenceInMonths = differenceInCalendarMonths(currentDate, timeStamp);
  const differenceInDays = differenceInCalendarDays(currentDate, timeStamp);
  const differenceInHour = differenceInHours(currentDate, timeStamp);
  const differenceInMinute = differenceInMinutes(currentDate, timeStamp);
  console.log("minute:",differenceInMinute)
  // Return corresponding time format string
  if (differenceInYears > 0) {
    return `${differenceInYears} year${differenceInYears > 1 ? "s" : ""} ago`;
  }
  if (differenceInMonths > 0) {
    return `${differenceInMonths} month${
      differenceInMonths > 1 ? "s" : ""
    } ago`;
  }
  if (differenceInDays > 0) {
    return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
  }
  if (differenceInHour > 0) {
    return `${differenceInHour} hour${differenceInHour > 1 ? "s" : ""} ago`;
  }
  if (differenceInMinute > 0) {
    return `${differenceInMinute} minute${
      differenceInMinute > 1 ? "s" : ""
    } ago`;
  }

  return "just now"; // if the time difference is less than a minute
};
