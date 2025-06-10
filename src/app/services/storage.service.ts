import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Salvar jogador com pontuação
  async saveScore(name: string, score: number) {
    const data = await this.getAllScores();
    data.push({ name, score });
    await this._storage?.set('ranking', data);
  }

  // Buscar todos os jogadores
  async getAllScores(): Promise<{ name: string, score: number }[]> {
    return (await this._storage?.get('ranking')) || [];
  }

  // Limpar ranking
  async clearRanking() {
    await this._storage?.remove('ranking');
  }
}
