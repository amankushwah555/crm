"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post("/login", [ check("email", 
// "Email is required!").isEmail(),
// check("password", "Password is required!").isLength({min: 6})
// ], async (req: Request, res: Response) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({
//             message: errors.array
//         })
//     }
//     const {email, password} = req.body;
//     try {
//      const user = await User.findOne({
//         email,
//      })
//      if(!user){
//         return res.status(400).json({message: "Invalid Credentials"})
//      } 
//      const isMatch = await bcrypt.compare(password, user.password)
//      if(!isMatch){
//         return res.status(400).json({message: "Invalid Credentials"})
//      }
//      if(!req.body){
//          return res.status(400).json({message: "Email and password is required!"})
//      }
//      const token = jwt.sign({userID: user.id}, process.env.JWT_SECRET_KEY as string, {
//         expiresIn: '1d'
//      })
//      res.cookie("auth_token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 86400000
//      })
//      res.status(200).json({
//         userId: user._id
//      })
//     } catch(err) {
//         console.log(err);
//         res.status(500).send({
//             message: "Something went wrong!"
//         })
//     }
// })
// router.get("/validate-token", verifyToken, async (req: Request, res:  Response) => {
//    res.status(200).send({ userId: req.userID })
// })
// router.post("/logout", async (req: Request, res: Response) => {
//     res.cookie("auth_token", "", {
//       expires: new Date(0),
//     } )
//     res.send();
// })
exports.default = router;
