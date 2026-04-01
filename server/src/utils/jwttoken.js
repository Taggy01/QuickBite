import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (userId, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        console.log("JWT_SECRET is not defined in ENV");
        return res.status(400).json({
            message : "Invaild JWT",
        });
    }

    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn : '1d',
    });
    res.cookie("jwt",token,{
        maxAge: 1*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
    });
};

export default generateToken;