import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyCustomDirectivesModule } from './modules/directive-module.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { CustomTreeComponent } from './custom-tree/custom-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MyCustomDirectivesModule,
    MatSlideToggleModule,
    CustomTableComponent,
    CustomTreeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-project';
  count: number = 0;
  show: boolean = true;
  frameworks: string[] = ['react', 'angular', 'vue', 'nextjs'];
  // Template Reference Variable
  pokemonName: string = '';
  applyRed: boolean = false;
  applyGreen: boolean = false;
  shouldBold: boolean = false;

  printInputElement(element: HTMLInputElement) {
    console.log('Element: ', element);

    console.log('element value: ', element.value);
  }

  increment(event: MouseEvent) {
    this.count = this.count + 1;
    console.log(`Clicked on X: ${event.clientX}, Y: ${event.clientY}`);
  }
  decrement() {
    this.count = this.count - 1;
  }

  showHidePara() {
    console.log(this.show);
    this.show = !this.show;
    console.log(this.show);
  }

  toggleBooleanRed() {
    this.applyRed = !this.applyRed;
  }
  toggleBooleanGreen() {
    this.applyGreen = !this.applyGreen;
  }
  toggleBold() {
    this.shouldBold = !this.shouldBold;
  }
}
