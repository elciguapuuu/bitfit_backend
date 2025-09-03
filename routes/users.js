const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRouter = express.Router();
const prisma = new PrismaClient();

// Get all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create a new user
userRouter.post('/', async (req, res) => {
    const { email, name, password_hash, date_of_birth, gender } = req.body;
    // Convert date_of_birth to ISO DateTime at midnight if provided
    let dob = date_of_birth ? new Date(date_of_birth + 'T00:00:00.000Z') : null;
    try {
        const user = await prisma.users.create({
            data: { email, name, password_hash, date_of_birth: dob, gender },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create user' });
    }
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.users.delete({
            where: { user_id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete user' });
    }
});

module.exports = userRouter;
