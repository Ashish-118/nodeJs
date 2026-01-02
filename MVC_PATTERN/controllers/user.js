const userModel = require('../models/user');


async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({});
        const html = `
            <ul>
            ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
            </ul>
            `
        return res.send(html);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users' });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userModel.findById(req.params.id);
        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching user' });
    }
}

async function updateUserById(req, res) {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { last_name: "changed" });

        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        return res.status(500).json({ error: 'Error updating user' });
    }
}


async function createUser(req, res) {
    try {
        const userData = req.body;

        if (!userData || !userData.first_name || !userData.last_name || !userData.email || !userData.job_title || !userData.gender)
            return res.status(400).json({ error: "All fields are required" });


        const createdUser = await userModel.create({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            job_title: userData.job_title,
            gender: userData.gender
        })

        console.log('createdUser:', createdUser);

        return res.status(201).json({ message: "User created successfully", user: createdUser });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
}

module.exports = { getAllUsers, getUserById, updateUserById, createUser };