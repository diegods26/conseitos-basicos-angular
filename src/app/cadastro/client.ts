import { v4 as uuid } from 'uuid';

export class Client {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: string;
  estado?: string;
  municipio?: string;

  static newClient() {
    const client = new Client();
    client.id = uuid();
    return client;
  }
}
