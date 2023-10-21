import { Request, Response } from 'express';
import User  from '../models/user'; // Import your User model from the appropriate location
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Here, you can create a session or generate a JWT token for authentication

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout a user (if using session-based authentication)
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // If you are using a session-based authentication strategy, you can destroy the session to log the user out.
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Failed to log out' });
            } else {
                res.status(200).json({ message: 'Logged out successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

