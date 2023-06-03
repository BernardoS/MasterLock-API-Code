//library imports
import {Router} from 'express';

//local imports
import { createFechadura, getTodasFechaduras, getFechadura, updateFechadura, deleteFechadura, getFechaduraPorAmbiente, getFechaduraPorAdmin } from '../controllers/fechaduraController.js';

const fechaduraRouter = Router();


fechaduraRouter.get('/todos', getTodasFechaduras);
fechaduraRouter.get('/ambiente/:idAmbiente', getFechaduraPorAmbiente);
fechaduraRouter.get('/admin/:idAdmin', getFechaduraPorAdmin);
fechaduraRouter.get('/:id', getFechadura);

fechaduraRouter.put('/atualizar/:id', updateFechadura);

fechaduraRouter.post('/cadastrar',createFechadura);

fechaduraRouter.delete('/deletar/:id', deleteFechadura);

export default fechaduraRouter;