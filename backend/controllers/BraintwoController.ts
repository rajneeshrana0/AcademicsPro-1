import { LinkModel, SecondbrainModel } from "../models/secondbrain";

import  { Request, Response } from "express";
import { random } from "../utils/utils";
import UserModel from "../models/user";

// Crete post of Brain 2

export const contentCreate = async (req: Request, res: Response) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    await SecondbrainModel.create({
      title,
      link,
      type,
      // @ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.status(200).json({
      message: "Content created successfully",
      data: req.body,
      // newContent,
    });
  } catch {
    res.status(400).json({
      message: "Content not created",
      data: req.body,
    });
  }
};

/// Get all content of a user

export const contentGet = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const content = await SecondbrainModel.find({
      userId,
    }).populate("userId", "username");

    res.status(200).json({
      message: "Content fetched successfully",
      data: req.body,
      content,
    });
  } catch {
    res.status(400).json({
      message: "Content not found",
      data: req.body,
    });
  }
};

// Delete content of a user
export const contentDelete = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;

  const contentId = req.body.contentId;

  await SecondbrainModel.deleteMany({
    contentId,
    userId,
  });

  res.status(200).json({
    message: "Content deleted successfully",
    data: req.body,
  });
};

export const contentShare = async (req: Request, res: Response) => {


  const { share } = req.body

  if (share) {

    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.status(400).json({
        message: "Share link already exists",
        data: req.body,
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      //@ts-ignore
      userId: req.userId,
      hash,
    });
    res.status(200).json({
      message: "Share link created successfully",
      data: req.body,
      hash,
    });
  
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      message: "Share link deleted successfully",
      data: req.body,
    });
    
  }

 
};

export const contentShareWithId = async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Share link not found",
      data: req.body,
    });
    return;
  }

  // user id

 const content = await SecondbrainModel.find({
    userId: link.userId,
  });

  const user =await UserModel.findOne({
    _id: link.userId,
  });

  if(!user){
    res.status(411).json({
      message: "User not found",
      data: req.body,
    });
    return;
  }

  res.status(200).json({
    message: "Share link created successfully",
    data: req.body,
    username: user.username,
    content,
  });
};
