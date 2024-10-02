import { ChangeDetectionStrategy, Component, input, } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Calculator, Entity, OtherOperator, Operator } from './calculator.type';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, NgbDropdownModule],
  styleUrl: './calculator.component.scss',
  template: `
    @let calculator = data(); @if (calculator) {
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

      <div class="border border-top-0 p-2">
        <!-- ************************************ -->
        <!-- * Entity to operate ************** -->
        <!-- ************************************ -->
        <ul class="list-group list-group-flush  border-top-0 mx-2">
          @for (entity of calculator.entity; track entity.id) {
          <!-- Calculator Body -->
          <li
            class="list-group-item d-flex justify-content-between"
            (click)="handleClickEntity(entity.id)"
          >
            <div class="d-flex gap-3">
              <!-- // TODO cambiar el i por el icono correspondiente -->
              <i class="bi bi-droplet" [style.color]="entity.color"></i>
              <span [style.color]="entity.color">{{ entity.name }}</span>
            </div>
            <div>
              <span>{{ entity.resultCurrent }} / </span>
              <span [style.color]="entity.color">
                {{ entity.resultDefault }}</span
              >
            </div>
          </li>
          }
        </ul>

        @if( entitySelected ){
        <!-- ************************************ -->
        <!-- * Operation ************************ -->
        <!-- ************************************ -->
        <div
          class="col-auto form-control d-flex justify-content-end gap-2 my-2"
          [style.border-color]="entitySelected.color"
        >
          <i> {{ entitySelected.resultCurrent }}</i>
          <span> {{ operatorSelected }}</span>
          <span> {{ numberToApply }}</span>
        </div>

        <!-- ************************************ -->
        <!-- * Keys ***************************** -->
        <!-- ************************************ -->
        <div class="keys">
          <!-- Default calculators keys -->
            <!-- // TODO hacer esto con for para mejor escalavilidad -->
          <div class="calculator-key-group">
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('9')"
            >
              9
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('8')"
            >
              8
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('7')"
            >
              7
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickRareOperator(getOperator.CORRECT)"
            >
              {{ getOperator.CORRECT }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickRareOperator(getOperator.DELETE)"
            >
              {{ getOperator.DELETE }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('6')"
            >
              6
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('5')"
            >
              5
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('4')"
            >
              4
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickOperator(getOperator.ADDITION)"
            >
              {{ getOperator.ADDITION }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickOperator(getOperator.SUBTRACTION)"
            >
              {{ getOperator.SUBTRACTION }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('3')"
            >
              3
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('2')"
            >
              2
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('1')"
            >
              1
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickOperator(getOperator.MULTIPLICATION)"
            >
              {{ getOperator.MULTIPLICATION }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickOperator(getOperator.DIVISION)"
            >
              {{ getOperator.DIVISION }}
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('0')"
            >
              0
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('00')"
            >
              00
            </button>
            <button
              type="button"
              class=" btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              (click)="handleClickNumber('000')"
            >
              000
            </button>
            <button
              type="button"
              class="equal btn btn-primary"
              [style.background-color]="entitySelected.color"
              [style.border-color]="entitySelected.color"
              [disabled]="!this.operatorSelected || !this.numberToApply"
              (click)="handleClickRareOperator(getOperator.EQUAL)"
            >
              {{ getOperator.EQUAL }}
            </button>
          </div>
          <div class="operator-keys-group">

          </div>
          <!-- Customs keys -->
          <div class="custom-key-group">
            @for (customOperation of entitySelected.customOperations; track
            $index) {
            <p class="custom-key"
              [style.color]="customOperation.color"
              (click)="handleClickCustomOperation(customOperation.operator, customOperation.numberToApply)"
            >
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
export class CalculatorComponent {
  data = input.required<Calculator>();

  entitySelected?: Entity;
  operatorSelected?: Operator;
  numberToApply?: string;

  // TODO Crear el boton para cambiar esta variable
  numberOverflow: boolean = false;

  get getOperator() {
    return {
      ...Operator,
      ...OtherOperator,
    };
  }

  handleClickEntity(idEntity: number) {
    this.entitySelected = this.data().entity.find((elm) => elm.id === idEntity);
  }

  handleClickNumber(numberToApply: string) {
    if (this.numberToApply) this.numberToApply += numberToApply;
    else this.numberToApply = numberToApply;
  }

  handleClickOperator(operator: Operator) {
    this.operatorSelected = operator;
  }

  handleClickRareOperator(operator: OtherOperator) {
    const operation = {
      [this.getOperator.CORRECT]: () => (this.numberToApply = this.numberToApply?.slice(0, -1)),
      [this.getOperator.DELETE]: () => (this.numberToApply = ''),
      [this.getOperator.EQUAL]: () => this.applyOperation(this.operatorSelected!, +this.numberToApply!),
    };
    operation[operator]();
  }

  handleClickCustomOperation(operator: Operator, numberToApply: number) {
    this.applyOperation(operator, numberToApply);
  }

  private applyOperation(operator: Operator, numberToApply: number) {
    if (this.entitySelected) {
      const operation = {
        [Operator.ADDITION]: (num1: number, num2: number) => num1 + num2,
        [Operator.SUBTRACTION]: (num1: number, num2: number) => num1 - num2,
        [Operator.MULTIPLICATION]: (num1: number, num2: number) => num1 * num2,
        [Operator.DIVISION]: (num1: number, num2: number) => num1 / num2,
      };

      const result = operation[operator](this.entitySelected.resultCurrent, numberToApply);

      if (!this.numberOverflow) {
        // Ensures the result does not exceed the limits of the default result
        if (result >= 0)
          this.entitySelected.resultCurrent =
            result < this.entitySelected.resultDefault
              ? result
              : this.entitySelected.resultDefault;
        else 
          this.entitySelected.resultCurrent = result > 0 ? result : 0;
      }
      else {
        this.entitySelected.resultCurrent = result
      }

      this.numberToApply = undefined;
      this.operatorSelected = undefined;
    }
  }
}
