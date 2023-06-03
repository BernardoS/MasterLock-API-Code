import { v4 as randomIdGenerator } from 'uuid';

export default class Ambiente{
    constructor(idAdmin,nomeAmbiente) {
        this.Id = randomIdGenerator();
        this.IdAdmin = idAdmin;
        this.NomeAmbiente = nomeAmbiente;
      }
}