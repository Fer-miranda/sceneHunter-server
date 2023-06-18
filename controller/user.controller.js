const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
//   try {
// //nueva contraseña hasheada
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(req.body.password,salt)
    
// //nuevo usuario
//     const newUser = new User({
//         userName : req.body.userName,
//         email : req.body.email,
//         password : hashedPassword
//     })

// //nuevo usuario y la respuesta
//     const user = await newUser.save()
//     console.log("Success Registering user")
//     res.status(200).json({ user: newUser })

//     } catch(err){
//         console.log("Failed Registering user")
//         res.status(500).json(err)
//     } 
// }
try {
    const newUser = await User.create(req.body);
    res.json({ user: newUser });

} catch (error) {
    res.status(500).json({
        msg: "Failed Registering user",
        error
    })
}   
}

module.exports.login = async (req, res) => {
    const { userName, password } = req.body;

    User.findOne({ userName })
        .then(user => {
            if (user === null) {
                return res.status(400).json({ msg: "Username not registered" });
            } else {
                bcrypt.compare(password, user.password)
                    .then(isValid => {
                        if (isValid) {
                            const userToken = jwt.sign({
                                id: user._id
                            }, process.env.SECRET_KEY);

                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({user, msg: "Logging success!" })
                                console.log(userName) //agregado
                        } else {
                            res.status(403).json({ msg: "Wrong password" })
                        }
                    })
            }
        }).catch(err => res.json({
            msg: "Failed loggin to user",
            err
        }));
}

module.exports.logout = async (req, res) => {
    try {
        await User.findOne({ userName: req.body.userName });
        res.clearCookie('usertoken')
        .json({ msg: 'Bye, come back soon!' });

    } catch (error) {
        res.status(403).json({
            msg: "Failed to sign out",
            error
        })
    }
}
