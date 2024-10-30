import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Calculator, Color, Icon, Operation, Operator } from '../calculator';
import { CustomModalComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as generateUUID } from 'uuid';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-add-calculator-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CustomModalComponent, ReactiveFormsModule],
  styleUrl: './add-calculator-form.component.scss',
  template: `
    @let edit = this.editMode();
    @let id = this.modalId();
    <app-custom-modal [modalId]="id"
      [backdropStatic]="true"
      [headerText]="this.headerText"
      [headerTextClass]="edit ? 'text-warning' : 'text-primary'"
      [acceptText]="this.submitText"
      [acceptButtonClass]="edit ? 'btn-warning' : 'btn-primary'"
      [$acceptButtonDisabled]="this.disableAcceptButton"
      (acceptEvent)="this.buildCalculator()"
      [cancelText]="this.cancelText"
      (cancelEvent)="this.clearForm()"
      >
      @if(this.myForm){
        <form [formGroup]="myForm">
          <!-- Calculator Name -->
          <div class="mb-3">
            <label for="calculatorName">Nombre calculadora</label>
            <input id="calculatorName" class="form-control" type="text" formControlName="name">
          </div>
          <!-- Entity -->
          <div class="accordion accordion-flush" id="accordionEntities" formArrayName="entity">
          @for(entity of entityList.value; track entity.id){
            <div class="accordion-item" [formGroupName]="$index">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" style="color: {{entity.color}}; border-color: {{entity.color}}; background-color: transparent"
                  data-bs-toggle="collapse" [attr.data-bs-target]="'#collapse'+$index" aria-expanded="false" [attr.aria-controls]="'collapse'+$index">
                  <div class="d-flex justify-content-between w-100">
                    <div class="d-flex gap-3">
                      <i class="bi {{'bi-'+ entity.icon}}"></i>
                      {{entity.name}}
                    </div>
                    @if(entity.resultDefault){
                      <div class="pe-3">
                        <span [style.color]="'white'">{{ entity.resultCurrent }} / </span>
                        <span>
                          {{ entity.resultDefault }}</span
                        >
                      </div>
                    }
                  </div>
                </button>
              </h2>
              <div [id]="'collapse'+$index" class="accordion-collapse collapse" data-bs-parent="accordionEntities" >
                <div class="accordion-body">
                  <div class="mb-3 d-flex justify-content-center">
                    <!-- Lista de icons -->
                    <select class="selectpicker form-control me-3" aria-label="Lista de iconos" formControlName="icon" style="width: 40px; height: 40px;">
                      @for(icon of Icons; track $index){
                        <option [value]="icon" [attr.data-content]="'<i class=bi bi-{{icon}}></i>'"></option>
                      }
                    </select>
                    <!-- Seleccionar colores -->
                    <input type="color" class="form-control p-0" formControlName="color" id="colorPicker" title="Lista de colores">
                  </div>
                  <div class="input-group mb-3">
                    <!-- Input Nombre -->
                    <input type="text" class="form-control"
                      formControlName="name" [value]="entity.name" placeholder="Nombre">
                    <!-- Resultado -->
                    <input id="resultDefault" class="form-control" type="number"
                        formControlName="resultDefault" [value]="entity.resultDefault" placeholder="Resultado">
                  </div>
                  <div class="input-group mb-3">
                  </div>
                  <fieldset formGroupName="options">
                    <legend>Opciones</legend>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="numberOverflow">Desbordamiento de números</label>
                      <input id="numberOverflow" class="form-control" type="text" formControlName="numberOverflow" [value]="entity.options.numberOverflow">
                    </div>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="numberDecimals">Número con decimales</label>
                      <input id="numberDecimals" class="form-control" type="text" formControlName="numberDecimals" [value]="entity.options.numberDecimals">
                    </div>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="clearOperationWhenOperate">Limpiar operación al operar</label>
                      <input id="clearOperationWhenOperate" class="form-control" type="text" formControlName="clearOperationWhenOperate" [value]="entity.options.clearOperationWhenOperate">
                    </div>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="clearOperationWhenSelectOperator">Limpiar operación al seleccionar operador</label>
                      <input id="clearOperationWhenSelectOperator" class="form-control" type="text" formControlName="clearOperationWhenSelectOperator" [value]="entity.options.clearOperationWhenSelectOperator">
                    </div>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="clearOperationWhenSelectEntity">Limpiar operación al seleccionar elemento</label>
                      <input id="clearOperationWhenSelectEntity" class="form-control" type="text" formControlName="clearOperationWhenSelectEntity" [value]="entity.options.clearOperationWhenSelectEntity">
                    </div>
                    <div>
                      <!-- //TODO TOOLTIP -->
                      <label for="digitLimit">Limitar de digitos</label>
                      <input id="digitLimit" class="form-control" type="text" formControlName="digitLimit" [value]="entity.options.digitLimit">
                    </div>
                  </fieldset>
                  <fieldset formArrayName="customOperations">
                    <legend>Operaciones personalizadas</legend>
                    @for(customOperation of entity.customOperations; track $index){
                      <div [formGroupName]="$index">
                        <div>
                          <label for="operatorCustomOperation">Operación</label>
                          <input id="operatorCustomOperation" class="form-control" type="text" formControlName="operator" [value]="customOperation.operator">
                        </div>
                        <div>
                          <label for="numberCustomOperation">Número</label>
                          <input id="numberCustomOperation" class="form-control" type="text" formControlName="numberToApply" [value]="customOperation.numberToApply">
                        </div>
                        <div>
                          <label for="colorCustomOperation">Color</label>
                          <input id="colorCustomOperation" class="form-control" type="text" formControlName="color" [value]="customOperation.color">
                        </div>
                      </div>
                    }
                  </fieldset>
                </div>
              </div>
            </div>
          }
          </div>
        </form>
      }
    </app-custom-modal>
  `
})
export class AddCalculatorFormComponent implements OnInit {

