"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const leadController_1 = require("../controllers/leadController");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.post('/', leadController_1.createLead);
router.get('/', leadController_1.getLeads);
router.get('/:id', leadController_1.getLeadById);
router.put('/:id', leadController_1.updateLead);
router.delete('/:id', leadController_1.deleteLead);
module.exports = router;
