//library imports
import {Router} from 'express';

//local imports
import { getTodasPermissoesDaFechadura, getTodasPermissoesDoAmbiente ,getTodasPermissoesDoAdmin, vincularFechaduraPorEmail, vincularFechaduraPorSenhaNumerica, vincularFechaduraPorDigital, vincularFechaduraPorRFID, getTodasPermissoes, getPermissao, updatePermissao, createPermissao, deletePermissao, getListaTodasPermissoesDaFechadura } from '../controllers/permissaoController.js';
import {solicitarAberturaPorDigital, solicitarAberturaPorRFID, solicitarAberturaPorEmail, solicitarAberturaPorSenhaNumerica} from '../controllers/solicitacaoAberturaController.js';


const permissaoRouter = Router();


permissaoRouter.get('/todos', getTodasPermissoes);
permissaoRouter.get('/:id', getPermissao);

permissaoRouter.post('/admin', getTodasPermissoesDoAdmin);
permissaoRouter.post('/fechadura', getTodasPermissoesDaFechadura);
permissaoRouter.post('/ambiente', getTodasPermissoesDoAmbiente);
permissaoRouter.post('/fechadura-lista',getListaTodasPermissoesDaFechadura);

permissaoRouter.post('/solicitar-entrada/senha', solicitarAberturaPorSenhaNumerica);
permissaoRouter.post('/solicitar-entrada/email', solicitarAberturaPorEmail);
permissaoRouter.post('/solicitar-entrada/digital', solicitarAberturaPorDigital);
permissaoRouter.post('/solicitar-entrada/rfid', solicitarAberturaPorRFID);

permissaoRouter.put('/atualizar/:id', updatePermissao);

permissaoRouter.post('/cadastrar',createPermissao);

permissaoRouter.post('/vincular/usuario-email', vincularFechaduraPorEmail);
permissaoRouter.post('/vincular/usuario-senha', vincularFechaduraPorSenhaNumerica);
permissaoRouter.post('/vincular/usuario-digital', vincularFechaduraPorDigital);
permissaoRouter.post('/vincular/usuario-rfid', vincularFechaduraPorRFID);


permissaoRouter.delete('/deletar/:id', deletePermissao);


export default permissaoRouter;