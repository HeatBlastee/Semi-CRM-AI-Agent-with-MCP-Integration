import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { handleCommand } from './commands/handler';
const verifyToken = require('./middleware/verifyToken'); 

dotenv.config();
const app = express();
app.use(express.json());

app.post('/execute', async (req: Request, res: Response) => {
    try {
        const response = await handleCommand(req.body);
        res.json(response.data);
    } catch (err: any) {
        console.error('Error:', err);
        res.status(400).json({ error: err.message || 'Command failed' });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`MCP running at http://localhost:${PORT}`));
