

import express from 'express';

const router = express.Router();

import {userLogin, userSignup} from '../controllers/UserController';


router.post('/login', userLogin);

router.post('/signup', userSignup);

export default router; 