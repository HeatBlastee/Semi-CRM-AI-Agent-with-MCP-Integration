import express from 'express';
import { authenticate } from '../middlewares/auth';
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} from '../controllers/leadController';

const router = express.Router();

router.use(authenticate);

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
