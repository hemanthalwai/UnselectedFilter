import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public one = '1';
  title = 'FilterOption';
  iterations = [{id: '3'}, {id: '2'}, {id: '1'}];
   values = ['4', '5'];
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Australia' },
    { id: 3, name: 'Brazil' },
    { id: 4, name: 'Canada' },
    { id: 5, name: 'England' }
  ];



  selectedUsers = ['1', '2'];
  selectedUsers2 = ['3', '4'];
  allUsers = [{
    id: 1,
    first_name: 'John',
    email: 'john.doe@test.com'
  }, {
    id: 2,
    first_name: 'Jane',
    email: 'jane.doe@test.com'
  }, {
    id: 3,
    first_name: 'Aplha',
    email: 'aplha.doe@test.com'
  }, {
    id: 4,
    first_name: 'Beta',
    email: 'beta.doe@test.com'
  }];


  ngOnInit(): void {

  }

  addCountry() {
    const temp = {id: null};
    this.iterations.push(temp);
    this.values.push('');
  }

  deleteSelect(index: number) {
    // tslint:disable-next-line:no-string-literal
    this.iterations[index]['isDeleted'] = true;
  }



}
