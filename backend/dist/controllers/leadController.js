"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const client_1 = require("@prisma/client");
const validate_1 = require("../utils/validate");
const prisma = new client_1.PrismaClient();
const createLead = async (req, res) => {
    try {
        const validated = validate_1.leadSchema.parse(req.body);
        const lead = await prisma.lead.create({
            data: {
                name: validated.name,
                source: validated.source,
                email: validated.contact?.email,
                phone: validated.contact?.phone,
                interestedProducts: validated.interestedProducts,
                status: validated.status || 'New',
                notes: validated.notes,
            },
        });
        res.json(lead);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createLead = createLead;
const getLeads = async (_, res) => {
    const leads = await prisma.lead.findMany();
    res.json(leads);
};
exports.getLeads = getLeads;
const getLeadById = async (req, res) => {
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!lead)
        return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
};
exports.getLeadById = getLeadById;
const updateLead = async (req, res) => {
    try {
        const lead = await prisma.lead.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(lead);
    }
    catch {
        res.status(404).json({ error: "Lead not found or invalid update" });
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        await prisma.lead.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    }
    catch {
        res.status(404).json({ error: "Lead not found" });
    }
};
exports.deleteLead = deleteLead;
