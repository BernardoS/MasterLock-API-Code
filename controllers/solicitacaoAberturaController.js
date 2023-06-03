//local imports
import FirebaseFactory from "../Factories/firebaseAdminFactory.js";
import HistoricoFechadura from "../models/historicoFechadura.js";
import moment from "moment";


const firebaseFactory = new FirebaseFactory();


export const solicitarAberturaPorSenhaNumerica = async (req, res) => {

    const { idFechadura,senhaNumerica } = req.body;
  
    const id =  idFechadura+"|"+senhaNumerica;
  
    try {
  
      const usuarioPerimitido = await firebaseFactory.getData('/permissao/'+id);

      if(usuarioPerimitido != null){

          const { Idusuario } = usuarioPerimitido;

          const fechaduraAberta = await abrirFechadura("Senha numérica",idFechadura,Idusuario);

          if(fechaduraAberta){

              res.status(200).json({
                  message:"entrada liberada",
                  success:true
              });
          }
      }else{

          var horario = moment().format('DD/MM/YYYY hh:mm:ss');

          const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,"Senha numérica: Abertura bloqueada","SENHA NUMÉRICA:"+senhaNumerica,horario.toString());

          await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);

        res.status(404).json({
            message:"entrada bloqueada",
            success:false
        })
      }
    } catch (error) {
  
      console.log(error);
  
      res.status(404).send('Erro ao recuperar os dados de vinculação de usuário/fechadura');
      
    }
};

export const solicitarAberturaPorRFID = async (req, res) => {

  const { idFechadura,infoCartao } = req.body;

  const id =  idFechadura+"|"+infoCartao;

  try {

    const usuarioPerimitido = await firebaseFactory.getData('/permissao/'+id);

        if(usuarioPerimitido != null){

            const { Idusuario } = usuarioPerimitido;

            const fechaduraAberta = await abrirFechadura("RFID",idFechadura,Idusuario);

            if(fechaduraAberta){

                res.status(200).json({
                    message:"entrada liberada",
                    success:true
                });
            }
        }else{

            var horario = moment().format('DD/MM/YYYY hh:mm:ss');

            const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,"RFID: Abertura bloqueada","CARTÃO RFID:"+infoCartao,horario.toString());

            await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);

          res.status(404).json({
              message:"entrada bloqueada",
              success:false
          })
        }
  } catch (error) {

    console.log(error);

    res.status(404).send('Erro ao recuperar os dados de vinculação de usuário/fechadura');
    
  }
};
  
export const solicitarAberturaPorDigital = async (req, res) => {
  
      const { idFechadura, idDigital } = req.body;
    
      const id =  idFechadura+"|"+idDigital;
    
      try {
    
        const usuarioPerimitido = await firebaseFactory.getData('/permissao/'+id);

        if(usuarioPerimitido != null){

          const { Idusuario } = usuarioPerimitido;

          const fechaduraAberta = await abrirFechadura("DIGITAL",idFechadura,Idusuario);

          if(fechaduraAberta){

              res.status(200).json({
                  message:"entrada liberada",
                  success:true
              });
          }
      }else{

          var horario = moment().format('DD/MM/YYYY hh:mm:ss');

          const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,"RFID: Abertura bloqueada","DIGITAL:"+idDigital,horario.toString());

          await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);

        res.status(404).json({
            message:"entrada bloqueada",
            success:false
        })
      }
    
      } catch (error) {
    
        console.log(error);
    
        res.status(404).send('Erro ao recuperar os dados de vinculação de usuário/fechadura');
        
      }
};
  
export const solicitarAberturaPorEmail = async (req, res) => {
  
      const { idFechadura, email } = req.body;
    
      const id =  idFechadura+"|"+retirarCaracteresInvalidosDoEmail(email);
    
      try {
    
        const usuarioPerimitido = await firebaseFactory.getData('/permissao/'+id);

        if(usuarioPerimitido != null){

            const { Idusuario } = usuarioPerimitido;

            const fechaduraAberta = await abrirFechadura("Email",idFechadura,Idusuario);

            if(fechaduraAberta){

                res.status(200).json({
                    message:"entrada liberada",
                    success:true
                });
            }
        }else{

            var horario = moment().format('DD/MM/YYYY hh:mm:ss');

            const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,"Email: Abertura bloqueada","EMAIL:"+email,horario.toString());

            await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);

          res.status(404).json({
              message:"entrada bloqueada",
              success:false
          })
        }
    
      } catch (error) {
    
        console.log(error);
    
        res.status(404).send('Erro ao recuperar os dados de vinculação de usuário/fechadura');
        
      }
};

function retirarCaracteresInvalidosDoEmail(email){
  var email = email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  console.log(email);
  return email;
}


const abrirFechadura = async(metodo,idFechadura,idUsuario)=>{

    let responseSuccess = false; 

    try {

        await firebaseFactory.writeData('/fechadura/'+idFechadura+'/EstaAberta',"true");

        var horario = moment().format('DD/MM/YYYY hh:mm:ss');

        const novoHistoricoFechadura = new HistoricoFechadura(idFechadura,metodo+": Abertura liberada",idUsuario,horario.toString());

        await firebaseFactory.writeData('/historicoFechadura/'+novoHistoricoFechadura.Id,novoHistoricoFechadura);
    
        responseSuccess = true;
    
    } catch (error) {

        console.log(error);

    }

    return responseSuccess;
}
