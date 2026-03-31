import { getDate, getMonth, getYear } from "date-fns";

export const toNgbDate = (date: Date) => {
    return {
        year: getYear(date),
        month: getMonth(date) + 1,
        day: getDate(date)
    }
};