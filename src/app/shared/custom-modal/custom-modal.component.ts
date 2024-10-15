import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [],
  template: `
      <div class="modal fade" [id]="this.modalId()" tabindex="-1"
        [attr.aria-labelledby]="this.modalId() + 'Label'" aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" [id]="this.modalId() + 'Label'">{{this.headerText()}}</h5>
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomModalComponent {
  modalId = input.required<string>();
  headerText = input.required<string>();
}
