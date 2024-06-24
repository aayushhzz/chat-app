const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next) => {
    try {
        const {username, password,email} = req.body;
        const userNameCheck = await User.findOne({username});
        if(userNameCheck) {
            return res.json({message: 'Username already exists',status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck) {
            return res.json({message: 'Email already exists',status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req,res,next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(username=='' || password==''){
            return res.json({message: 'All fields are required',status: false});
        }
        if(!user) {
            return res.json({message: 'Username or Password is incorrect',status: false});
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) {
            return res.json({message: 'Username or Password is incorrect',status: false});
        }
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
};

module.exports.setAvatar = async (req,res,next) => {
    try {
        const _id = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findOneAndUpdate({_id:_id}, {
            avatar: avatarImage,
            isAvatarSet: true,
        });
        userData.avatar = avatarImage;
        userData.isAvatarSet = true;
        return res.json({isSet: userData.isAvatarSet, image: userData.avatar});
    }
    catch(error) {
        next(error);
    }
}


module.exports.allUsers = async (req,res,next) => {
    try {
        const users = await User.find({_id : {$ne: req.params._id}}).select([
            'username',
            'avatar',
            '_id',
            'email',
        ]);
        return res.json(users);
    } catch (error) {
        next(error);
    }
};
