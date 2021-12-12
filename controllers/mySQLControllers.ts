import { ExegesisContext } from "exegesis";
import { InsertComment, SQLComment } from "../interfaces/mysqlComment";
import {
  getAllSQLComments,
  getSingleSQLComment,
  postSingleSQLComment,
} from "../services/mySQLCommentServices";

//  getAllSQLComments,
export const getAllComments = async (context: ExegesisContext) => {
  //exports.getAllComments =  async (context: ExegesisContext) => {
  try {
    const comments = await getAllSQLComments();
    return { comments: comments[0] };
  } catch (error) {
    throw context.makeError(400, "error with response");
  }
};

export const getSingleComment = async (context: ExegesisContext) => {
  //exports.getSingleComment = async (context: ExegesisContext) => {
  try {
    const queryResult = await getSingleSQLComment(context.params.path.id);
    if (queryResult[0].length === 0) {
      throw new Error("id not in database");
    }
    return { comment: queryResult[0][0] };
  } catch (e) {
    throw context.makeError(400, (e as Error).message);
  }
};

export const postSingleComment = async (context: ExegesisContext) => {
  //exports.postSingleComment = async (context: ExegesisContext) => {
  try {
    const createdComment = await postSingleSQLComment(
      context.req.body as InsertComment
    );
    if (createdComment.length === 0)
      throw new Error("Error creating a comment");
    // only the id is pass by sequelize
    return {
      ...context.req.body,
      id: createdComment[0],
    } as SQLComment;
  } catch (e) {
    throw context.makeError(400, (e as Error).message);
  }
};
