//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import HistoricoFechadura from "../models/historicoFechadura.js";
import moment from "moment";

const firebaseFactory = new FirebaseFactory();

export const createHistoricoFechadura = async (req, res) => {

    const { idFechadura,operacao,usuario } = req.body;

    var horario = moment().format('DD/MM/YYYY hh:mm:ss');

    const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,operacao,usuario,horario);

    try {
      await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);
      res.status(201).json({
        message: "Historico registrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      res.status(404).send('Falha ao registrar histórico da fechadura');
    }
};

export const saveHistoricoFechaduraOffline = async (req,res) =>{

    const {permissaoOffline, horario, operacao } = req.body;

    var novoHistoricoFechadura = {};

    try {
      if(operacao == "Abertura liberada"){
        const permissaoBanco = await firebaseFactory.getData("/permissao/"+permissaoOffline);

        var operacaoCompleta = permissaoBanco.TipoEntrada +": "+operacao;

        novoHistoricoFechadura = new HistoricoFechadura(permissaoBanco.IdFechadura,operacaoCompleta,permissaoBanco.Idusuario,horario);
      }else{

        var operacaoCompleta = "OFFLINE:" + operacao;
        var idFechadura = permissaoOffline.split('|')[0];
        var chave = permissaoOffline.split('|')[1];

        novoHistoricoFechadura = new HistoricoFechadura(idFechadura,operacaoCompleta,"OFFLINE:"+chave,horario);
      }  

      res.status(201).json({
        message: "Historico registrado com sucesso!",
      });

    } catch (error) {
      console.log(error);
      res.status(404).send('Falha ao registrar histórico da fechadura');
    }

}  


export const getTodosHistoricosFechaduras = async (req, res) => {
  try {

    let data = null;

    data = await firebaseFactory.getData("/historicoFechadura");

    var historicosOrdenados = data.sort(
      (objA, objB) =>  Number(moment(objB.Horario, 'DD/MM/YYYY hh:mm:ss').toDate()) - Number(moment(objA.Horario, 'DD/MM/YYYY h:mm:ss').toDate()),
    );
    
    const response = historicosOrdenados;

    res.status(200).json(response);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os históricos');

  }
};

export const getHistoricosDeUmaFechadura = async (req, res) => {

  const { idFechadura } = req.params;

  try {

    const historicos = await firebaseFactory.getData("/historicoFechadura");;

    const historicosDaFechadura = Object.keys(historicos).map((key) => historicos[key]).filter(item => item.IdFechadura == idFechadura);

    var historicosOrdenados = historicosDaFechadura.sort(
      (objA, objB) =>  Number(moment(objB.Horario, 'DD/MM/YYYY hh:mm:ss').toDate()) - Number(moment(objA.Horario, 'DD/MM/YYYY h:mm:ss').toDate()),
    );

    res.status(200).json(historicosOrdenados);

  } catch (error) {
    
    console.log(error);

    res.status(404).send('Erro ao recuperar todos os históricos');

  }
};


export const getHistoricoFechadura = async (req, res) => {

  const { id } = req.params;

  try {

    const response = await firebaseFactory.getData('/historicoFechadura/'+id);

    res.status(200).json(response);

  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar dados do histórico');
    
  }
};

export const updateHistoricoFechadura = async (req, res) => {

  const { id } = req.params;

  const { idFechadura,operacao,usuario,horario } = req.body;

  const historicoFechadura = new HistoricoFechadura(idFechadura,operacao,usuario,horario);

  historicoFechadura.Id = id;

  try {

    await firebaseFactory.writeData('/historicoFechadura/'+historicoFechadura.Id,historicoFechadura);

    res.status(201).json({
      message: "Dados do histórico atualizados com sucesso!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao atualizar dados do usuário');

  }
};

export const deleteHistoricoFechadura = async (req,res)=>{

  const { id } = req.params;

  try {

    await firebaseFactory.deleteData('/historicoFechadura/'+id);

    res.status(201).json({
      message: "Dados do histórico deletados!",
    });

  } catch (error) {

    console.log(error);

    res.status(404).send('Falha ao deletar dados do histórico');

  }
};