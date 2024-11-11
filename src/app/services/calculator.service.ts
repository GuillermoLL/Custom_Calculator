import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Calculator, Color, Icon, Operator } from '../components';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private calculators: Calculator[] = [{
    id: '25bd3460-9525-11ef-9a0e-1dcdfe04b99c',
    name: 'YuGiOh',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.BLUE,
      icon: Icon.HEART,
      resultDefault: 8000,
      resultCurrent: 8000,
      options: {
        numberOverflow: true,
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
        name: 'Rival',
        color: Color.RED,
        icon: Icon.HEART,
        resultDefault: 8000,
        resultCurrent: 8000,
        options: {
          numberOverflow: true,
          numberDecimals: false,
          clearOperationWhenOperate: true,
          clearOperationWhenSelectOperator: false,
          digitLimit: true,
          clearOperationWhenSelectEntity: true
        },
        customOperations: [
          {
            operator: Operator.ADDITION,
            numberToApply: 1000,
            color: Color.GREEN,
          },
          {
            operator: Operator.ADDITION,
            numberToApply: 500,
            color: Color.GREEN,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 1000,
            color: Color.RED,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 500,
            color: Color.RED,
          }
        ]
      },
      {
        id: 3,
        name: 'Hada',
        color: Color.ORANGE,
        icon: Icon.SPARKLE,
        resultDefault: 0,
        resultCurrent: 0,
        options: {
          numberOverflow: true,
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
            color: Color.GREEN,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 1,
            color: Color.RED,
          }
        ]
      },
      {
        id: 4,
        name: 'Hada',
        color: Color.PURPLE,
        icon: Icon.MOON,
        resultDefault: 0,
        resultCurrent: 0,
        options: {
          numberOverflow: true,
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
            color: Color.GREEN,
          },
          {
            operator: Operator.SUBTRACTION,
            numberToApply: 1,
            color: Color.RED,
          }
        ]
      }]
  },
  {
    id: '2ec844a0-9525-11ef-9a0e-1dcdfe04b99c',
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
    id: '34b83230-9525-11ef-9a0e-1dcdfe04b99c',
    name: 'Player 3',
    entity: [{
      id: 1,
      name: 'Vida',
      color: Color.RED,
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

  private $calculatorsSubject = new BehaviorSubject<Calculator[]>(this.calculators);

  public get $calculators(): Observable<Calculator[]> {
    return this.$calculatorsSubject.asObservable();
  }

  private constructor() { }

  public addCalculator(newCalculator: Calculator): void {
    this.calculators.push(newCalculator);
    this.nextCalculatorsSubject();
  }

  public editCalculator(editedCalculator: Calculator): void {
    this.calculators = this.calculators.map(
      (elm: Calculator) => elm.id === editedCalculator.id ? editedCalculator : elm
    );
    this.nextCalculatorsSubject();
  }

  public deleteCalculator(id: string): void {
    this.calculators = this.calculators.filter((elm: Calculator) => elm.id !== id);
    this.nextCalculatorsSubject();
  }

  private nextCalculatorsSubject(): void {
    this.$calculatorsSubject.next(this.calculators);
  }

}
