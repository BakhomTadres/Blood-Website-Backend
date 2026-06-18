import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  callCount: { type: Number, default: 0 },
  livesSaved: { type: Number, default: 0 },
});

export const Stats = new mongoose.model("Stats", statsSchema);