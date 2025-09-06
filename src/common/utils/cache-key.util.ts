export class CacheKeyUtil {
  static getIfscKey(ifsc: string): string {
    return `ifsc:${ifsc.toUpperCase()}`;
  }

  static getIfscListKey(): string {
    return 'ifsc:list';
  }

  static getIfscStatsKey(): string {
    return 'ifsc:stats';
  }
}
