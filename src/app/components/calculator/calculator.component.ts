import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Calculator, Entity, OtherOperator, Operator, Options } from './calculator.type';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from "../../shared/custom-modal/custom-modal.component";
import { AddCalculatorFormComponent } from "../add-calculator-form/add-calculator-form.component";

@Component({
  selector: 'app-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDropdownModule, CustomModalComponent, AddCalculatorFormComponent],
  styleUrl: './calculator.component.scss',
  template: `
    @let calculator = data();
    @let editModalId = 'editModalId' + calculator.id;
    @let deleteModalId = 'deleteModalId' + calculator.id;

    @if (calculator) {
    <div class="calculator">
      <!-- ************************************ -->
      <!-- Calculator Header ****************** -->
      <!-- ************************************ -->
      <div class="input-group">
        <label class="form-control rounded-bottom-0">{{ calculator.name }}</label>
        <button class="btn btn-outline-primary border rounded-bottom-0" type="button"
          data-bs-toggle="modal" [attr.data-bs-target]="'#' + editModalId">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-outline-danger border rounded-bottom-0" type="button"
          data-bs-toggle="modal" [attr.data-bs-target]="'#' + deleteModalId">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="border border-top-0 p-2">
        <!-- ************************************ -->
        <!-- * Entity to operate ************** -->
        <!-- ************************************ -->
        <ul class="list-group list-group-flush  border-top-0 mx-2 overflow-y-auto">
          @for (entity of calculator.entity; track entity.id) {
          <li
            class="list-group-item d-flex justify-content-between"
            (click)="handleClickEntity(entity.id)"
          >
            <div class="d-flex gap-3">
              <i [class]="['bi', 'bi-' + entity.icon]" [style.color]="entity.color"></i>
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
          class="col-auto form-control d-flex justify-content-end gap-2 mt-3"
          [style.border-color]="entitySelected.color"
        >
          <i> {{ entitySelected.resultCurrent }}</i>
          <span> {{ operatorSelected }}</span>
          <span> {{ numberToApply }}</span>
        </div>

        <!-- ************************************ -->
        <!-- * Keys ***************************** -->
        <!-- ************************************ -->
        <div class="text-center mt-2">
          <div class="row justify-content-between">
            <!-- Correctors -->
            <div class="btn-group col-md mb-2">
              <button
                type="button"
                class=" btn btn-primary"
                [style.background-color]="entitySelected.color"
                [style.border-color]="entitySelected.color"
                (click)="handleClickRareOperator(this.getOperator.RELOAD)"
              >
                <i [class]="['bi',  'bi-'+ this.getOperator.RELOAD]"></i>
              </button>
              <button
                type="button"
                class=" btn btn-primary"
                [style.background-color]="entitySelected.color"
                [style.border-color]="entitySelected.color"
                (click)="handleClickRareOperator(this.getOperator.BEFORE)"
              >
                <i [class]="['bi',  'bi-'+ this.getOperator.BEFORE]"></i>
              </button>
              <button
                type="button"
                class=" btn btn-primary"
                [style.background-color]="entitySelected.color"
                [style.border-color]="entitySelected.color"
                (click)="handleClickRareOperator(this.getOperator.DELETE)"
              >
                <!-- <i [class]="['bi',  'bi-'+ getOperator.DELETE]"></i> -->
                {{ this.getOperator.DELETE }}
              </button>
              <button
                type="button"
                class=" btn btn-primary"
                [style.background-color]="entitySelected.color"
                [style.border-color]="entitySelected.color"
                (click)="handleClickRareOperator(this.getOperator.CORRECT)"
              >
                <i [class]="['bi',  'bi-'+ this.getOperator.CORRECT]"></i>
              </button>
            </div>
            <!-- Operators -->
            <div class="btn-group col-md mb-2">
                @for(operator of operators; track $index){
                  <button
                    type="button"
                    class=" btn btn-primary"
                    [style.background-color]="entitySelected.color"
                    [style.border-color]="entitySelected.color"
                    (click)="handleClickOperator(operator)"
                  >
                  {{ operator }}
                </button>
              }
            </div>
          </div>
          <!-- Numbers -->
          <div class="calculator-key-group">
            @for(number of numbers; track $index){
              <button
                type="button"
                class=" btn btn-primary rounded-0"
                [style.background-color]="entitySelected.color"
                [style.border-color]="entitySelected.color"
                (click)="handleClickNumber(number.toString())"
              >
              {{ number }}
              </button>
            }
          </div>
          <!-- Equal -->
          <button
            type="button"
            class=" btn btn-primary mt-2 w-100"
            [style.background-color]="entitySelected.color"
            [style.border-color]="entitySelected.color"
            [disabled]="!this.operatorSelected || !this.numberToApply"
            (click)="handleClickRareOperator(this.getOperator.EQUAL)"
          >
          {{ this.getOperator.EQUAL }}
          </button>
          <!-- Customs keys -->
          @if(entitySelected.customOperations.length){
            <div class="custom-key-group mt-3">
              @for (customOperation of entitySelected.customOperations; track $index) {
              <button
                type="button"
                class=" btn btn-primary custom-key"
                [style.background-color]="customOperation.color"
                [style.border-color]="customOperation.color"
                (click)="handleClickCustomOperation(customOperation.operator, customOperation.numberToApply)"
              >
                {{ customOperation.operator }} {{ customOperation.numberToApply }}
              </button>
              }
            </div>
          }
        </div>
        }
      </div>
    </div>
    <app-add-calculator-form [modalId]="editModalId"
      [data]="calculator"
      [editMode]='true'
      (editEventEmiter)="this.handleEditEventEmiter($event)"
    ></app-add-calculator-form>
    <app-custom-modal  [modalId]="deleteModalId"
      [headerText]="'Eliminar ' + calculator.name"
      [headerTextClass]="'text-danger'"
      [acceptButtonClass]="'btn-danger'"
      (acceptEvent)="this.handleDeleteEventEmiter()"
    ></app-custom-modal>
  }`,
})
export class CalculatorComponent {

