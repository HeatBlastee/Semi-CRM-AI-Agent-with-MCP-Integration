import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();
const API: string = process.env.LEAD_API_URL!;
if (!API) {
    throw new Error('Missing LEAD_API_URL in environment variables');
}

/**
 * @typedef CommandObject
 * @property {string} command - The command name
 * @property {any} data - The payload data
 */

/**
 * Handles MCP commands
 * @param {{ command: string; data: any }} commandObj
 */
export async function handleCommand(commandObj: { command: string; data: any }) {
    const { command, data } = commandObj;

    switch (command) {
        case 'createLead':
            return axios.post(API, data, authHeader());

        case 'getLeads':
            return axios.get(API, authHeader());

        case 'getLeadById':
            if (!data?.id) throw new Error('Missing lead ID for getLeadById');
            return axios.get(`${API}/${data.id}`, authHeader());

        case 'updateLead':
            if (!data?.id) throw new Error('Missing lead ID for updateLead');
            return axios.put(`${API}/${data.id}`, data, authHeader());

        case 'deleteLead':
            if (!data?.id) throw new Error('Missing lead ID for deleteLead');
            return axios.delete(`${API}/${data.id}`, authHeader());

        default:
            throw new Error(`Unsupported command: ${command}`);
    }
}

/**
 * Constructs the authorization header
 */
function authHeader() {
    return {
        headers: {
            'Content-Type': 'application/json',
        },
    };
}
