//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import Fechadura from "../models/fechadura.js";

const firebaseFactory = new FirebaseFactory();

export const createFechadura = async (req, res) => {

    const { idAmbiente,estaAberta,nomeAmbiente, nome } = req.body;

    const novaFechadura = new Fechadura(idAmbiente,estaAberta,nomeAmbiente,nome);

    try {
      await firebaseFactory.writeData('/fechadura/'+novaFechadura.Id,novaFechadura);
      res.status(201).json({
        message: "Fechadura registrada com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send('Falha ao registrar fechadura!');
    }
  };


  export const getTodasFechaduras = async (req, res) => {
    try {
      let data = null;
  
      data = await firebaseFactory.getData("/fechadura");
      
      const response = data;
  
      res.status(200).json(response);
  
    } catch (error) {
      
      console.log(error);
  
      res.status(404).send('Erro ao recuperar todas as fechaduras');
  
    }
  };

  export const getFechaduraPorAmbiente = async (req,res) =>{

    const {idAmbiente} = req.params;

    try {
      let data = null;
  
      data = await firebaseFactory.getData("/fechadura");

      const listaDeFechaduras = Object.keys(data).map((key) => data[key]).filter(item => item.IdAmbiente == idAmbiente);

      if(data == null || listaDeFechaduras.length == 0){
        throw new Error("Nenhuma fechadura encontrada")
      }
      res.status(200).json(listaDeFechaduras);

    } catch (error) {
      console.log(error);
  
      res.status(404).send('Erro ao recuperar as fechaduras deste ambiente');
    }
  }

  export const getFechaduraPorAdmin = async (req,res) =>{

    const {idAdmin} = req.params;

    try {
  
        const ambientes = await firebaseFactory.getData("/ambiente");

        const listaDeAmbientes = Object.keys(ambientes).map((key) => ambientes[key]).filter(item => item.IdAdmin == idAdmin).map((ambiente) => ambiente.Id);

        if(listaDeAmbientes.length == 0){
          res.status(201).json({message:"Nenhum ambiente encontrado",listaDeFechaduras:listaDeAmbientes})
        }

        const fechaduras = await firebaseFactory.getData("/fechadura");

        let listaDeFechaduras = [];

        listaDeAmbientes.forEach((ambiente)=>{
          var fechadurasDoAmbiente = Object.keys(fechaduras).map((key) => fechaduras[key]).filter(item => item.IdAmbiente == ambiente);
          fechadurasDoAmbiente.forEach((fechadura)=>{
            listaDeFechaduras.push(fechadura);
          })
        });

        if(listaDeFechaduras.length == 0){
          res.status(201).json({message:"Nenhuma fechadura encontrada",listaDeFechaduras})
        }

        res.status(200).json({message:"Lista de Fechaduras encontrada",listaDeFechaduras});

    } catch (error) {
      console.log(error);
  
      res.status(404).send('Erro ao recuperar as fechaduras deste ambiente');
    }
  }

  
  
  export const getFechadura = async (req, res) => {
  
    const { id } = req.params;
  
    try {
  
      const response = await firebaseFactory.getData('/fechadura/'+id);
  
      res.status(200).json(response);
  
    } catch (error) {
  
      console.log(error);
  
      res.status(404).send('Erro ao recuperar dados desta fechadura');
      
    }
  };


  export const updateFechadura = async (req, res) => {

    const { id } = req.params;
  
    const { idAmbiente,estaAberta,nomeAmbiente,nome } = req.body;

    const fechadura = new Fechadura(idAmbiente,estaAberta,nomeAmbiente, nome);
  
    fechadura.Id = id;
  
    try {
  
      await firebaseFactory.writeData('/fechadura/'+fechadura.Id,fechadura);
  
      res.status(201).json({
        message: "Dados da fechadura atualizados com sucesso!",
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(404).send('Falha ao atualizar dados da fechadura');
  
    }
  };

  export const deleteFechadura = async (req,res)=>{

    const { id } = req.params;
  
    try {
  
      await firebaseFactory.deleteData('/fechadura/'+id);
  
      res.status(201).json({
        message: "Dados da fechadura deletados!",
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(404).send('Falha ao deletar dados da fechadura');
  
    }
  };