export default () => ({
  freshnessDays: parseInt(process.env.FRESHNESS_DAYS ?? '7', 10),
  cacheTtl: parseInt(process.env.CACHE_TTL ?? '60', 10),
});