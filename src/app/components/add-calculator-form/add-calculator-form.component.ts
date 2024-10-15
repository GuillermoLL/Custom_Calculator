import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Calculator } from '../calculator';

@Component({
  selector: 'app-add-calculator-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styleUrl: './add-calculator-form.component.scss',
  template: `
  @let edit = this.editMode();
    <div class="modal fade" [id]="this.modalId()" tabindex="-1"
      [attr.aria-labelledby]="this.modalId() + 'Label'" aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            @if(edit){
              <h5 class="modal-title" [id]="this.modalId() + 'Label'">{{this.editHeaderText}}</h5>
            } @else{
              <h5 class="modal-title text-primary" [id]="this.modalId() + 'Label'">Nueva calculadora</h5>
            }
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AddCalculatorFormComponent implements OnInit {
  data = input<Calculator>();
  modalId = input.required<string>();
  editMode = input.required<boolean>();
  editHeaderText = ''

  ngOnInit(): void {
    if (this.editMode() && this.data()) {
      this.editHeaderText = `Editar ${this.data()?.id} - ${this.data()?.name}`
    }
  }
}
