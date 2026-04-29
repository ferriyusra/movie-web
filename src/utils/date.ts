import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@heroui/react";

const standardDate = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${standardDate(year)}-${standardDate(month)}-${standardDate(day)} ${standardDate(hour)}:${standardDate(minute)}:${standardDate(second)}`;
  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);

  return formattedDate;
};

const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);

  const date = dateObject.toLocaleString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  return `${date} WIB`;
};

const formatShowtimeDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  return { day, time };
};

export { toDateStandard, toInputDate, convertTime, formatShowtimeDate };
