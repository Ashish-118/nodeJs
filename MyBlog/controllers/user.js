const { User } = require('../models/user');

async function registration(req, res) {
    const { username, email, password, profileImage, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).render('signup', { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).render('signup', { error: "Username or Email already exists" });
    }
    const newUser = await User.create({
        username,
        email,
        password,

    });

    if (!newUser) {
        return res.status(500).render('signup', { error: "Error creating user. Please try again." });
    }

    return res.status(201).render('/', { success: "Registration successful. Please sign in." });

}