  // TODO Terminar de diseñar y maquetar formulario

  // Initial config
  modalId = input.required<string>();
  editMode = input<boolean>(false);
  data = input<Calculator>({ id: '', name: '', entity: [] });

  // Form texts
  headerText = 'Nueva calculadora';
  submitText = 'Crear';
  cancelText = 'Cancelar';

  // Form data
  private fb = new FormBuilder();
  protected myForm?: FormGroup;

  // Event Emiters
  editEventEmiter = output<Calculator>();
  addEventEmiter = output<Calculator>();
  disableAcceptButton = new BehaviorSubject<boolean>(true);

  get entityList(): FormArray<FormGroup> {
    return this.myForm?.get('entity') as FormArray
  }

  get Icons() {
    return Object.values(Icon) as string[];
  }

  get Operators() {
    return Object.values(Operator) as string[];
  }

  get Colors() {
    return Object.values(Color) as string[];
  }

  ngOnInit(): void {
    if (this.editMode()) {
      this.headerText = `Editar ${this.data()?.name}`;
      this.submitText = 'Editar';
      this.initEditForm();
    }
    else {
      this.initNewForm();
    }

    this.myForm?.valueChanges.subscribe((elm) => {
      this.myForm?.valid ? this.disableAcceptButton.next(false) : this.disableAcceptButton.next(true);
    })
  }
  // **********************************************
  // Initialization Form
  // **********************************************

  private initNewForm(): void {
    this.myForm = this.fb.group({
      id: this.fb.control(generateUUID(), [Validators.required]),
      name: this.fb.control(this.data().name),
      entity: this.fb.array([])
    });
    this.addEntity();
  }

