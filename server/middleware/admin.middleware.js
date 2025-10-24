import verifyToken from "../utilities/verifier.js"

const adminMiddleware = async (req, res, next) => {
    // Verify token
    try {
        await verifyToken(req, res)

        // Check if user role is admin
        if (req.user.role != 'admin') {
            return res.status(403).json({ error : "Unauthorized: Admin access only"})
        }

        next()
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token"})
    }
}

export default adminMiddleware