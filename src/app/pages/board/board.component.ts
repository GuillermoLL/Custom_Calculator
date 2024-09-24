import { Component } from '@angular/core';
import { CalculatorComponent } from "../../components/calculator/calculator.component";
import { Calculator } from '../../components/calculator/calculator.type';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CalculatorComponent],
  template: `
    @for (calculator of calculators; track calculator.id) {
      <section>
        <app-calculator [data]="calculator"/>
      </section>
    }
  `,
  styles: ``
})
export class BoardComponent {
  calculators: Calculator[] = [{
    id: 1,
    name: 'Player 1',
    element: [{
      id: 1,
      name: 'Life',
      color: 'red',
      icon: 'heart',
      resultDefault: 100,
      resultActual: 100,
      customOperations: []
    }]
  },
  {
    id: 2,
    name: 'Player 2',
    element: [{
      id: 1,
      name: 'Life',
      color: 'red',
      icon: 'heart',
      resultDefault: 100,
      resultActual: 100,
      customOperations: []
    },
    {
      id: 2,
      name: 'Mana',
      color: 'blue',
      resultDefault: 50,
      resultActual: 50,
      customOperations: []
    }]
  },
  {
    id: 3,
    name: 'Player 3',
    element: [{
      id: 1,
      name: 'Life',
      color: 'red',
      icon: 'heart',
      resultDefault: 100,
      resultActual: 100,
      customOperations: [
        {
          operator: '+',
          numberToApply: 500,
          color: 'green',
        },
        {
          operator: '-',
          numberToApply: 500,
          color: 'red',
        }]
    }]
  }]
}
