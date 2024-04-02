import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyCustomDirectivesModule } from './modules/directive-module.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomTableComponent } from './custom-table/custom-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MyCustomDirectivesModule,
    MatSlideToggleModule,
    CustomTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-project';
  count: number = 0;
  show: boolean = true;
  frameworks: string[] = ['react', 'angular', 'vue', 'nextjs'];

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
}
