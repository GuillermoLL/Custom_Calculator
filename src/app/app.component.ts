import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from "./components/calculator/calculator.component";
import { CommonModule } from '@angular/common';
import { Calculator } from './components/calculator/calculator.type';
import { BoardComponent } from './pages/board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
