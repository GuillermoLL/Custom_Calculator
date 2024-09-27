import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Calculator, Entity, Operator } from './calculator.type';

@Component({
  selector: 'app-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  styleUrl: './calculator.component.scss',
  template: `
    @let calculator = data();
      @if (calculator) {
        <div class="calculator">
          <!-- Calculator Header -->
          <div class="header">
            {{calculator.name}}
          </div>

          <!-- Calculator Body -->
          <div class="body">

            <!-- ************************************ -->
            <!-- * Entity to operate ************** -->
            <!-- ************************************ -->
            <div class="elements">
              @for (entity of calculator.entity; track entity.id) {
                <div class="info" (click)="handleClickEntity(entity.id)">
                  <!-- <img> -->
                  <span class="name" [style.color]="entity.color">{{ entity.name }}</span>
                  <div class="result">
                    <span class="current">{{ entity.resultCurrent }} / </span>
                    <span class="default" [style.color]="entity.color"> {{ entity.resultDefault }}</span>
                  </div>
                </div>
              }
            </div>

            @if( entitySelected ){
              <!-- ************************************ -->
              <!-- * Operation ************************ -->
              <!-- ************************************ -->
              <div class="operation">
                <p>{{ entitySelected.resultCurrent }} {{ operatorSelected }}  {{ numberToApply }}</p>
              </div>

              <!-- ************************************ -->
              <!-- * Keys ***************************** -->
              <!-- ************************************ -->
              <div class="keys">
                <!-- Default calculators keys -->
                <div class="calculator-key-group">
                  <p>9</p>
                  <p>8</p>
                  <p>7</p>
                  <p>6</p>
                  <p>5</p>
                  <p>4</p>
                  <p>3</p>
                  <p>2</p>
                  <p>1</p>
                </div>

                <!-- Customs keys -->
                 <div class="custom-key-group">
                   @for (customOperation of entitySelected.customOperations; track $index) {
                     <p class="custom-key" [style.color]="customOperation.color" (click)="handleClickCustomOperation(customOperation.operator,  customOperation.numberToApply)">
                       {{ customOperation.operator }} {{ customOperation.numberToApply }}
                     </p>
                   }
                 </div>
              </div>
            }
          </div>
        </div>
      }
  `,
})

export class CalculatorComponent implements OnInit {

  data = input.required<Calculator>();

  entitySelected?: Entity;
  operatorSelected?: Operator;
  numberToApply?: number;

  constructor() { }

  ngOnInit() {

  }

  handleClickEntity(idEntity: number) {
    this.entitySelected = this.data().entity.find(elm => elm.id === idEntity);
  }

  handleClickNumber(numberToApply: number) {
    this.numberToApply = numberToApply;
  }

  handleClickOperator(operator: Operator) {
    this.operatorSelected = operator;
  }

  handleClickCustomOperation(operator: Operator, numberToApply: number) {
    this.applyOperation(operator, numberToApply);
  }

  applyOperation(operator: Operator, numberToApply: number) {
    if (this.entitySelected) {
      const operation = {
        [Operator.ADDITION]: (num1: number, num2: number) => num1 + num2,
        [Operator.SUBTRACTION]: (num1: number, num2: number) => num1 - num2,
        [Operator.MULTIPLICATION]: (num1: number, num2: number) => num1 * num2,
        [Operator.DIVISION]: (num1: number, num2: number) => num1 / num2
      }

      const result = operation[operator](this.entitySelected.resultCurrent, numberToApply);

      // Ensures the result does not exceed the limits of the default result
      if (result >= 0)
        this.entitySelected.resultCurrent =
          result < this.entitySelected.resultDefault ? result : this.entitySelected.resultDefault;
      else
        this.entitySelected.resultCurrent =
          result > 0 ? result : 0;
    }
  }
}