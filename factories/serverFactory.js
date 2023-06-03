//lib imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import bodyParser from 'body-parser';
 
//local imports
import usuarioRouter from '../routes/usuarioRouter.js';
import permissaoRouter from '../routes/permissaoRouter.js';
import ambienteRouter from '../routes/ambienteRouter.js';
import fechaduraRouter from '../routes/fechaduraRouter.js';
import historicoFechadura from '../routes/historicoFechaduraRouter.js';


const require = createRequire(import.meta.url);
const swaggerDocs = require("../swagger.json");

export default class ServerFactory{

    constructor(){
        const server = express();
        
        server.use(express.urlencoded({limit:"30mb",extended:true}));
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(express.json({limit:"30mb",extended:true}));
        server.use(cors());

        server.use("/documentacao", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        server.use('/usuario',usuarioRouter);
        server.use('/permissoes',permissaoRouter);
        server.use('/fechadura',fechaduraRouter);
        server.use('/ambiente',ambienteRouter);
        server.use('/historico-fechadura',historicoFechadura);


        dotenv.config();

        const PORT = process.env.PORT;

        server.listen(PORT,()=>{
            console.log(`Servidor sendo executado na porta: ${PORT}`)
        });
    }

}

