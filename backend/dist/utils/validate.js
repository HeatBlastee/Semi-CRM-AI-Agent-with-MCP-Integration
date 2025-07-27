"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadSchema = void 0;
const zod_1 = require("zod");
exports.leadSchema = zod_1.z.object({
    name: zod_1.z.string(),
    source: zod_1.z.string(),
    contact: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional()
    }).optional(),
    interestedProducts: zod_1.z.array(zod_1.z.string()).optional().default([]),
    status: zod_1.z.string().optional().default('new'),
    notes: zod_1.z.string().optional(),
});
