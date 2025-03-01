import { DateTime } from "luxon";

const getTimeDifference = (now: DateTime, end: string): [boolean, string] => {
  const date = DateTime.fromISO(end);
  if (!date.isValid) {
    return [false, "Unknown"];
  }

  const diff = now.diff(date, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ]);
  return [
    true,
    `${diff.years}y ${diff.months}mo ${diff.days}d ${diff.hours}h ${diff.minutes}m ${~~diff
      .seconds}s`,
  ];
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
