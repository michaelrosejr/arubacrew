import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string) {
  const nDate = new Date(date);
  return nDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
// export function formatDate(
//   date: string,
//   dateStyle: DateStyle = "medium",
//   locales = "en"
// ) {
//   const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
//   return formatter.format(new Date(date));
// }
