import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { getDate, getMonth, getYear } from "date-fns";

export const toNgbDate = (date: Date) => {
    return {
        year: getYear(date),
        month: getMonth(date) + 1,
        day: getDate(date)
    }
};

export const fromNgbDate = (date: NgbDateStruct) => {
    return new Date(`${date.year}-${date.month}-${date.day}`).toISOString();
};
