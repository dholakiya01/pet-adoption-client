import jwt from 'jsonwebtoken';

export const Createjwttoken = async (data) => {
    try {
        const response = jwt.sign(data, process.env.JwtSecretKey, { expiresIn: '1d' })
        return response
    } catch (e) {
        console.log(e);
    }
}

export const VerifyJwtToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            status: 401,
            msg: "Authorization denied, token not provided"
        });
    };
    jwt.verify(token, process.env.JwtSecretKey, (error, decode) => {
        // console.log(decode,"decode");
        if (error) {
            return res.status(401).json({
                status: false,
                msg: "Token is not valid, authorization denied"
            });
        }
        req.id = decode.userId;
        // console.log(decode.gender,"30");
        next()
    })
}