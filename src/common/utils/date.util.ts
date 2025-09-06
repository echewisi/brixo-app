export class DateUtil {
  static isDateFresh(date: Date, freshnessDays: number): boolean {
    const now = new Date();
    const daysDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= freshnessDays;
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static formatDate(date: Date): string {
    return date.toISOString();
  }
}
