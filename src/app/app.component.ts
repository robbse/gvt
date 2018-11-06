import { Component, AfterViewInit, OnInit, Host } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnInit, Host {

  public isLoading = false;
  public title = 'Graphical Visualisation Technologies - Medieninformatik Online Master';

  ngOnInit(): void {
    this.isLoading = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

  }
}
