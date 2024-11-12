import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @let id = modalId();
    <div class="modal fade" [id]="id" tabindex="-1"
      [attr.data-bs-backdrop]="backdropStatic() ? 'static' : null"
      [attr.data-bs-keyboard]="!backdropStatic()"
      [attr.aria-labelledby]="id + 'Label'" aria-hidden="true"
    >
      <div class="modal-dialog {{scroll() ? 'modal-dialog-scrollable' : ''}}">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" [className]="this.headerTextClass()" [id]="id + 'Label'">{{this.headerText()}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" (click)="this.handleClickCancel()"></button>
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
              (click)="this.handleClickAccept()"
              [disabled]="this.acceptButtonDisabled">{{this.acceptText()}}</button>
          </div>
        </div>
      </div>
    </div>
    `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CustomModalComponent implements OnInit {
  modalId = input.required<string>();

  // header config
  headerText = input.required<string>();
  headerTextClass = input<string>();

  // acceptButton config
  acceptButtonClass = input<string>('btn-primary');
  acceptText = input<string>('Guardar');
  acceptEvent = output<number>();
  $acceptButtonDisabled = input<BehaviorSubject<boolean>>();
  protected acceptButtonDisabled = false;

  // cancelButton config
  cancelButtonClass = input<string>('btn-secondary');
  cancelText = input<string>('Cancelar');
  cancelEvent = output<number>();

  // General options
  // If true, when click out of modal then close
  backdropStatic = input<boolean>(false);

  // If true, the modal can do scroll
  scroll = input<boolean>(false);


  ngOnInit(): void {
    this.$acceptButtonDisabled()?.subscribe((elm) => this.acceptButtonDisabled = elm);
  }

  handleClickAccept() {
    this.acceptEvent.emit(1);
  }

  handleClickCancel() {
    this.cancelEvent.emit(-1);
  }
}
