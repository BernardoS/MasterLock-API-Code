import { v4 as randomIdGenerator } from 'uuid';

export default class HistoricoFechadura{
    constructor(idFechadura,operacao,usuario,horario) {
        this.Id = randomIdGenerator();
        this.IdFechadura = idFechadura;
        this.Operacao = operacao;
        this.Usuario = usuario;
        this.Horario = horario;
      }
}