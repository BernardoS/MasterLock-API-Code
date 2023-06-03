//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import Usuario from "../models/usuario.js";

const firebaseFactory = new FirebaseFactory();


export const cadastrarUsuario = async (req, res) => {

  const { email, nome, senha } = req.body;

  const novoUsuario = new Usuario(email,nome);

  try {

    const userInfo =  await firebaseFactory.cadastrarUsuario(novoUsuario,senha);

    await firebaseFactory.writeData('/usuario/'+novoUsuario.Id,novoUsuario);

    res.status(201).json({
      message: "Usuário cadastrado",
      reponse: userInfo.toJSON()
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao cadastrar usuário');

  }
};

export const cadastrarConvidado = async(req,res) =>{
  const { email, nome } = req.body;

  const novoUsuario = new Usuario(email,nome);
  try {

    await firebaseFactory.writeData('/usuario/'+novoUsuario.Id,novoUsuario);

    res.status(201).json({
      message: "Usuário convidado cadastrado",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao cadastrar usuário');

  }

}

function retirarCaracteresInvalidosDoEmail(email){
  var email = email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  console.log(email);
  return email;
}

export const getTodosUsuarios = async (req, res) => {
  try {

    let data = null;

    data = await firebaseFactory.getData("/usuario");
    
    const response = data;

    res.status(200).json(response);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os usuários');

  }
};


export const getUsuario = async (req, res) => {

  const { id } = req.params;

  try {

    const response = await firebaseFactory.getData('/usuario/'+id);

    res.status(200).json(response);

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar dados deste usuário');

  }
};

export const getUsuarioPorEmail = async (req, res) => {

  const { email } = req.body;

  try {

    const response = await firebaseFactory.getData('/usuario');
    
    const listaDeUsuarios = Object.keys(response).map((key) => response[key]).filter(item => item.Email == email);

      if(response == null || listaDeUsuarios.length == 0){
        throw new Error("Nenhuma fechadura encontrada")
      }
      res.status(200).json(listaDeUsuarios[0]);

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar dados deste usuário');

  }
};



export const updateUsuario = async (req, res) => {

  const { id } = req.params;

  const { email, nome } = req.body;

  const usuario = new Usuario(email,nome);
  usuario.Id = id;

  try {

    await firebaseFactory.writeData('/usuario/'+usuario.Id,usuario);

    res.status(201).json({
      message: "Dados do usuário atualizados!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao atualizar dados do usuário');

  }
};

export const deleteUsuario = async (req,res)=>{

  const { id } = req.params;

  try {

    await firebaseFactory.deleteData('/usuario/'+id);

    res.status(201).json({
      message: "Dados do usuário deletados!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao deletar dados do usuário');

  }
};