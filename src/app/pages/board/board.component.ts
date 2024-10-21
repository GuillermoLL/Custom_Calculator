import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator, CalculatorComponent, Color, Icon, Operator } from '../../components';
import { AddCalculatorFormComponent } from "../../components/add-calculator-form/add-calculator-form.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CalculatorComponent, AddCalculatorFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="d-flex justify-content-md-end justify-content-center gap-2 sticky-top mx-3 mt-3 mb-0 ">
      <button type="button" class="btn btn-primary px-4 py-2 px-md-3 py-md-1"
        data-bs-toggle="modal" [attr.data-bs-target]="'#' + this.addModalId"
        > <i class="bi bi-plus-lg"></i></button>
      <button type="button" class="btn btn-primary px-4 py-2 px-md-3 py-md-1"> <i class="bi bi-gear"></i></button>
    </header>
    <article class="row me-0">
      @for (calculator of calculators; track calculator.id) {
          <app-calculator [data]="calculator" class="col"/>
        }
    </article>
    <app-add-calculator-form [modalId]="this.addModalId" [editMode]='false'></app-add-calculator-form>
  `,
  styles: ``
})
export class BoardComponent {
  addModalId = 'addModalId';

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
        clearOperationWhenSelectOperator: true,
        digitLimit: true,
        clearOperationWhenSelectEntity: true
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
          clearOperationWhenSelectOperator: false,
          digitLimit: true,
          clearOperationWhenSelectEntity: false
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
          clearOperationWhenSelectOperator: false,
          digitLimit: false,
          clearOperationWhenSelectEntity: false
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
          clearOperationWhenOperate: true,
          clearOperationWhenSelectOperator: false,
          digitLimit: true,
          clearOperationWhenSelectEntity: true
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
        clearOperationWhenSelectOperator: false,
        digitLimit: true,
        clearOperationWhenSelectEntity: true
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
          clearOperationWhenSelectOperator: false,
          digitLimit: true,
          clearOperationWhenSelectEntity: true
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
