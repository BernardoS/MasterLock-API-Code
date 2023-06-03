//library imports
import {Router} from 'express';

//local imports
import { saveHistoricoFechaduraOffline,createHistoricoFechadura, getTodosHistoricosFechaduras, getHistoricoFechadura, updateHistoricoFechadura, deleteHistoricoFechadura, getHistoricosDeUmaFechadura } from '../controllers/historicoFechaduraController.js';

const historicoFechaduraRouter = Router();


historicoFechaduraRouter.get('/todos', getTodosHistoricosFechaduras);
historicoFechaduraRouter.get('/:id', getHistoricoFechadura);
historicoFechaduraRouter.get('/fechadura/:idFechadura', getHistoricosDeUmaFechadura);

historicoFechaduraRouter.post('/cadastrar',createHistoricoFechadura);
historicoFechaduraRouter.post('/cadastrar-offline',saveHistoricoFechaduraOffline);

historicoFechaduraRouter.put('/atualizar/:id', updateHistoricoFechadura);

historicoFechaduraRouter.delete('/deletar/:id', deleteHistoricoFechadura);

export default historicoFechaduraRouter;