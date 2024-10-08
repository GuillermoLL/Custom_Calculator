import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator, CalculatorComponent, Color, Icon, Operator } from '../../components';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CalculatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="">
      <button type="button" class="btn btn-primary rounded-0"> <i class="bi bi-plus-lg"></i></button>
    </aside>
    <aside class="">
      <button type="button" class="btn btn-primary rounded-0"> <i class="bi bi-gear"></i></button>
    </aside>
    <article class="row container">
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
      options: {
        numberOverflow: false,
        numberDecimals: false,
        clearOperationWhenOperate: false,
        clearOperationWhenSelectOperator: true
      },
      customOperations: []
    }]
  },
  {
    id: 2,
    name: 'Player 2',
    entity: [
      {
        id: 1,
        name: 'Vida',
        color: Color.RED,
        icon: Icon.HEART,
        resultDefault: 100,
        resultCurrent: 100,
        options: {
          numberOverflow: true,
          numberDecimals: false,
          clearOperationWhenOperate: false,
          clearOperationWhenSelectOperator: false
        },
        customOperations: []
      },
      {
        id: 3,
        name: 'Mana',
        color: Color.BLUE,
        icon: Icon.SPARKLE,
        resultDefault: 50,
        resultCurrent: 50,
        options: {
          numberOverflow: true,
          numberDecimals: true,
          clearOperationWhenOperate: false,
          clearOperationWhenSelectOperator: false
        },
        customOperations: []
      },
      {
        id: 2,
        name: 'Desconocido',
        color: Color.GREY,
        icon: Icon.UNKNOWN,
        resultDefault: 10,
        resultCurrent: 10,
        options: {
          numberOverflow: true,
          numberDecimals: true,
          clearOperationWhenOperate: false,
          clearOperationWhenSelectOperator: false
        },
        customOperations: []
      }
    ]
  },
  {
    id: 3,
    name: 'Player 3',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.RED,
      icon: Icon.HEART,
      resultDefault: 100,
      resultCurrent: 100,
      options: {
        numberOverflow: false,
        numberDecimals: false,
        clearOperationWhenOperate: true,
        clearOperationWhenSelectOperator: false
      },
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
        name: 'Oscuridad',
        color: Color.PURPLE,
        icon: Icon.MOON,
        resultDefault: 50,
        resultCurrent: 50,
        options: {
          numberOverflow: false,
          numberDecimals: false,
          clearOperationWhenOperate: true,
          clearOperationWhenSelectOperator: false
        },
        customOperations: [
          {
            operator: Operator.ADDITION,
            numberToApply: 1,
            color: Color.GREY,
          },
          {
            operator: Operator.MULTIPLICATION,
            numberToApply: 2,
            color: Color.BLUE,
          },
          {
            operator: Operator.ADDITION,
            numberToApply: 25,
            color: Color.GREEN,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 25,
            color: Color.RED,
          },
          {
            operator: Operator.MULTIPLICATION,
            numberToApply: 2,
            color: Color.PURPLE,
          },
          {
            operator: Operator.DIVISION,
            numberToApply: 2,
            color: Color.ORANGE,
          }
        ]
      }]
  }]
}
