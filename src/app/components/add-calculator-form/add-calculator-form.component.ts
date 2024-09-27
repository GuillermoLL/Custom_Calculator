import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-calculator-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styleUrl: './add-calculator-form.component.scss',
  template: `
    <p>
      add-calculator-form works!
    </p>
  `,
})
export class AddCalculatorFormComponent {

}
