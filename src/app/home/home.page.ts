import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  playerName = '';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async startGame() {
    const name = this.playerName.trim();

    if (!name) {
      await this.presentAlert('Digite um nome para jogar.');
      return;
    }

    const existing = await this.storageService.getAllScores();
    const alreadyUsed = existing.some(player => player.name.toLowerCase() === name.toLowerCase());

    if (alreadyUsed) {
      await this.presentAlert('Esse nome já foi utilizado. Por favor, escolha outro.');
      return;
    }

    this.router.navigate(['/quiz'], {
      state: { name: name }
    });
  }

  goToRanking() {
    this.router.navigate(['/ranking']);
  }
}
