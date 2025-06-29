import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { GameResult } from '../models/game-result';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() results: GameResult[] = [];
  displayedColumns: string[] = ['identificador','vencedor', 'dataHora'];

  constructor() {}
}
