import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Calculator, Entity, Operation, Operator } from './calculator.type';

@Component({
  selector: 'app-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  styleUrl: './calculator.component.scss',
  template: `
    @let calculator = data();
      @if (calculator) {
        <div class="calculator">
          <!-- Calculator Header -->
          <div class="header">
            {{calculator.name}}
          </div>

          <!-- Calculator Body -->
          <div class="body">

            <!-- ************************************ -->
            <!-- * Entity to operate ************** -->
            <!-- ************************************ -->
            <div class="elements">
              @for (entity of calculator.entity; track entity.id) {
                <div class="info">
                  <!-- <img> -->
                  <span class="name" [style.color]="entity.color">{{ entity.name }}</span>
                  <div class="result">
                    <span class="current">{{ entity.resultCurrent }} / </span>
                    <span class="default" [style.color]="entity.color"> {{ entity.resultDefault }}</span>
                  </div>
                </div>
              }
            </div>

            @if( entitySelected ){
              <!-- ************************************ -->
              <!-- * Operation ************************ -->
              <!-- ************************************ -->
              <div class="operation">
                <p>{{ entitySelected.resultCurrent }} {{ operatorSelected }}  {{ numberToApply }}</p>
              </div>

              <!-- ************************************ -->
              <!-- * Keys ***************************** -->
              <!-- ************************************ -->
              <div class="keys">
                <!-- Default calculators keys -->
                <div class="calculator-key"></div>

                <!-- Customs keys -->
                  @for (customOperation of entitySelected.customOperations; track $index) {
                    <p class="custom-key" [style.color]="customOperation.color">
                      {{ customOperation.operator }} {{ customOperation.numberToApply }}
                    </p>
                  }
              </div>
            }
          </div>
        </div>
      }
  `,
})

export class CalculatorComponent implements OnInit {

  data = input.required<Calculator>();

  entitySelected?: Entity;
  operatorSelected?: Operator;
  numberToApply?: number;

  constructor() { }

  ngOnInit() {

  }
}
