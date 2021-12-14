import { getAllData, getSingleData } from "../services/commentServices";
import { ExegesisContext } from "exegesis";
/*
interface pathParams {
  id: string;
}
*/
/*
export const getAllComments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await getAllData();
    return res.status(200).json({ comments });
  } catch (e) {
    return next(e);
  }
};
*/
export const getAllComments = async (context: ExegesisContext) => {
  try {
    const data = await getAllData();
    return { data };
  } catch (error) {
    throw context.makeError(400, (error as Error).message);
  }
};

// do I need Request<pathParams>?
export const getSingleComment = async (context: ExegesisContext) => {
  try {
    const foundComment = await getSingleData(context.params.path.id);
    if (!foundComment) throw new Error("No comment found");
    context.res.status(200).json({ comment: foundComment });
  } catch (e) {
    throw context.makeError(400, (e as Error).message);
  }
};
