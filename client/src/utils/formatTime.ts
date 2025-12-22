type Mode = "auto" | "time" | "date" | "datetime";

export function formateTime(
  inputDate: string,
  options: { mode: Mode } = { mode: "auto" }
) {
  const date = new Date(inputDate) as Date;
  const now = new Date() as Date;

  const isSameDate = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  const isToday = isSameDate(date, now);

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = isSameDate(date, yesterday);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getTime = (d: Date) =>
    d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const getDate = (d: Date) => d.toLocaleDateString("en-GB"); // dd/mm/yyyy

  const mode = options.mode || "auto";

  if (mode === "time") {
    return getTime(date);
  }

  if (mode === "date") {
    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    if (
      (now as unknown as number) - (date as unknown as number) <
      7 * 24 * 60 * 60 * 1000
    ) {
      return daysOfWeek[date.getDay()];
    }
    return getDate(date);
  }

  if (mode === "datetime") {
    let label;
    if (isToday) label = "Today";
    else if (isYesterday) label = "Yesterday";
    else if (
      (now as unknown as number) - (date as unknown as number) <
      7 * 24 * 60 * 60 * 1000
    )
      label = daysOfWeek[date.getDay()];
    else label = getDate(date);
    return `${label}, ${getTime(date)}`;
  }

  // Default WhatsApp-like behavior ("auto")
  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  if (
    (now as unknown as number) - (date as unknown as number) <
    7 * 24 * 60 * 60 * 1000
  )
    return daysOfWeek[date.getDay()];
  return getDate(date);
}