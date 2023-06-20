export function convertDateToDateInputValue(date: Date | null): string {
  if (!date) {
    return "";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function convertDateInputValueToDate(dateInputValue: string): Date | null {
  const date = Date.parse(dateInputValue);

  if (isNaN(date)) {
    return null;
  } else {
    return new Date(date);
  }
}

export function convertDateToDateTimeInputValue(date: Date | null): string {
  if (!date) {
    return "";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
