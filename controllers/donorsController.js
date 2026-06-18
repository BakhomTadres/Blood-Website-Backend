import { Donor } from "../models/donorsSchema.js";
export const addDonor = async (req, res) => {
  const donor = new Donor({ ...req.body });
  await donor.save();
  res.status(201).json({ status: "success", data: { donor } });
};
export const getDonors = async (req, res) => {
  const { bloodGroup, city } = req.query;

  const filter = {};

  if (bloodGroup) filter.bloodGroup = bloodGroup;
  if (city) filter.city = city;
  const donors = await Donor.find(filter);
  res.json({ status: "success", data: { donors } });
};
export const deleteDonor = async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ status: "success", message: "Donor deleted successfully" });
};
export const updateDonor = async (req, res) => {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ status: "success", data: {donor} });
};