  // Calculator data 
  data = input.required<Calculator>();
  numbers: (number | string)[] = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '00', '000'];
  operators: Operator[] = [Operator.ADDITION, Operator.SUBTRACTION, Operator.MULTIPLICATION, Operator.DIVISION];

  // Operation data
  entitySelected?: Entity;
  operatorSelected?: Operator;
  numberToApply?: string;
  numberBeforeOperate?: number;

  // Calculator Configuration
  options: Options = {
    numberOverflow: false,
    numberDecimals: false,
    clearOperationWhenOperate: true,
    clearOperationWhenSelectOperator: false,
    digitLimit: false,
    clearOperationWhenSelectEntity: false
  };

  // Modals config
  deleteEventEmiter = output<string>();
  editEventEmiter = output<Calculator>();

  get getOperator() {
    return {
      ...Operator,
      ...OtherOperator,
    };
  }

  // **********************************************
  // Handles events
  // **********************************************

  handleClickEntity(idEntity: number): void {
    // New entitySelected
    this.entitySelected = this.data().entity.find((elm) => elm.id === idEntity)

    if (this.entitySelected) {
      this.numberBeforeOperate = this.entitySelected.resultCurrent * 1;
      for (const option in this.entitySelected.options) {
        this.options[option] = this.entitySelected.options[option];
      }

      // Makes sure the option is correct
      if (this.entitySelected.options.digitLimit)
        this.options.clearOperationWhenSelectEntity = true;

      // _Option clearOperationWhenSelectEntity
      this.options.clearOperationWhenSelectEntity ? this.numberToApply = '' : '';
    }
  }

  handleClickNumber(num: string): void {
    // _Option digitLimit
    // If have reached the character limit, dont add more numbers.
    let resultCurrentLength = this.entitySelected?.resultCurrent! > 0 
      ? this.entitySelected?.resultCurrent.toString().length
      : this.entitySelected?.resultCurrent.toString().slice(1).length; // Prevents the length change when resultCurrent is negative
    
    if (this.options.digitLimit 
      && resultCurrentLength! < num.length + this.numberToApply!.length
    ) return;
    

    if (this.numberToApply) {
      // Set '0's ever in right
      let numbers = this.numberToApply.slice(0, this.numberToApply.indexOf('0'));
      let ceros = this.numberToApply.slice(this.numberToApply.indexOf('0'));
      num.match(/^0+$/) ? ceros += num : numbers += num;

      this.numberToApply = numbers + ceros;
    }
    else this.numberToApply = num;
  }

  handleClickOperator(operator: Operator): void {
    // _Option clearOperationWhenSelectOperator
    if (this.options.clearOperationWhenSelectOperator)
      this.resetOperation();

    this.operatorSelected = operator;
  }

  handleClickRareOperator(operator: OtherOperator): void {
    const operation = {
      [this.getOperator.CORRECT]: () =>
        this.numberToApply ? this.numberToApply = this.numberToApply?.slice(0, -1) : this.operatorSelected = undefined,
      [this.getOperator.DELETE]: () => this.numberToApply = '',
      [this.getOperator.EQUAL]: () => this.applyOperation(this.operatorSelected!, +this.numberToApply!),
      [this.getOperator.BEFORE]: () => this.entitySelected!.resultCurrent = this.numberBeforeOperate! * 1,
      [this.getOperator.RELOAD]: () => {
        if (this.entitySelected) {
          this.entitySelected.resultCurrent = this.entitySelected?.resultDefault;
          this.resetOperation();
        }
      }
    };
    operation[operator]();
  }

  handleClickCustomOperation(operator: Operator, numberToApply: number): void {
    this.applyOperation(operator, numberToApply);
  }

  // **********************************************
  // Operations funtions
  // **********************************************
  private applyOperation(operator: Operator, numberToApply: number): void {
    const operation = {
      [this.getOperator.ADDITION]: (num1: number, num2: number) => num1 + num2,
      [this.getOperator.SUBTRACTION]: (num1: number, num2: number) => num1 - num2,
      [this.getOperator.MULTIPLICATION]: (num1: number, num2: number) => num1 * num2,
      [this.getOperator.DIVISION]: (num1: number, num2: number) => num1 / num2,
    };

    this.numberBeforeOperate = this.entitySelected!.resultCurrent * 1;
    let result = operation[operator](this.entitySelected!.resultCurrent, numberToApply);

    this.applyResultsOptions(result);
  }

  private applyResultsOptions(result: number): void {
    // _Option numberDecimals
    // If the result does decimals, round to 2 decimals
    if (this.options.numberDecimals)
      result = Math.round((result + Number.EPSILON) * 100) / 100
    else
    // Ensures the result dont use decimals
      result = Math.round(result);

    // _Option numberOverflow 
    // Ensures the result doesnt exceed the limits of the default result
    if (!this.options.numberOverflow) {
      if (result >= 0)
        result =
          result < this.entitySelected!.resultDefault
            ? result
            : this.entitySelected!.resultDefault;
      else 
        result = result > 0 ? result : 0;
    }

    // _Option clearOperationWhenOperate
    if (this.options.clearOperationWhenOperate) {
      this.resetOperation();
    }

    this.entitySelected!.resultCurrent = result;
  }


  private resetOperation(): void {
    this.numberToApply = '';
    this.operatorSelected = undefined;
  }

  // **********************************************
  // Modal
  // **********************************************
  // TODO handle eventos de editar calculadora

  protected handleDeleteEventEmiter(): void {
    this.deleteEventEmiter.emit(this.data().id);
  }

  protected handleEditEventEmiter(data: Calculator): void {
    this.editEventEmiter.emit(data);
  }
}
