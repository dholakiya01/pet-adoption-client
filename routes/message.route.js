import express from 'express';
import { getmessage, sendmessage } from '../controller/message.controller.js';
import { VerifyJwtToken } from '../Auth/authorization.js';

const router = express.Router();

router.post('/send/:id',VerifyJwtToken,sendmessage);
router.post('/:id',VerifyJwtToken,getmessage);

export default router