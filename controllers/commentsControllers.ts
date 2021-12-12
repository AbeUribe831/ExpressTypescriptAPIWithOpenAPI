import { NextFunction, Request, Response } from "express";
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
exports.getAllComments = function getAllComments(context: ExegesisContext) {
  console.log("get to here");
  getAllData()
    .then((data) => {
      return context.res.status(200).json({ data });
    })
    .catch((err) => {
      return context.res.status(400).body({ error: err });
    });
};
// do I need Request<pathParams>?
export const getSingleComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundComment = await getSingleData(req.params.id);

    if (!foundComment)
      //return next()
      throw new Error("No comment found");
    res.status(200).json({ comment: foundComment });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
