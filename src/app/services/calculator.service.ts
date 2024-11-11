import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Calculator, Color, Icon, Operator } from '../components';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private calculators: Calculator[];
  private $calculatorsSubject: BehaviorSubject<Calculator[]>;

  public get $calculators(): Observable<Calculator[]> {
    return this.$calculatorsSubject.asObservable();
  }

  private constructor() {
    const storage = sessionStorage.getItem('calculators');
    this.calculators = storage ? JSON.parse(storage) : [{
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
    }];
    this.$calculatorsSubject = new BehaviorSubject<Calculator[]>(this.calculators); 
  }

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
    sessionStorage.setItem('calculators', JSON.stringify(this.calculators));
    this.$calculatorsSubject.next(this.calculators);
  }

}
