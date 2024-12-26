import cors from "cors";
import { Router } from "express";

export const corsMiddlewere = Router();

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://192.168.1.107:8080'
  ]


corsMiddlewere.use(cors({
    origin : (origin, callback) =>{
      if(!origin){
        return callback(null, true);
      }
      if(ACCEPTED_ORIGINS.includes(origin)){
        return callback(null, true);
      }
      return callback(new Error('Not allowed by Cors'));
    }
  }))