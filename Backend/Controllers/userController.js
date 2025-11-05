import User from "../Model/userModel.js"
export const isCurrentUser = async (req, res) => {
    try {
        const id = req.userId
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "User Not Found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "User Authenticate successfully",
            user: user
        })
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: `${error}`
        })
    }
}
export const allUser = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json({
            status: "success",
            users: users
        })
    } catch (error) {

    }
}