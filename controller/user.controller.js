import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js';
import { Createjwttoken } from '../Auth/authorization.js';

export const userRegister = async (req, res) => {
    try {
        const { fullName, username, password, gender } = req.body

        const finduser = await User.findOne({ username: username });
        if (finduser) {
            return res.status(400).json({
                status: 400,
                msg: "User has been alredy exists."
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);
        console.log(hashpassword, "hashpassword");

        //profile photo API
        const maleprofilephoto = `https://xsgames.co/randomusers/avatar.php?g=male`;
        const femaleprofilephoto = `https://xsgames.co/randomusers/avatar.php?g=female`

        console.log(maleprofilephoto, "male");

        const response = await User.create({
            fullName: fullName,
            username: username,
            password: hashpassword,
            gender: gender,
            profilePhoto: gender === 'male' ? maleprofilephoto : femaleprofilephoto
        });
        if (!response) {
            return res.status(400).json({
                status: 400,
                msg: "Something went wrong"
            })
        } else {
            res.status(200).json({
                status: 200,
                msg: "user register successfully.",
                data: response
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "internal server error",
            data: err
        })
    }
};

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({
                status: false,
                msg: "Invalid Username" // Generic message
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400).json({
                status: false,
                msg: "Invalid password"
            })

        } else {
            const generateToken = await Createjwttoken({ username: user.username, userId: user._id });
            await User.findOneAndUpdate({ _id: user._id }, { $set: { auth_token: generateToken } });

            return res.status(200).json({
                status: true,
                msg: "User Login successfully",
                Token: generateToken,
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "internal server error",
            data: err
        })
    }
}

export const logOut = async (req, res) => {
    try {
        const userId = req.id; // Assuming req.user.id contains the user's ID
        const response = await User.findByIdAndUpdate({ _id: userId }, { $set: { auth_token: '' } }, { new: true });
        if (!response) {
            return res.status(404).json({
                status: false,
                msg: 'User not found'
            });
        }
        return res.status(200).json({
            status: true,
            msg: 'User logout successfully.'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "internal server error",
            error: err.message // Provide error message for better debugging
        })
    }
}

export const findUser = async (req, res) => {
    try {
        const loggedInuser = req.id
        const response = await User.find({ _id: { $ne: loggedInuser } }).select('-password');
        // console.log(response, "response");
        if (response.length === 0) {
            res.status(200).json({
                status: true,
                msg: "No user found"
            })
        } else {
            res.status(200).json({
                status: true,
                msg: "User find successfully",
                data: response
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            msg: "internal server error",
            error: err
        })
    }
}