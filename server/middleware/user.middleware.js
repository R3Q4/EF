import verifyToken from "../utilities/verifier.js"

const userMiddleware = async (req, res, next) => {
    // Verify token
    try {
        await verifyToken(req, res, async() =>{

        // Check if user role is user
        if (req.user.role != 'user') {
            return res.status(403).json({ error : "Unauthorized: User access only"})
        }

        next()})
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token"})
    }
}

export default userMiddleware