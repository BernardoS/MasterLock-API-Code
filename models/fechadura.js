import { v4 as randomIdGenerator } from 'uuid';

export default class Fechadura{
    constructor(idAmbiente,estaAberta,nomeAmbiente,nome) {
        this.Id = randomIdGenerator();
        this.Nome = nome;
        this.IdAmbiente = idAmbiente;
        this.NomeAmbiente = nomeAmbiente;
        this.EstaAberta = estaAberta;
      }
}