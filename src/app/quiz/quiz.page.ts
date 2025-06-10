import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone:false,
})
export class QuizPage implements OnInit {
  playerName: string = '';
  currentQuestionIndex = 0;
  score = 0;
  showResult = false;

  questions = [
    {
      theme:'League of Legends',
      text: 'Qual campeão é conhecido como "o Amigo da Floresta"?',
      options: ['Amumu', 'Ivern', 'Maokai', 'Zac'],
      answer: 'Ivern'
    },
    {
      theme:'League of Legends',
      text: 'Qual é o papel principal do campeão Thresh?',
      options: ['Atirador', 'Caçador', 'Suporte', 'Top Lane'],
      answer: 'Suporte'
    },
    {
      theme:'League of Legends',
      text: 'Qual desses dragões concede velocidade de movimento?',
      options: ['Dragão Infernal', 'Dragão da Montanha', 'Dragão das Nuvens', 'Dragão do Oceano'],
      answer: 'Dragão das Nuvens'
    },
    {
      theme:'League of Legends',
      text: 'Qual campeão tem uma ultimate chamada "Investida do Veloz"?',
      options: ['Hecarim', 'Rammus', 'Volibear', 'Udyr'],
      answer: 'Hecarim'
    },
    {
      theme:'League of Legends',
      text: 'Qual foi o primeiro campeão lançado em League of Legends?',
      options: ['Singed', 'Ashe', 'Ryze', 'Annie'],
      answer: 'Singed'
    },
    {
      theme:'Clash Royale',
      text: 'Qual carta custa 1 de elixir?',
      options: ['Esqueletos', 'Mosqueteira', 'Golem', 'Gigante'],
      answer: 'Esqueletos'
    },
    {
      theme:'Clash Royale',
      text: 'Qual é a raridade da carta "Mago de Gelo"?',
      options: ['Comum', 'Rara', 'Épica', 'Lendária'],
      answer: 'Lendária'
    },
    {
      theme:'Clash Royale',
      text: 'Qual estrutura causa dano em área e explode ao ser destruída?',
      options: ['Canhão', 'Torre Inferno', 'Tesla', 'Torre Bomba'],
      answer: 'Torre Bomba'
    },
    {
      theme:'Clash Royale',
      text: 'Qual dessas cartas voadoras não ataca unidades terrestres e aéreas?',
      options: ['Dragão Infernal', 'Servos', 'Bebê Dragão', 'Balão'],
      answer: 'Balão'
    },
    {
      theme:'Clash Royale',
      text: 'Quantas cartas você pode ter em seu deck principal?',
      options: ['6', '8', '10', '12'],
      answer: '8'
    }
  ];

  constructor(private router: Router, private storageService: StorageService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.playerName = nav.extras.state['name'] || 'Jogador';
    }
  }

  ngOnInit() {}

  answer(option: string) {
    const current = this.questions[this.currentQuestionIndex];
    if (option === current.answer) {
      this.score++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.finalizeQuiz();
    }
  }

  async finalizeQuiz() {
    this.showResult = true;
    await this.storageService.saveScore(this.playerName, this.score);
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}
