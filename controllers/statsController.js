import { Stats } from "../models/statsSchema.js";

export const getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create({ callCount: 0, livesSaved: 0 });
    }

    res.json({
      status: "success",
      data: { callCount: stats.callCount, livesSaved: stats.livesSaved },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const incrementCall = async (req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate(
      {},
      { $inc: { callCount: 1 } },
      { new: true, upsert: true },
    );

    res.json({ status: "success", data: { callCount: stats.callCount } });
  } catch (error) {
    res.status(500).json({ status: "error", data: { message: error.message } });
  }
};
