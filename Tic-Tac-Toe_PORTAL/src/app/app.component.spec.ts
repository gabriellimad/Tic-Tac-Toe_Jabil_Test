import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResultsService } from './components/service/results.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockResultsService = {
    getLastResults: jasmine.createSpy().and.returnValue(of([])),
    saveResult: jasmine.createSpy().and.returnValue(of(null)),
  };

  const mockToastr = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ResultsService, useValue: mockResultsService },
        { provide: ToastrService, useValue: mockToastr },
        provideAnimations()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // ignora componentes filhos standalone no template
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load results on init', () => {
    expect(mockResultsService.getLastResults).toHaveBeenCalled();
  });

  it('should change mode', () => {
    component.onModeChange('user-vs-cpu');
    expect(component.mode).toBe('user-vs-cpu');
  });

  it('should call loadResults on reset', () => {
    spyOn(component, 'loadResults');
    component.onReset();
    expect(component.loadResults).toHaveBeenCalled();
  });

  it('should save result and show success', () => {
    component.saveResult('X');
    expect(mockResultsService.saveResult).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Result saved successfully!', 'Success');
  });
});
