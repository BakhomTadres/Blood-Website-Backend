import JWT from "jsonwebtoken"
export const verifyToken = async (req, res, next) => {
    const authHeaders = req.headers["Authorization"] || req.headers["authorization"]
    if (!authHeaders) {
        return res.status(400).json({status: "fail", message: "Token is Required"});
    }
    const token = authHeaders.split(" ")[1];
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET_KEY)
    req.user = decoded;
    next();
}