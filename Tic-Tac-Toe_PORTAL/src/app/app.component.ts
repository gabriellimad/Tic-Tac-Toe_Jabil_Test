import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ResultsComponent } from './components/results/results.component';
import { ResultsService } from './components/service/results.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { GameResult } from './components/models/game-result';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BoardComponent,
    ResultsComponent,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  results: GameResult[] = [];
  mode: 'user-vs-user' | 'user-vs-cpu' = 'user-vs-user';
  gameStarted = false; // NOVO

  constructor(
    private resultsService: ResultsService,
    private toastr: ToastrService
  ) {
    this.loadResults();
  }

  loadResults() {
    this.resultsService.getLastResults().subscribe({
      next: (data) => {
        this.results = data;
      },
      error: (err) => {
        console.error('Error loading results:', err);
      },
    });
  }

  saveResult(result: string) {
    const data: GameResult = {
      vencedor: result,
      dataHora: new Date().toISOString(),
    };

    this.resultsService.saveResult(data).subscribe({
      next: () => {
        this.toastr.success('Result saved successfully!', 'Success');
        this.loadResults();
      },
      error: (err: any) => {
        console.error('Error saving result:', err);
        this.toastr.error('Failed to save result.', 'Error');
      },
    });
  }

  onReset() {
    this.gameStarted = false;
    this.loadResults();
  }

  onModeChange(newMode: 'user-vs-user' | 'user-vs-cpu') {
    if (this.gameStarted) {
      this.toastr.warning('Você não pode mudar o modo no meio do jogo.', 'Aviso');
      return;
    }
    this.mode = newMode;
  }

  onGameStarted() {
    this.gameStarted = true;
  }
}
