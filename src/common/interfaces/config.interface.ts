export interface DatabaseConfig {
  mongodb: {
    uri: string;
  };
}

export interface CacheConfig {
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
}

export interface AppConfig {
  freshnessDays: number;
  cacheTtl: number;
}

