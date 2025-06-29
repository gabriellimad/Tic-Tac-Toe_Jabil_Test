import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should alternate players between X and O', () => {
    component.makeMove(0); // X
    expect(component.board[0]).toBe('X');

    component.makeMove(1); // O
    expect(component.board[1]).toBe('O');
  });

  it('should detect a win', () => {
    spyOn(component.gameFinished, 'emit');
    component.board = ['X', 'X', '', '', '', '', '', '', ''];
    component.currentPlayer = 'X';
    component.makeMove(2); // X wins
    expect(component.winner).toBe('X');
    expect(component.gameFinished.emit).toHaveBeenCalledWith('X');
  });

  it('should detect a draw', () => {
    spyOn(component.gameFinished, 'emit');
    component.board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', ''];
    component.currentPlayer = 'X';
    component.makeMove(8);
    expect(component.draw).toBeTrue();
    expect(component.gameFinished.emit).toHaveBeenCalledWith('D');
  });

  it('should reset the board correctly', () => {
    component.board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    component.winner = 'X';
    component.draw = true;

    component.reset();

    expect(component.board.every(cell => cell === '')).toBeTrue();
    expect(component.winner).toBeNull();
    expect(component.draw).toBeFalse();
    expect(component.currentPlayer).toBe('X');
  });
});
