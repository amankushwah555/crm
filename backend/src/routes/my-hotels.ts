import express, { Request, Response } from "express";
const router = express.Router()
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";


// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// })
// router.post("/", verifyToken, [
//     body("name").notEmpty().withMessage('Name is required'),
//     body("city").notEmpty().withMessage('City is required'),
//     body("country").notEmpty().withMessage('Country is required'),
//     body("description").notEmpty().withMessage('Description is required'),
//     body("type").notEmpty().withMessage('Hotel type is required'),
//     body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
//     body("facilities").notEmpty().isArray().withMessage('Facilities are required'),
// ], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
//     try {
//         const imageFiles = req.files as Express.Multer.File[];
//         const newHotel: HotelType = req.body
//         const uploadPromises = imageFiles.map(async (image) => {
//             const b64 = Buffer.from(image.buffer).toString('base64')
//             let dataURI = "data:" + image.mimetype + ";base64," + b64;
//             const res = await cloudinary.v2.uploader.upload(dataURI)
//             return res.url;
//         })

//         const imageUrls = await Promise.all(uploadPromises);
//         newHotel.imageUrls = imageUrls;
//         newHotel.lastUpdated = new Date()
//         newHotel.userID = req.userID;

//         const hotel = new Hotel(newHotel);
//         await hotel.save();
//         res.status(201).send(hotel)
//     } catch (err) {
//         console.log("Error creating hotel: ", err)
//         res.status(500).json({
//             message: "Something went wrong!"
//         })
//     }
// })



// router.get("/", verifyToken, async (req: Request, res: Response) => {
 
//     try {
//         const hotels = await Hotel.find({
//             userID: req.userID
//         })
//         res.status(200).json(hotels);
//     } catch (err) {
//         res.status(500).json({
//             message: "Error fetching hotels"
//         })
//     }
// })

export default router;