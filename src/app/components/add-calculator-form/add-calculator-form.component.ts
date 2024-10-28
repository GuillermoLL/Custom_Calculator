import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Calculator } from '../calculator';
import { CustomModalComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      [headerText]="this.headerText"
      [headerTextClass]="edit ? 'text-warning' : 'text-primary'"
      [acceptText]="this.submitText"
      [acceptButtonClass]="edit ? 'btn-warning' : 'btn-primary'"
      [cancelText]="this.cancelText"
      (acceptEvent)="this.buildCalculator()"
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
  // TODO Diseñar y maquetar formulario
  // TODO Configurar los inputs y los controles del formulario
  protected myForm?: FormGroup;

  // Event Emiters
  editEventEmiter = output<Calculator>();
  addEventEmiter = output<Calculator>();

  ngOnInit(): void {
    console.log(this.data());
    if (this.editMode() && this.data()) {
      this.headerText = `Editar ${this.data()?.name}`;
      this.submitText = 'Editar';
    }
    this.myForm = this.fb.group({
      name: this.fb.control(this.data().name),
      entity: this.fb.group({
        name: this.fb.control('', [Validators.required]),
        icon: this.fb.control(''),
        color: this.fb.control(''),
        resultDefault: this.fb.control('', [Validators.required]),
        resultCurrent: this.fb.control('', [Validators.required]),
        options: this.fb.control('', [Validators.required]),
        customOperations: this.fb.group({
          operator: this.fb.control('', [Validators.required]),
          numberToApply: this.fb.control('', [Validators.required]),
          color: this.fb.control(''),
        })
      })
    });
  }

  protected buildCalculator(): void {
    const id = this.editMode() ? this.data()?.id : generateUUID();
    const name = this.data()?.name ? this.data()?.name : 'Nueva calculadora'
    const entity = this.data()?.entity.map(
      (elm) => elm
    );

    const calculator: any = {
      id,
      name,
      entity
    };

    this.sendCalculator(calculator);
  }

  private sendCalculator(calculator: Calculator): void {
    this.editMode()
      ? this.editEventEmiter.emit(calculator)
      : this.addEventEmiter.emit(calculator);
  }
}