  private initEditForm(): void {
    const entityFormArray: FormArray = this.fb.array([]);

    this.data()?.entity.forEach((entity) => {
      const entityToForm = this.fb.group({
        id: this.fb.control(entity.id, [Validators.required]),
        name: this.fb.control(entity.name, [Validators.required]),
        icon: this.fb.control(entity.icon ? entity.icon : null),
        color: this.fb.control(entity.color, [Validators.required]),
        resultDefault: this.fb.control(entity.resultDefault, [Validators.required]),
        resultCurrent: this.fb.control(entity.resultCurrent, [Validators.required]),
        options: this.fb.group({
          numberOverflow: this.fb.control(entity.options.numberOverflow, [Validators.required]),
          numberDecimals: this.fb.control(entity.options.numberDecimals, [Validators.required]),
          clearOperationWhenOperate: this.fb.control(entity.options.clearOperationWhenOperate, [Validators.required]),
          clearOperationWhenSelectOperator: this.fb.control(entity.options.clearOperationWhenSelectOperator, [Validators.required]),
          clearOperationWhenSelectEntity: this.fb.control(entity.options.clearOperationWhenSelectEntity, [Validators.required]),
          digitLimit: this.fb.control(entity.options.digitLimit, [Validators.required])
        }),
        customOperations: this.fb.array([]),
      });

      entity.customOperations.forEach((customOperations: Operation) => {
        (entityToForm.get('customOperations') as FormArray).push(
          this.fb.group({
            operator: this.fb.control(customOperations.operator),
            numberToApply: this.fb.control(customOperations.numberToApply),
            color: this.fb.control(customOperations.color),
          })
        )
      });

      entityFormArray.push(entityToForm);
    })

    this.myForm = this.fb.group({
      id: this.fb.control(this.data().id),
      name: this.fb.control(this.data().name),
      entity: entityFormArray
    });
  }

  // **********************************************
  // Modify form functions 
  // **********************************************

  protected clearForm(): void {
    if (this.editMode()) {
      this.initEditForm();
    } else {
      this.myForm?.reset();
    }
  }

  protected addEntity(): void {
    this.entityList.push(
      this.fb.group({
        id: this.fb.control(generateUUID(), [Validators.required]),
        name: this.fb.control('Nuevo elemento', [Validators.required]),
        icon: this.fb.control(Icon.HEART),
        color: this.fb.control(Color.RED, [Validators.required]),
        resultDefault: this.fb.control(null, [Validators.required]),
        resultCurrent: this.fb.control(null, [Validators.required]),
        options: this.fb.group({
          numberOverflow: this.fb.control(false, [Validators.required]),
          numberDecimals: this.fb.control(false, [Validators.required]),
          clearOperationWhenOperate: this.fb.control(true, [Validators.required]),
          clearOperationWhenSelectOperator: this.fb.control(false, [Validators.required]),
          clearOperationWhenSelectEntity: this.fb.control(false, [Validators.required]),
          digitLimit: this.fb.control(false, [Validators.required])
        }),
        customOperations: this.fb.array([])
      })
    );
  }

  protected deleteEntity(entityIndex: number): void {
    this.entityList.removeAt(entityIndex);
  }

  protected addCustomOperation(entityIndex: number): void {
    const customOperations = this.entityList.at(entityIndex)?.get('customOperations') as FormArray;

    customOperations.push(
      this.fb.group({
        operator: this.fb.control(null, [Validators.required]),
        numberToApply: this.fb.control(null, [Validators.required]),
        color: this.fb.control(null, [Validators.required]),
      })
    );
  }

  protected deleteCustomOperation(entityIndex: number, customOperationIndex: number): void {
    const customOperations = this.entityList.at(entityIndex)?.get('customOperations') as FormArray;
    customOperations.removeAt(customOperationIndex);
  }

  // **********************************************
  // Submit calculator
  // **********************************************

  protected buildCalculator(): void {
    if (this.myForm?.valid) {
      const id = this.myForm?.get('id')?.value;
      const name = this.myForm?.get('name')?.value || this.editMode() ? this.myForm?.get('name')?.value : 'Nueva calculadora';
      this.entityList.controls.forEach((elm) => {
        // If modify resultDefault modify resultCurrent equal
        if (elm.get('resultDefault')?.dirty)
          elm.get('resultCurrent')?.setValue(elm.get('resultDefault')?.value);

        return elm;
      });

      const entity = this.entityList.value;

      this.sendCalculator({
        id,
        name,
        entity
      });
    }
    else {
      console.error(this.myForm?.errors);
    }
  }

  private sendCalculator(calculator: Calculator): void {
    if (this.editMode()) {
      this.editEventEmiter.emit(calculator)
    } else {
      this.addEventEmiter.emit(calculator);
      this.clearForm();
    }

  }
}
