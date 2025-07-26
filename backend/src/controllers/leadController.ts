import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { leadSchema } from '../utils/validate';

const prisma = new PrismaClient();

export const createLead = async (req: Request, res: Response) => {
    try {
        const validated = leadSchema.parse(req.body);
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
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getLeads = async (_: Request, res: Response) => {
    const leads = await prisma.lead.findMany();
    res.json(leads);
};

export const getLeadById = async (req: Request, res: Response) => {
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
};

export const updateLead = async (req: Request, res: Response) => {
    try {
        const lead = await prisma.lead.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(lead);
    } catch {
        res.status(404).json({ error: "Lead not found or invalid update" });
    }
};

export const deleteLead = async (req: Request, res: Response) => {
    try {
        await prisma.lead.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch {
        res.status(404).json({ error: "Lead not found" });
    }
};
