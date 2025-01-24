const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body


    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400)
                .json({
                    message: "Użytkownik już istnieje"
                });
        }

        user = new User({ name, email, password, role })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = jwt
            .sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })
        res.status(201)
        .json({
            message: "Rejestracja zakończona sukcesem!",
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        })
    } catch (error) {
        console.error('Błąd rejestracji: ', error);
        res.status(500)
            .json({
                message: "Błąd serwera"
            })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400)
                .json({
                    message: "Użykownik nie znaleziony"
                })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400)
                .json({
                    message: "Nieprawidłowe dane logowania"
                })
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200)
        .json({
            message: "Zalogowano pomyślnie!",
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        })
    } catch (error) {
        console.error('Błąd rejestracji: ', error);
        res.status(500)
            .json({
                message: "Błąd serwera"
            })
    }
}


module.exports = {
    registerUser,
    loginUser
}