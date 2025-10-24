import verifyToken from "../utilities/verifier.js"

const authMiddleware = async (req, res, next) => {
    // Verify token
    try {
        await verifyToken(req, res)
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token"})
    }
}

export default authMiddleware