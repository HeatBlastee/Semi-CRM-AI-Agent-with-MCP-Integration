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
exports.handleCommand = handleCommand;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API = process.env.LEAD_API_URL;
if (!API) {
    throw new Error('Missing LEAD_API_URL in environment variables');
}
/**
 * Handles MCP commands
 * @param {{ command: string; data: any }} commandObj
 * @param {string} token - JWT token forwarded from AI agent
 */
function handleCommand(commandObj, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { command, data } = commandObj;
        switch (command) {
            case 'createLead':
                return axios_1.default.post(API, data, authHeader(token));
            case 'getLeads':
                return axios_1.default.get(API, authHeader(token));
            case 'getLeadById':
                if (!(data === null || data === void 0 ? void 0 : data.id))
                    throw new Error('Missing lead ID for getLeadById');
                return axios_1.default.get(`${API}/${data.id}`, authHeader(token));
            case 'updateLead':
                if (!(data === null || data === void 0 ? void 0 : data.id))
                    throw new Error('Missing lead ID for updateLead');
                return axios_1.default.put(`${API}/${data.id}`, data, authHeader(token));
            case 'deleteLead':
                if (!(data === null || data === void 0 ? void 0 : data.id))
                    throw new Error('Missing lead ID for deleteLead');
                return axios_1.default.delete(`${API}/${data.id}`, authHeader(token));
            default:
                throw new Error(`Unsupported command: ${command}`);
        }
    });
}
function authHeader(token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token, // 🔐 Pass token along to lead API
        },
    };
}
