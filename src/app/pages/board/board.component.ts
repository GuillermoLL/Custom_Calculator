import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator, CalculatorComponent, Color, Icon, Operator } from '../../components';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CalculatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="container row">
      @for (calculator of calculators; track calculator.id) {
          <app-calculator [data]="calculator" class="col"/>
        }
    </article>
    `,
  styles: ``
})
export class BoardComponent {
  calculators: Calculator[] = [{
    id: 1,
    name: 'Player 1',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.RED,
      icon: Icon.HEART,
      resultDefault: 100,
      resultCurrent: 100,
      customOperations: []
    }]
  },
  {
    id: 2,
    name: 'Player 2',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.RED,
      icon: new Blob(),
      resultDefault: 100,
      resultCurrent: 100,
      customOperations: []
    },
    {
      id: 2,
      name: 'Mana',
      color: Color.BLUE,
      resultDefault: 50,
      resultCurrent: 50,
      customOperations: []
      },
      {
        id: 2,
        name: 'Mana',
        color: Color.BLUE,
        resultDefault: 50,
        resultCurrent: 50,
        customOperations: []
    }]
  },
  {
    id: 3,
    name: 'Player 3',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.RED,
      icon: new Blob(),
      resultDefault: 100,
      resultCurrent: 100,
      customOperations: [
        {
          operator: Operator.ADDITION,
          numberToApply: 500,
          color: Color.GREEN,
        },
        {
          operator: Operator.SUBTRACTION,
          numberToApply: 500,
          color: Color.RED,
        }
      ]
    },
      {
        id: 2,
        name: 'Mana',
        color: Color.BLUE,
        resultDefault: 50,
        resultCurrent: 50,
        customOperations: [
          {
            operator: Operator.ADDITION,
            numberToApply: 25,
            color: Color.GREEN,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 25,
            color: Color.RED,
          }
        ]
      }]
  }]
}
