import { Request, Response } from "express";
import mongoose from "mongoose";
import { HTTP } from "../error/mainError";
import { streamUpload } from "../utils/streamUpload";
import authModel from "../model/authModel";
import FundModel from "../model/FundModel";

export const createBeg = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const { title, description, category, amountNeeded } = req.body;

    const { secure_url, public_id }: any = await streamUpload(req);

    const user: any = await authModel.findById(userID);
    if (user) {
      const abeg = await FundModel.create({
        title,
        description,
        category,
        image: secure_url,
        imageID: public_id,
        love: [],
        userID,
        amountNeeded: parseInt(amountNeeded),
        amountRaised: 0,
      });
      user?.beg.push(new mongoose.Types.ObjectId(abeg?._id!));
      user?.save();

      return res.status(HTTP.CREATED).json({
        message: "created beg successfully",
        data: abeg,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "create a profile first",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating profile",
      data: error.message,
    });
  }
};

export const viewBeg = async (req: Request, res: Response) => {
  try {
    const abeg = await FundModel.find();

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const viewOneBegPopulate = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const abeg = await authModel.findById(abegID).populate({
      path: "beg",
    });

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const viewOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const abeg = await FundModel.findById(abegID);

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const abeg = await FundModel.findByIdAndDelete(abegID);

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const updateOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const { title, description} = req.body;
    const abeg = await FundModel.findByIdAndUpdate(
      abegID,
      { title, description },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const giveOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const { amount } = req.body;

    const abegUser = await FundModel.findById(abegID);

    const abeg = await FundModel.findByIdAndUpdate(
      abegID,
      {
        amountNeeded: abegUser?.amountNeeded! - parseInt(amount),
        amountRaised: abegUser?.amountRaised! + parseInt(amount),
      },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};

export const searchCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const abeg = await FundModel.find(category);

    return res.status(HTTP.OK).json({
      message: "success",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error while searching",
      data: error.message,
    });
  }
};

export const likeBeg = async (req: Request, res: Response) => {
  try {
    const { userID, begID } = req.params;
    const abeg: any = await FundModel.findById(begID);

    const user: any = await authModel.findById(userID);

    console.log(begID);
    if (abeg && user) {
      const liked = await FundModel.findByIdAndUpdate(
        begID,
        {
          abeg: abeg?.like,
        },
        { new: true }
      );
      abeg?.like.push(new mongoose.Types.ObjectId(userID!));
      return res.status(HTTP.CREATED).json({
        message: "liked successfully",
        data: liked,
        length: abeg?.like.length,
      });
    } else if (abeg?.like.includes(userID)) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "you cannot like again",
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "beg not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error",
      data: error.message,
    });
  }
};