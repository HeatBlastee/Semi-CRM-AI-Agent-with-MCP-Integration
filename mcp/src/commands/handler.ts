import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const API: string = process.env.LEAD_API_URL!;
if (!API) {
    throw new Error('Missing LEAD_API_URL in environment variables');
}

/**
 * Handles MCP commands
 * @param {{ command: string; data: any }} commandObj
 * @param {string} token - JWT token forwarded from AI agent
 */
export async function handleCommand(
    commandObj: { command: string; data: any },
    token: string
) {
    const { command, data } = commandObj;

    switch (command) {
        case 'createLead':
            return axios.post(API, data, authHeader(token));

        case 'getLeads':
            return axios.get(API, authHeader(token));

        case 'getLeadById':
            if (!data?.id) throw new Error('Missing lead ID for getLeadById');
            return axios.get(`${API}/${data.id}`, authHeader(token));

        case 'updateLead':
            if (!data?.id) throw new Error('Missing lead ID for updateLead');
            return axios.put(`${API}/${data.id}`, data, authHeader(token));

        case 'deleteLead':
            if (!data?.id) throw new Error('Missing lead ID for deleteLead');
            return axios.delete(`${API}/${data.id}`, authHeader(token));

        default:
            throw new Error(`Unsupported command: ${command}`);
    }
}

function authHeader(token: string) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token, // 🔐 Pass token along to lead API
        },
    };
}
