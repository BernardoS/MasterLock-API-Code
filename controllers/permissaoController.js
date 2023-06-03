//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import Permissao from "../models/permissao.js";

const firebaseFactory = new FirebaseFactory();

//#region requisições POST

export const createPermissao = async (req, res) => {

    const { idFechadura, idUsuario } = req.body;

    const novaPermissao = new Permissao(idFechadura,idUsuario);

    try {
      await firebaseFactory.writeData('/permissao/'+novaPermissao.Id,novaPermissao);
      res.status(201).json({
        message: "Usuário Vinculado a fechadura com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send('Falha ao vincular usuário a fechadura');
    }
};

export const vincularFechaduraPorEmail = async (req, res) => {

  const { idFechadura, idUsuario, email } = req.body;

  const novaPermissao = new Permissao(idFechadura,idUsuario,"Email");

  novaPermissao.vincularFechaduraPorEmail(retirarCaracteresInvalidosDoEmail(email));

  try {
    await firebaseFactory.writeData('/permissao/'+novaPermissao.Id,novaPermissao);
    res.status(201).json({
      message: "Usuário Vinculado a fechadura com sucesso!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Falha ao vincular usuário a fechadura');
  }
};

function retirarCaracteresInvalidosDoEmail(email){
  var email = email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  console.log(email);
  return email;
}

export const vincularFechaduraPorDigital = async (req, res) => {

  const { idFechadura, idUsuario, idDigital } = req.body;

  const novaPermissao = new Permissao(idFechadura,idUsuario,"Digital");

  novaPermissao.vincularFechaduraPorDigital(idDigital);

  try {
    await firebaseFactory.writeData('/permissao/'+novaPermissao.Id,novaPermissao);
    res.status(201).json({
      message: "Usuário Vinculado a fechadura com sucesso!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Falha ao vincular usuário a fechadura');
  }
};

export const vincularFechaduraPorSenhaNumerica = async (req, res) => {

  const { idFechadura, idUsuario, senhaNumerica } = req.body;

  const novaPermissao = new Permissao(idFechadura,idUsuario,"Senha Numérica");

  novaPermissao.vincularFechaduraPorSenhaNumerica(senhaNumerica);

  try {
    await firebaseFactory.writeData('/permissao/'+novaPermissao.Id,novaPermissao);
    res.status(201).json({
      message: "Usuário Vinculado a fechadura com sucesso!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Falha ao vincular usuário a fechadura');
  }
};

export const vincularFechaduraPorRFID = async (req, res) => {

  const { idFechadura, idUsuario, codigoRFID } = req.body;

  const novaPermissao = new Permissao(idFechadura,idUsuario,"RFID");

  novaPermissao.vincularFechaduraPorSenhaNumerica(codigoRFID);

  try {
    await firebaseFactory.writeData('/permissao/'+novaPermissao.Id,novaPermissao);
    res.status(201).json({
      message: "Usuário Vinculado a fechadura com sucesso!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Falha ao vincular usuário a fechadura');
  }
};


//#endregion 

  
export const getTodasPermissoes = async (req, res) => {
  try {

    let data = null;

    data = await firebaseFactory.getData("/permissao");
    
    const response = data;

    res.status(200).json(response);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os dados da tabela usuarioFechadura');

  }
};

export const getTodasPermissoesDoAdmin = async (req, res) => {

  const {idAdmin} = req.body;

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

    listaDeFechaduras = listaDeFechaduras.map((fechadura) => fechadura.Id);

    if(listaDeFechaduras.length == 0){
      res.status(201).json({message:"Nenhuma fechadura encontrada",listaDeFechaduras})
    }
    
    const todasPermissoes = await firebaseFactory.getData("/permissao");

    let permissoesDoAdmin = [];

    listaDeFechaduras.forEach((fechadura)=>{
      var permissoesDaFechadura = Object.keys(todasPermissoes).map((key) => todasPermissoes[key]).filter(item => item.IdFechadura == fechadura);
        permissoesDaFechadura.forEach((permissao)=>{
          permissoesDoAdmin.push(permissao);
        })
    });

    res.status(200).json(permissoesDoAdmin);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os dados da tabela Permissao');

  }
};


export const getTodasPermissoesDoAmbiente = async (req, res) => {

  const {IdAmbiente} = req.body;

  try {
    const fechaduras = await firebaseFactory.getData("/fechadura");

    const listaDeFechaduras = Object.keys(fechaduras).map((key) => fechaduras[key]).filter(item => item.IdAmbiente == IdAmbiente).map((fechadura) => fechadura.Id);

    if(listaDeFechaduras.length == 0){
      res.status(201).json({message:"Nenhuma fechadura encontrada no ambiente",listaDeFechaduras})
    }

    const todasPermissoes = await firebaseFactory.getData("/permissao");

    let permissoesDoAmbiente = [];

    listaDeFechaduras.forEach((fechadura)=>{
        var permisssoesDaFechadura = Object.keys(todasPermissoes).map((key) => todasPermissoes[key]).filter(item => item.IdFechadura == fechadura);
        permisssoesDaFechadura.forEach((permissao)=>{
          permissoesDoAmbiente.push(permissao);
        })
    });

    if(permissoesDoAmbiente.length == 0){
      res.status(201).json({message:"Nenhuma permissão encontrada no ambiente",permissoesDoAmbiente})
    }

    res.status(200).json(permissoesDoAmbiente);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os dados da tabela Permissao');

  }
};

export const getTodasPermissoesDaFechadura = async (req, res) => {

  const {idFechadura} = req.body;

  try {
    const todasPermissoes = await firebaseFactory.getData("/permissao");

    const permissoesDaFechadura = Object.keys(todasPermissoes).map((key) => todasPermissoes[key]).filter(item => item.IdFechadura == idFechadura);

    res.status(200).json(permissoesDaFechadura);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os dados da tabela Permissao');

  }
};


export const getListaTodasPermissoesDaFechadura = async (req, res) => {

  const {idFechadura} = req.body;

  try {
    const todasPermissoes = await firebaseFactory.getData("/permissao");

    const permissoesDaFechadura = Object.keys(todasPermissoes).map((key) => todasPermissoes[key]).filter(item => item.IdFechadura == idFechadura).map((fechadura) => fechadura.Id);

    res.status(200).json(permissoesDaFechadura);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os dados da tabela Permissao');

  }
};



export const getPermissao = async (req, res) => {

  const { id } = req.params;

  try {

    const response = await firebaseFactory.getData('/permissao/'+id);

    res.status(200).json(response);

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar os dados de vinculação de usuário/fechadura');
    
  }
};

export const updatePermissao = async (req, res) => {

  const { id } = req.params;

  const { idFechadura, idUsuario } = req.body;

    const permissao = new Permissao(idFechadura,idUsuario);

    permissao.Id = id;

  try {

    await firebaseFactory.writeData('/permissao/'+permissao.Id,permissao);

    res.status(201).json({
      message: "Dados de vinculação de usuário/fechadura atualizados com sucesso!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao atualizar dados de permissão');

  }
};

export const deletePermissao = async (req,res)=>{

  const { id } = req.params;

  try {

    await firebaseFactory.deleteData('/permissao/'+id);

    res.status(201).json({
      message: "Dados de permissão deletados!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao deletar dados de permissão');

  }
};