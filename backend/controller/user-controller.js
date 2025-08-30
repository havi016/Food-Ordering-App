const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch(err){
        return next(err)
    }
    if(users.length === 0) {
        return res.status(404).json({message: "Internal Server Error"});
    }

    return res.status(200).json({ users });
};

const addUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    if (!name ||
        name.trim() ==="" ||
        !email ||
        email.trim() === "" ||
        !password ||
        password.length < 6){
        return res.status(422) .json({message:"invalid data"});
    }

    let user;
    try{
        let checkEmail = await User.findOne({email});
        if (checkEmail) {
            return res.status(400).json({message:"email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        user = await user.save();

        if(!user){
            return res.status(500).json({message:"unable to save user"});
        }
        return res.status(201).json({ user });

    }catch(err){
        return next(err)
    }
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    if (!name ||
        name.trim() ==="" ||
        !email ||
        email.trim() ==="" ||
        !password ||
        password.length < 6){
        return res.status(422) .json({message:"invalid data"});
    }

    let user;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword}, { new: true });
    }catch(err){
        return next(err)
    }

    if(!user){
        return res.status(500).json({message:"unable to save user"});
    }
    return res.status(201).json({ user });
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }catch(err){
        next(err);
    }
}

const loginUser = async (req, res, next) => {

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = jwt.sign({ id: user.id}, "secret_key", { expiresIn: "2h"})
        res.status(200).json({token});

    }catch(e){next(e)}
}

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) { return res.status(401).json({message:"Unauthorized no token provided"}); }

    const token = authHeader.split(' ')[1];
    try{
        const decodedToken = jwt.verify(token, "secret_key");
        req.userId = decodedToken;
        next();
    }catch(err){
        return res.status(401).json({message:"invalid token"});
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    }catch(err){
        next(err);
    }

}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.loginUser = loginUser;
exports.auth = auth;
exports.getCurrentUser = getCurrentUser;