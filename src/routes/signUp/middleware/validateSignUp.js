const validateSignUp = (req, res, next) => {
    const errors = [];
    const { username, email, password } = req.body;

    if (!username || username.trim().length < 3) {
        errors.push({ field: 'username', message: 'Username must have at least 3 characters.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'No valid E-Mail.' });
    }
    if (!password || password.length < 6) {
        errors.push({ field: 'password', message: 'Password must have at least 6 characters.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({success: false, errors});
    }

    next();
};

module.exports = {validateSignUp};
