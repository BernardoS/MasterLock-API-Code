import { v4 as randomIdGenerator } from 'uuid';

export default class Permissao{
    constructor(idFechadura,idUsuario,tipoEntrada) {
        this.Id = randomIdGenerator();
        this.IdFechadura = idFechadura;
        this.Idusuario = idUsuario;
        this.TipoEntrada = tipoEntrada;
        this.CodigoPermissao = "";
    }

    vincularFechaduraPorEmail(email){
      this.Id =  this.IdFechadura+"|"+email;
      this.CodigoPermissao = email;
    }

    vincularFechaduraPorSenhaNumerica(senhaNumerica){
      this.Id =  this.IdFechadura+"|"+senhaNumerica;
      this.CodigoPermissao = senhaNumerica;
    }

    vincularFechaduraPorDigital(idDigital){
      this.Id =  this.IdFechadura+"|"+idDigital;
      this.CodigoPermissao = idDigital;
    }

    vincularFechaduraPorRFID(codigoRFID){
      this.Id =  this.IdFechadura+"|"+codigoRFID;
      this.CodigoPermissao = codigoRFID;
    }
}