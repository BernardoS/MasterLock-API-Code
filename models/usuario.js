import { v4 as randomIdGenerator } from 'uuid';

export default class Usuario{
    constructor(email,nome) {
        this.Id = randomIdGenerator();
        this.Nome = nome;
        this.Email = email;
      }
}