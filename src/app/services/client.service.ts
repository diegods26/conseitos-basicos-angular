import { Injectable } from '@angular/core';
import { Client } from '../cadastro/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = "_CLIENTS";

  constructor() { }

  save(client: Client) {
    const storage = this.getLocalStorage();
    storage.push(client);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  updateClient(client: Client ) : void {
    const storage = this.getLocalStorage();
    storage.forEach(c => {
      if (c.id === client.id) {
        Object.assign(c, client);
      }
    })

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));

  }

  getAllClients() : Client[] {
    const clientsList: Client[] = this.getLocalStorage();
    return clientsList;
  }

  getClientById(id: string) : Client | undefined {
    const clients = this.getLocalStorage();
    return clients.find(client => client.id === id);
  }

  deleteClient(client: Client) : void {
    const storage = this.getLocalStorage();
    const newList = storage.filter(c => c.id !== client.id);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(newList));
  }

  private getLocalStorage() : Client[] {
    const repoClients = localStorage.getItem(ClientService.REPO_CLIENTS);

    if (repoClients) {
      const clients: Client[] = JSON.parse(repoClients);
      return clients;
    }

    const Clients: Client[] = [];
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(Clients));
    return Clients;
  }
}
