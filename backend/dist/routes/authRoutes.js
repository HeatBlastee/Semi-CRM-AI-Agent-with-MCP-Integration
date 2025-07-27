"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed },
    });
    res.json(user);
});
router.post('/login', async (req, res) => {
    console.log("Received login data:", req.body);
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });
    res.json({ token });
});
module.exports = router;
