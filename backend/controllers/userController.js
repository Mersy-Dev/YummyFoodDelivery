import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


//login user controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials, user does not exist"
            });
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials, password is incorrect"
            });
        }
        //create token
        const token = createToken(user._id);
        return res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

    const createToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
    }

    //register user controller
    const registerUser = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            //check if user already exists
            const userExists = await userModel.findOne({
                email
            });
            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }
            //validate email
            if (!validator.isEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email"
                });
            }
            //validate password
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be atleast 6 characters"
                });
            }

            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //create user
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            });
            const user = await newUser.save();
            //create token
            const token = createToken(user._id);
            return res.status(201).json({
                success: true,
                token
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }

    };








    export { loginUser, registerUser };