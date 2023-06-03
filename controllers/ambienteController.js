//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import Ambiente from "../models/ambiente.js";

const firebaseFactory = new FirebaseFactory();

export const createAmbiente = async (req, res) => {

    const { idAdmin,nomeAmbiente } = req.body;

    const novoAmbiente = new Ambiente(idAdmin,nomeAmbiente);
    
    try {
      await firebaseFactory.writeData('/ambiente/'+novoAmbiente.Id,novoAmbiente);

      res.status(201).json({
        message: "Ambiente registrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send('Falha ao registrar ambiente');
    }
  };

  
export const getTodosAmbientes = async (req, res) => {
  try {

    let data = null;

    data = await firebaseFactory.getData("/ambiente");
    
    const response = data;

    res.status(200).json(response);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os ambientes');

  }
};

export const verificarSeEhAdmin = async (req,res) =>{

  const {idAdmin} = req.body;

  try {

    let ambientes = null;

    ambientes = await firebaseFactory.getData("/ambiente");
    
    const listaDeAmbientes = Object.keys(ambientes).map((key) => ambientes[key]).filter(item => item.IdAdmin == idAdmin);

    if(listaDeAmbientes.length == 0){
      res.status(201).json({message:"Nenhum ambiente vinculado ao usuário",isAdmin:false})
    }else{
      res.status(200).json({message:"Existem ambientes vinculados ao usuário",isAdmin:true});
    } 

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os ambientes');

  }
}

export const getAmbientesPorAdmin = async (req, res) => {

  const {idAdmin} = req.body;

  try {

    let ambientes = null;

    ambientes = await firebaseFactory.getData("/ambiente");
    
    const listaDeAmbientes = Object.keys(ambientes).map((key) => ambientes[key]).filter(item => item.IdAdmin == idAdmin);

    if(listaDeAmbientes.length == 0){
      res.status(201).json({message:"Nenhum ambiente encontrado",listaDeAmbientes:listaDeAmbientes})
    }

    const response = listaDeAmbientes;

    res.status(200).json(listaDeAmbientes);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os ambientes');

  }
};

export const getAmbiente = async (req, res) => {

  const { id } = req.params;

  try {

    const response = await firebaseFactory.getData('/ambiente/'+id);

    res.status(200).json(response);

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar dados deste ambiente');
    
  }
};



export const updateAmbiente= async (req, res) => {

  const { id } = req.params;

  const { idAdmin,nomeAmbiente } = req.body;

  const ambiente = new Ambiente(idAdmin,nomeAmbiente);

  ambiente.Id = id;

  try {

    await firebaseFactory.writeData('/ambiente/'+ambiente.Id,ambiente);

    res.status(201).json({
      message: "Dados do ambiente atualizados com sucesso!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao atualizar dados do ambiente');

  }
};

export const deleteAmbiente = async (req,res)=>{

  const { id } = req.params;

  try {

    await firebaseFactory.deleteData('/ambiente/'+id);

    res.status(201).json({
      message: "Dados do ambiente deletados!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao deletar dados do ambiente');

  }
};