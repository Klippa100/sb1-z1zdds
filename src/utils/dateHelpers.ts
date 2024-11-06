import { format as dateFnsFormat } from 'date-fns';

export function format(date: Date, formatStr: string): string {
  return dateFnsFormat(date, formatStr);
}

export function isFuture(date: Date): boolean {
  return date.getTime() > new Date().getTime();
}

export function isWithinNextDays(date: Date, days: number): boolean {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);
  return date >= now && date <= future;
}

export function sortByDate<T extends { date: Date }>(items: T[], ascending = true): T[] {
  return [...items].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return ascending ? diff : -diff;
  });
}