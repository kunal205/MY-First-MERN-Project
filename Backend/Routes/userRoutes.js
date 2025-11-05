import { allUser, isCurrentUser } from "../Controllers/userController.js"
import express from 'express'
import isAuth from "../Middleware/isAuth.js"
export const userRouter = express.Router()
userRouter.get("/current", isAuth, isCurrentUser)
userRouter.get("/users", allUser)