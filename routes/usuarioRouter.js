//library imports
import {Router} from 'express';

//local imports
import { getTodosUsuarios, getUsuario, updateUsuario, deleteUsuario, cadastrarUsuario, getUsuarioPorEmail, cadastrarConvidado } from '../controllers/usuarioController.js';

const usuarioRouter = Router();

usuarioRouter.get('/todos', getTodosUsuarios);
usuarioRouter.get('/:id', getUsuario)

usuarioRouter.put('/atualizar/:id', updateUsuario);

usuarioRouter.post('/cadastrar', cadastrarUsuario);
usuarioRouter.post('/cadastrar-convidado', cadastrarConvidado);
usuarioRouter.post('/email', getUsuarioPorEmail);

usuarioRouter.delete('/deletar/:id', deleteUsuario);

export default usuarioRouter;