import express from 'express';
import { signIn,login} from '../controllers/userController.js';


const route =  express.Router()
route.post('/signIn',signIn)
route.post('/login',login)
route.post('/logIn',login)


export default route