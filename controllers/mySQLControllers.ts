import { ExegesisContext } from "exegesis";
import { InsertComment } from "../interfaces/mysqlComment";
import {
  getAllSQLComments,
  getSingleSQLComment,
  postSingleSQLComment,
} from "../services/mySQLCommentServices";

//  getAllSQLComments,
exports.getAllComments =  async (context: ExegesisContext) => {
  console.log('get to here')
  try {
    const comments = await getAllSQLComments()
    return { comments: comments[0] }
  } catch (error) {
    throw context.makeError(400, "error with resonse")
  }
};

export const getSingleComment = async (context: ExegesisContext) => {
  try {
    const queryResult = await getSingleSQLComment(context.params.path.id);
    if (queryResult[0].length == 0) {throw Error("id not in database")} 
    return { comment: queryResult[0][0]}
  } catch (e) {
    context.res.status(400)
    if (e instanceof Error)
      throw context.makeError(400, e.message)
    throw context.makeError(400, "other error")
  }
};

export const postSingleComment = async (context: ExegesisContext) => {
  try {
    const createdComment = await postSingleSQLComment(context.req.body as InsertComment);
    if (!createdComment) throw new Error("Error creating a comment");
    return {
      ...context.req.body,
      id: createdComment[0],
    };
  } catch (e) {
    if(e instanceof Error)  
      throw context.makeError(400, e.message)
  }
};
