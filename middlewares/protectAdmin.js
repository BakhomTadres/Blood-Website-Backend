export const protectAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "fail", message: "Not authorized" });
  }
  next();
};
