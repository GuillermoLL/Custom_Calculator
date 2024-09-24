import { Component, Input, OnInit } from '@angular/core';
import { Calculator } from './calculator.type';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  template: `
    <p>
      calculator works!
    </p>
  `,
  styles: ``
})

export class CalculatorComponent implements OnInit {
  @Input() data!: Calculator

  constructor() { }

  ngOnInit() {

  }
}
