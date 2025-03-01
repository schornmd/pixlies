import { DateTime, type DurationObjectUnits, type DurationUnit } from "luxon";

type Units = Record<DurationUnit, string>;
const units: Partial<Units> = {
  years: "y",
  months: "mo",
  days: "d",
  hours: "h",
  minutes: "m",
  seconds: "s",
};

const getTimeDifference = (now: DateTime, end: string): [boolean, string] => {
  const date = DateTime.fromISO(end);
  if (!date.isValid) {
    return [false, "Unknown"];
  }

  const diff = now.diff(date, Object.keys(units) as DurationUnit[]);
  const format = Object.entries(units)
    .map(([unit, abbreviation]) => {
      const value = ~~diff[unit as keyof DurationObjectUnits];
      return value > 0 ? `${value}${abbreviation}` : null;
    })
    .filter(Boolean)
    .join(" ");

  return [true, format || "0s"];
};

const updateTimes = () => {
  const now = DateTime.now();

  document.querySelectorAll("[data-end]").forEach((element) => {
    const end = element.getAttribute("data-end") ?? "";
    const [success, text] = getTimeDifference(now, end);

    if (!success) {
      element.removeAttribute("data-end");
    }

    element.setAttribute("aria-busy", "false");
    element.textContent = text;
  });
};

setInterval(updateTimes, 1000);
