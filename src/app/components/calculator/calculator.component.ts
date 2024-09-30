import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Calculator, Entity, Operator } from './calculator.type';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, NgbDropdownModule],
  styleUrl: './calculator.component.scss',
  template: `
    @let calculator = data();
      @if (calculator) {
        <div class="calculator">
          <!-- ************************************ -->
          <!-- Calculator Header ****************** -->
          <!-- ************************************ -->
          <div class="input-group">
            <select class="form-select rounded-bottom-0">
              <option [value]="calculator.id">{{ calculator.name }}</option>
              <option [value]="3">3</option>
              <option [value]="2">2</option>
            </select>
            <button class="btn btn-outline-primary rounded-bottom-0" type="button">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
          </div>

          <!-- ************************************ -->
          <!-- * Entity to operate ************** -->
          <!-- ************************************ -->
          <ul class="list-group list-group-flush border border-top-0">
            @for (entity of calculator.entity; track entity.id) {
                <!-- Calculator Body -->
                <li class="list-group-item d-flex justify-content-between" (click)="handleClickEntity(entity.id)">
                  <div class="d-flex gap-3">
                    <i class="bi bi-droplet"></i>
                    <span [style.color]="entity.color">{{ entity.name }}</span>
                  </div>
                  <div>
                    <span>{{ entity.resultCurrent }} / </span>
                    <span [style.color]="entity.color"> {{ entity.resultDefault }}</span>
                  </div>
                </li>
            }
          </ul>

          <!-- ************************************ -->
          <!-- * Operation ************************ -->
          <!-- ************************************ -->
          @if( entitySelected ){
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
                   <p class="custom-key"
                    [style.color]="customOperation.color"
                    (click)="handleClickCustomOperation(customOperation.operator,  customOperation.numberToApply)">
                     {{ customOperation.operator }} {{ customOperation.numberToApply }}
                   </p>
                 }
               </div>
            </div>
          }
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