"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const handler_1 = require("./commands/handler");
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/execute', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization; // Grab the Bearer token
        const response = yield (0, handler_1.handleCommand)(req.body, token);
        res.json(response.data);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(400).json({ error: err.message || 'Command failed' });
    }
}));
const PORT = 4000;
app.listen(PORT, () => console.log(`MCP running at http://localhost:${PORT}`));
