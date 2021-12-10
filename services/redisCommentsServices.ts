import Redis from "ioredis";

// connect to localhost:6379
const redis = new Redis();
interface RedisInter {
  [key: string]: string;
}
export const getRedisComment = async (
  key: string
): Promise<RedisInter | null> => {
  const result = await redis.get(key);
  if (result) return JSON.parse(result) as RedisInter;
  return null;
};

// set a key-val pair for 120 seconds
export const setRedisComment = async (
  key: string,
  valuesAsJSONString: string
) => {
  return redis.setex(key, 120, valuesAsJSONString);
};
