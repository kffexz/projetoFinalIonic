import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: false,
})
export class RankingPage implements OnInit {
  scores: { name: string; score: number }[] = [];

  constructor (private router: Router, private storageService: StorageService, private alertController: AlertController
  ){}
  async ngOnInit() {
    this.scores = await this.storageService.getAllScores();
    // Ordenar por pontuação (opcional)
    this.scores.sort((a, b) => b.score - a.score);
  }

  async clearRanking() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja realmente apagar o ranking?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.storageService.clearRanking();
            this.scores = [];
          }
        }
      ]
    });

    await alert.present();
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}
