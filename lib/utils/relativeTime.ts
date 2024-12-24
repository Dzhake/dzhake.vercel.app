type MaybeDateValue = string | number | Date | null | undefined;
type MaybeDate = string | number | Date | { created_at: MaybeDateValue } | null | undefined;

function coerceDate(date: MaybeDate) {
  // Look at `created_at` property, to allow passing database objects as parameters
  if (typeof date === "object" && date !== null && "created_at" in date) {
    return coerceDate(date.created_at);
  }
  return new Date(Date.parse(date as string));
}

export function getRelativeTimeInDays(date: MaybeDate, relativeTo: MaybeDate) {
  // Parse timestamps and set to UTC midnight
  date = coerceDate(date).setUTCHours(0, 0, 0, 0);
  relativeTo = coerceDate(relativeTo).setUTCHours(0, 0, 0, 0);

  const diffMs = Math.abs(date - relativeTo);
  if (Number.isNaN(diffMs)) return;
  const suffix = date < relativeTo ? "earlier" : "later";

  // Note: minimum returned duration - 1 day (optimal for blog posts)
  const count = Math.max(Math.floor(diffMs / (24 * 3600_000)), 1);
  const singular = count % 10 == 1 && count % 100 != 11;
  return `${count == 1 ? "a" : count} day${singular ? "" : "s"} ${suffix}`;
}
