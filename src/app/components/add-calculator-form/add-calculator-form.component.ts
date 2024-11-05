import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Calculator, Color, Icon, Operation, Operator } from '../calculator';
import { CustomModalComponent } from '../../shared';
import { v4 as generateUUID } from 'uuid';

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
            @let entityIndex = $index;
            <div class="accordion-item position-relative" [formGroupName]="entityIndex">
              <!-- Accordion header -->
              <h2 class="accordion-header">
                <button class="accordion-button collapsed focus-ring" type="button"
                  style="color: {{entity.color}}; border-color: {{entity.color}}; background-color: transparent; --bs-focus-ring-color: {{entity.color}}7F"
                  data-bs-toggle="collapse" [attr.data-bs-target]="'#collapse'+entityIndex" aria-expanded="false" [attr.aria-controls]="'collapse'+entityIndex">
                  <div class="d-flex justify-content-between w-100">
                    <div class="d-flex gap-3">
                      <i class="bi {{'bi-'+ entity.icon}}"></i>
                      {{entity.name ? entity.name  : 'Nuevo elemento' }}
                    </div>
                    @if(entity.resultDefault >= 0){
                      <div class="pe-3">
                        <span [style.color]="'white'">{{ entity.resultCurrent }} / </span>
                        <span>
                          {{ entity.resultDefault }}</span
                        >
                      </div>
                    }
                    <!-- Delete entity -->
                    <span type="button" class="position-absolute top-0 start-100 translate-middle badge rounded-pill border-0 bg-danger mb-1"
                      style="margin: 26px -30px; z-index: 12;"
                      (click)="deleteEntity(entityIndex)">
                      <i class="bi bi-{{Operator.MULTIPLICATION}}-lg" style="margin: -3px"></i>
                    </span>
                  </div>
                </button>
              </h2>
              <!-- Accordion Body -->
              <div [id]="'collapse'+entityIndex" class="accordion-collapse collapse" data-bs-parent="accordionEntities" >
                <div class="accordion-body">
                  <div class="mb-3 d-flex justify-content-center gap-2">
                    <!-- Icons List -->
                    <div class="dropdown border border-1 rounded-3">
                      <button type="button" data-bs-toggle="dropdown" aria-expanded="false"
                        class="btn btn-primary form-control focus-ring"
                        style="background-color: {{entity.color}}; border-color: {{entity.color}}; --bs-focus-ring-color: {{Color.BLUE}}7F;"
                      >
                        <i class="dropdown-item bi bi-{{entity.icon ? entity.icon : 'caret-down'}}"></i>
                      </button>
                      <ul class="dropdown-menu">
                        @for(icon of Icons; track $index){
                          <li><i class="dropdown-item bi bi-{{icon}}" (click)="setEntityIcon(entityIndex, icon)"></i></li>
                        }
                      </ul>
                    </div>
                    <!-- Color picker -->
                    <input type="color" class="form-control p-0" formControlName="color" id="entityColorPicker" title="Lista de colores">
                  </div>
                  <div class="input-group mb-3">
                    <!-- Input Name -->
                    <input type="text" formControlName="name" placeholder="Nombre"
                      class="form-control" style="color: {{entity.color}};">
                    <!-- Result Default -->
                    <input id="resultDefault" class="form-control" type="number" min="0" step="0" style="color: {{entity.color}}"
                        formControlName="resultDefault" placeholder="Resultado">
                  </div>
                  <fieldset formGroupName="options" class="mb-3">
                    <legend>Opciones</legend>
                    <div class="form-check form-switch">
                      <!-- Number Overflow -->
                      <label for="numberOverflow" class="form-check-label">Desbordamiento de números</label>
                      <input id="numberOverflow" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="numberOverflow"
                        style="background-color: {{entity.options.numberOverflow ? entity.color : 'transparent'}};
                          border-color: {{entity.options.numberOverflow ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;"
                        >
                    </div>
                    <div class="form-check form-switch">
                      <!-- Number Decimals -->
                      <label class="form-check-label" for="numberDecimals">Número con decimales</label>
                      <input id="numberDecimals" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="numberDecimals"
                        style="background-color: {{entity.options.numberDecimals ? entity.color : 'transparent'}};
                          border-color: {{entity.options.numberDecimals ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;">
                    </div>
                    <div class="form-check form-switch">
                      <!-- Clear Operation When Operate -->
                      <label class="form-check-label" for="clearOperationWhenOperate">Limpiar operación al operar</label>
                      <input id="clearOperationWhenOperate" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="clearOperationWhenOperate"
                        style="background-color: {{entity.options.clearOperationWhenOperate ? entity.color : 'transparent'}};
                          border-color: {{entity.options.clearOperationWhenOperate ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;">
                    </div>
                    <div class="form-check form-switch">
                       <!-- Clear Operation When Select Operator -->
                      <label class="form-check-label" for="clearOperationWhenSelectOperator">Limpiar operación al seleccionar operador</label>
                      <input id="clearOperationWhenSelectOperator" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="clearOperationWhenSelectOperator"
                        style="background-color: {{entity.options.clearOperationWhenSelectOperator ? entity.color : 'transparent'}};
                          border-color: {{entity.options.clearOperationWhenSelectOperator ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;">
                    </div>
                    <div class="form-check form-switch">
                       <!-- Clear Operation When Select Entity -->
                      <label class="form-check-label" for="clearOperationWhenSelectEntity">Limpiar operación al seleccionar elemento</label>
                      <input id="clearOperationWhenSelectEntity" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="clearOperationWhenSelectEntity"
                        style="background-color: {{entity.options.clearOperationWhenSelectEntity ? entity.color : 'transparent'}};
                          border-color: {{entity.options.clearOperationWhenSelectEntity ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;">
                    </div>
                    <div class="form-check form-switch">
                      <!-- Digit Limit -->
                      <label class="form-check-label" for="digitLimit">Limitar números</label>
                      <input id="digitLimit" class="form-check-input focus-ring" type="checkbox" role="switch" formControlName="digitLimit"
                        style="background-color: {{entity.options.digitLimit ? entity.color : 'transparent'}};
                          border-color: {{entity.options.digitLimit ? entity.color : Color.GREY}};
                          --bs-focus-ring-color: {{entity.color}}4C;">
                    </div>
                  </fieldset>
                  <fieldset formArrayName="customOperations" class="d-grid">
                    <legend>Operaciones personalizadas</legend>
                    <div class="row gap-3 mx-1 mb-3">
                      @for(customOperation of entity.customOperations; track customOperationsIndex; let customOperationsIndex = $index){
                        <div [formGroupName]="customOperationsIndex" class="input-group position-relative p-0 col">
                          <!-- Operators List -->
                          <div class="dropdown border border-1 rounded-start-3">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false"
                              class="btn btn-primary form-control rounded-0 rounded-start-2"
                              style="background-color: {{customOperation.color}}; border-color: {{customOperation.color}}; height: 40px;"
                            >
                              <i class="dropdown-item bi bi-{{customOperation.operator}}-lg"></i>
                            </button>
                            <ul class="dropdown-menu">
                              @for(operator of Operators; track $index){
                                <li><i class="dropdown-item bi bi-{{operator}}-lg" (click)="setCustomOperationsOperator(entityIndex, customOperationsIndex, operator)"></i></li>
                              }
                            </ul>
                          </div>
                          <!-- Number To Apply -->
                          <input id="numberToApply" class="form-control text-center" type="number" step="0" min="0"
                            formControlName="numberToApply" placeholder="Número">
                          <!-- Color picker -->
                          <input type="color" class="form-control p-0 border-end-1 rounded-end" formControlName="color" id="operationsColorPicker" title="Lista de colores">
                          <!-- Delete Custom Operation -->
                          <button type="button" class="btn btn-danger position-absolute top-0 start-100 translate-middle badge rounded-pill border-0 bg-danger"
                            (click)="deleteCustomOperation(entityIndex, customOperationsIndex)" style="z-index: 10;">
                            <i class="bi bi-{{Operator.MULTIPLICATION}}-lg"  style="margin: -3px"></i>
                          </button>
                        </div>
                      }
                    </div>
                    <button type="button" class="btn btn-{{edit ? 'warning' : 'primary'}} focus-ring" (click)="addCustomOperation(entityIndex)"
                      style="background-color: {{entity.color}}; border-color: {{entity.color}}; --bs-focus-ring-color: {{entity.color}}7F;">
                      <i class="bi bi-{{Operator.ADDITION}}-lg"> Añadir operación</i>
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          }
          </div>
          <!-- Add Entity -->
          <div class="d-grid mt-3">
            <button type="button" class="btn btn-{{edit ? 'warning' : 'primary'}}" (click)="addEntity()">
              <i class="bi bi-{{Operator.ADDITION}}-lg"> Añadir elemento</i>
            </button>
          </div>
        </form>
      }
    </app-custom-modal>
  `
})
export class AddCalculatorFormComponent implements OnInit {

  // TODO Validaciones
  // TODO customOperator hacer en grid
  //! TODO los colores al seleccionar un input en el formulario cada uno tiene uno
  //! TODO al borrar un customOperator, borra el ultimo añadido - Es por el id que no tiene y usa el $index


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

  get Icons(): string[] {
    return Object.values(Icon) as string[];
  }

  get Operators(): string[] {
    return Object.values(Operator) as string[];
  }

  get Operator() {
    return Operator
  }

  get Color() {
    return Color
  }

  protected setCustomOperationsOperator(entityIndex: number, customOperationsIndex: number, value: string) {
    const customOperations = this.entityList.at(entityIndex).get('customOperations') as FormArray;
    customOperations.at(customOperationsIndex)?.get('operator')?.setValue(value);
  }

  protected setEntityIcon(entityIndex: number, value: string) {
    this.entityList.at(entityIndex).get('icon')?.setValue(value);
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
        name: this.fb.control(null),
        icon: this.fb.control(null),
        color: this.fb.control(this.editMode() ? Color.ORANGE : Color.PURPLE, [Validators.required]),
        resultDefault: this.fb.control(0, [Validators.required]),
        resultCurrent: this.fb.control(0, [Validators.required]),
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
    const entity = this.entityList.at(entityIndex) as FormGroup;
    const customOperations = entity?.get('customOperations') as FormArray;

    customOperations.push(
      this.fb.group({
        operator: this.fb.control(Operator.ADDITION, [Validators.required]),
        numberToApply: this.fb.control(0, [Validators.required]),
        color: this.fb.control(entity.get('color')?.value, [Validators.required]),
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
      this.entityList.controls.forEach((entityControl) => {
        // If modify resultDefault modify resultCurrent equal
        if (entityControl.get('resultDefault')?.dirty)
          entityControl.get('resultCurrent')?.setValue(entityControl.get('resultDefault')?.value);

        // If name is null set value Nuevo elemento
        if (!entityControl.get('name')?.value)
          entityControl.get('name')?.setValue('Nuevo elemento');

        return entityControl;
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
