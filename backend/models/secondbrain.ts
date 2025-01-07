import mongoose, { model, Schema } from "mongoose";

const SecondbrainSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true , unique: true},

});

export const SecondbrainModel = model("Secondbrain", SecondbrainSchema);


export const LinkModel = model("Link", LinkSchema);

// export default SecondbrainModel;
