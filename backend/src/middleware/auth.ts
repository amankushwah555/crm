import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userID: string
        }
    }
}


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({
            message: "Unauthorized "
        })
    }
    try {

        const decoded  = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userID = (decoded as JwtPayload).userID
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Unauthorized "
        })
    }
    
}

export default verifyToken

