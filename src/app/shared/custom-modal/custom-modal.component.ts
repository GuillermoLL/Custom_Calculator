import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [],
  template: `
    @let id = modalId();
    <div class="modal fade" [id]="id" tabindex="-1"
      [attr.aria-labelledby]="id + 'Label'" aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" [className]="this.headerTextClass()" [id]="id + 'Label'">{{this.headerText()}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal"
              class="btn text-white"
              [class]="this.cancelButtonClass()"
              (click)="this.handleClickCancel()">{{this.cancelText()}}</button>
            <button type="button" data-bs-dismiss="modal"
              class="btn text-white"
              [class]="this.acceptButtonClass()"
              (click)="this.handleClickAccept()">{{this.acceptText()}}</button>
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
  headerTextClass = input<string>();

  acceptButtonClass = input<string>('btn-primary');
  acceptText = input<string>('Guardar');
  acceptEvent = output<number>();

  cancelButtonClass = input<string>('btn-secondary');
  cancelText = input<string>('Cancelar');
  cancelEvent = output<number>();

  handleClickAccept() {
    this.acceptEvent.emit(1);
  }

  handleClickCancel() {
    this.cancelEvent.emit(-1);
  }
}
