const user = require('../models/mapping/user');
const jwt = require('jsonwebtoken');

const logIn = (req, res) => {
    const userData = user.findUser(req.body);
    if (userData) {

        const token = jwt.sign({ userId: userData.id, email: userData.email },
            process.env.JWT_SECRET_KEY);

        //res.cookie('jwt', token, { httpOnly: false });//, { httpOnly: true }

        res.status(200).json({ message: 'Login successful', token });

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
const logOut = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { logIn, logOut };