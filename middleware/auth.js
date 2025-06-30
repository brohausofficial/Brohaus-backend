import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    // Extracting JWT from headers from request
    let token = req.headers.authorization; // Check token in HTTP-only cookie (Web)
    if (!token) {
        return res.status(401).json({error: 'Unauthorized, Token is missing'});
    }
    token = token.split(' ')[1];
    try {
        req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
    return next();
}

export default authUser
