require('dotenv').config();

const User = require("../models/user.model")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken");

const JWT_SECRETKEY = process.env.JWT_SECRETKEY;


// signup
exports.signup = async (req, res) => {
    try {
        const { Name, Email, Password, Role } = req.body

        // existuser
        const exitUser = await User.findOne({ Email });
        if (exitUser) {
            return res.json({ msg: "User already exists" })
        }

        const hashedPassword = await bycrpt.hash(Password, 10);

        const user = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            Role
        })

        res.json({ msg: "Signup successfully", user })

    } catch (error) {
        res.status(500).json({ error })
    }
}


// login

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bycrpt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.Role },
            JWT_SECRETKEY,
            { expiresIn: "1d" }
        );

        // set cookie
res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
});

        res.json({
            msg: "Login successfully",
            user: {
                id: user._id,
                Name: user.Name,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (error) {
        res.status(500).json({ error });
    }
};

// profile

exports.profile = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id).select("-Password")
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ msg: "successfully", success: true, user })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// logout

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ msg: "logged out successfully" });
};
