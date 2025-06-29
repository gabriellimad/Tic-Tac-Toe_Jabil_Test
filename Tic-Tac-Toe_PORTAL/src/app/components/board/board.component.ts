import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() mode: 'user-vs-user' | 'user-vs-cpu' = 'user-vs-user';
  @Output() gameFinished = new EventEmitter<string>();
  @Output() resetClicked = new EventEmitter<void>();
  @Output() gameStarted = new EventEmitter<void>();

  board: string[] = Array(9).fill('');
  currentPlayer = 'X';
  winner: string | null = null;
  draw = false;

  makeMove(i: number) {
    if (this.board[i] || this.winner) return;

    if (this.board.every(cell => cell === '')) {
      this.gameStarted.emit();
    }

    this.board[i] = this.currentPlayer;
    this.checkGame();

    if (!this.winner && !this.draw) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

      if (this.mode === 'user-vs-cpu' && this.currentPlayer === 'O') {
        setTimeout(() => this.makeAIMove(), 500);
      }
    }
  }

  makeAIMove() {
    const emptyIndices = this.board
      .map((v, i) => (v === '' ? i : -1))
      .filter(i => i !== -1);

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    this.makeMove(randomIndex);
  }

  checkGame() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.gameFinished.emit(this.winner);
        return;
      }
    }

    if (!this.board.includes('')) {
      this.draw = true;
      this.gameFinished.emit('D'); // Draw
    }
  }

  reset() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
    this.draw = false;
    this.resetClicked.emit();
  }
}
