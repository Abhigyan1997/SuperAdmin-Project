const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt =require('jsonwebtoken');


function generateToken(id,name){
    return jwt.sign({userId:id,name:name,},"ThisIsAsecretKeyToEncrpytUserIdForSecureTheDataToHackedWriteAnyThing")
}




async function login(req, res) {
    try {
        const { Email, Password } = req.body;
        const userData = await User.findAll({ where: { Email: Email } });

        if (userData.length > 0) {
            const user = userData[0]; // Assuming there's only one user with the given email
            const hashedPasswordFromDB = user.password; // Extract hashed password from the user object

            bcrypt.compare(Password, hashedPasswordFromDB, (err, result) => {
                if (err) {
                    console.log("Error comparing passwords:", err);
                    return res.status(500).json({ message: "Something went wrong" });
                }

                if (result === true) {
                    return res.status(200).json({ message: "User Logged in successfully", token: generateToken(user.id, user.Name) });
                } else {
                    return res.status(401).json({ message: "Password mismatch" });
                }
            });
        } else {
            return res.status(404).json({ message: "User does not exist" });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

// Function to create a new user
async function createUser(req, res) {
  try {
    const { name, role, email, password } = req.body;

    // if (name === undefined || name.length === 0 || password == null || password.length === 0 || email == null || email.length === 0) {
    //   return res.status(400).json({ err: 'Bad Parameter, Something is missing' });
    // }
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    await User.create({ name, role, email, password: hashedPassword });
    res.status(201).json({ message: "Successfully created a new user" });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}


// Function to get a user by ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    // Find the user by ID using Sequelize
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Function to delete a user by ID
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Find the user by ID using Sequelize
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete the user using Sequelize
    await user.destroy();

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}



module.exports = {
  createUser,
  getUserById,
  deleteUser,
  login
  // Add other functions here
};
