import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-project';
  count: number = 0;
  show: boolean = true;
  frameworks: string[] = ["react", "angular", "vue", "nextjs"]

  increment(event: MouseEvent) {
    this.count = this.count + 1;
    console.log(`Clicked on X: ${event.clientX}, Y: ${event.clientY}`);
  }
  decrement() {
    this.count = this.count - 1;
  }

  showHidePara(){
    console.log(this.show)
    this.show = !this.show;
    console.log(this.show)
  }

}
