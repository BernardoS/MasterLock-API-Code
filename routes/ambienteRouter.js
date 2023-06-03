//library imports
import {Router} from 'express';

//local imports
import { createAmbiente, getTodosAmbientes, getAmbiente, updateAmbiente, deleteAmbiente, getAmbientesPorAdmin, verificarSeEhAdmin } from '../controllers/ambienteController.js';

const ambienteRouter = Router();


ambienteRouter.get('/todos', getTodosAmbientes);
ambienteRouter.get('/:id', getAmbiente);

ambienteRouter.put('/atualizar/:id', updateAmbiente);

ambienteRouter.post('/cadastrar', createAmbiente);
ambienteRouter.post('/admin', getAmbientesPorAdmin);
ambienteRouter.post('/verificar-admin',verificarSeEhAdmin);

ambienteRouter.delete('/deletar/:id', deleteAmbiente);

export default ambienteRouter;