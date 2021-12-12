import { ExegesisContext } from "exegesis-express";
import {
  getRedisComment,
  setRedisComment,
} from "../services/redisCommentsServices";

exports.getValueFromKey = async (context: ExegesisContext) => {
  try {
    const comment = await getRedisComment(context.params.path.key);
    if (comment === null) throw new Error("key not in redis");
    return comment;
  } catch (error) {
    if (error instanceof Error) {
      throw context.makeError(400, error.message);
    }
  }
};

exports.setValueWithKey = async (context: ExegesisContext) => {
  try {
    const message = await setRedisComment(
      context.params.path.key,
      JSON.stringify(context.requestBody)
    );
    return message;
  } catch (error) {
    if (error instanceof Error) {
      throw context.makeError(400, error.message);
    }
  }
};
