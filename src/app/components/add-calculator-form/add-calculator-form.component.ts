import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Calculator, Operation } from '../calculator';
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
      [cancelText]="this.cancelText"
      (acceptEvent)="this.buildCalculator()"
      (cancelEvent)="this.clearForm()"
      >
      @if(this.myForm){
        <form [formGroup]="myForm">
          <label for="calculatorName">Nombre</label>
          <input id="calculatorName" class="form-control" type="text" formControlName="name"
            [placeholder]="">
        </form>
      }
    </app-custom-modal>
  `
})
export class AddCalculatorFormComponent implements OnInit {

  // TODO Diseñar y maquetar formulario

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

  ngOnInit(): void {
    if (this.data()) {
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
        icon: this.fb.control(entity.icon),
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
        name: this.fb.control(null, [Validators.required]),
        icon: this.fb.control(null),
        color: this.fb.control(null, [Validators.required]),
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
