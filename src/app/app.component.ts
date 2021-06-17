import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public one = '1';
  title = 'FilterOption';
  iterations = [{id: 1}, {id: 2}, {id: 3}];
  values = [];
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Australia' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'Brazil' },
    { id: 5, name: 'England' }
  ];
  ngOnInit(): void {
    console.log('Started');
    this.generateValues();
  }

  addCountry() {
    const temp = {id: null};
    this.iterations.push(temp);
  }

  generateValues() {
    for (let i = 0; i < 4; i++) {
      this.values[i] = (+Math.random().toString().charAt(17) % 3 ) + 1;
    }
  }

  deleteSelect(index: number) {
    this.iterations.splice(index, 1);
  }


}
