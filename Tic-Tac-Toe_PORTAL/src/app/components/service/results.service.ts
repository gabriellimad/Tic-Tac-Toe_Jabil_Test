import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { GameResult } from '../models/game-result';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = `${environment.apiUrl}/resultados`;

  constructor(private http: HttpClient) {}

  getLastResults(): Observable<GameResult[]> {
    return this.http.get<GameResult[]>(`${this.apiUrl}/ultimos`);
  }

  saveResult(result: GameResult): Observable<any> {
    return this.http.post(this.apiUrl, result);
  }
}

