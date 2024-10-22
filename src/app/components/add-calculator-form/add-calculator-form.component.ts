import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { Calculator } from '../calculator';

@Component({
  selector: 'app-add-calculator-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styleUrl: './add-calculator-form.component.scss',
  template: `
  @let edit = this.editMode();
  @let id = this.modalId();
    <div class="modal fade" [id]="id" tabindex="-1"
      [attr.aria-labelledby]="id + 'Label'" aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 [id]="id + 'Label'"
              class="modal-title"
              [class]="[edit ? 'text-info' : 'text-primary']"
            >{{ this.headerText }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ this.cancelText }}</button>
            <button type="submit" data-bs-dismiss="modal"
              class="btn"
              [class]="edit ? 'btn-info' : 'btn-primary'"
              (click)="buildCalculator()"
            >{{ this.submitText }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AddCalculatorFormComponent implements OnInit {

  // TODO formulario de añadir y editar calculadora

  data = input<Calculator>({ id: '', name: '', entity: [] });
  modalId = input.required<string>();
  editMode = input.required<boolean>();

  editEventEmiter = output<Calculator>();
  addEventEmiter = output<Calculator>();

  headerText = 'Nueva calculadora';
  submitText = 'Crear';
  cancelText = 'Cancelar';


  ngOnInit(): void {
    if (this.editMode() && this.data()) {
      this.headerText = `Editar ${this.data()?.name}`;
      this.submitText = 'Editar';
    };
  }

  buildCalculator(): void {
    const id = this.editMode() ? this.data().id : '1232131';
    const entity = this.data().entity.map(
      (elm) => elm
    );

    const calculator: Calculator = {
      id,
      name: 'testetst',
      entity
    };

    this.sendCalculator(calculator);
  }

  sendCalculator(calculator: Calculator): void {
    this.editMode()
      ? this.editEventEmiter.emit(calculator)
      : this.addEventEmiter.emit(calculator);
  }
}
