import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Calculator, CalculatorComponent, Color, Icon, Operator } from '../../components';
import { AddCalculatorFormComponent } from "../../components/add-calculator-form/add-calculator-form.component";
import { CalculatorService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CalculatorComponent, AddCalculatorFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="d-flex justify-content-md-end justify-content-center gap-2 sticky-top mx-3 mt-3 mb-0 ">
      <button type="button" class="btn btn-primary px-4 py-2 px-md-3 py-md-1"
        data-bs-toggle="modal" [attr.data-bs-target]="'#' + this.addModalId"
        > <i class="bi bi-plus-lg"></i></button>
      <button type="button" class="btn btn-primary px-4 py-2 px-md-3 py-md-1"> <i class="bi bi-gear"></i></button>
    </header>
    <article class="row me-0">
      @for (calculator of (this.calculatorService.$calculators | async); track calculator.id) {
        <app-calculator [data]="calculator" class="col-xl-3 col-lg-6 col-md-6"/>
      }
    </article>
    <app-add-calculator-form [modalId]="this.addModalId"/>
  `,
  styles: ``
})
export class BoardComponent {
  addModalId = 'addModalId';

  constructor(protected calculatorService: CalculatorService) { }
}
