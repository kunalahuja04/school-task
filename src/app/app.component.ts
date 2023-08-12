import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserIconVisible: boolean = false;
  public href: string = "";

  constructor(router: Router) {
    router.events.subscribe((val) => {
      if(location.pathname != '/'){
        this.isUserIconVisible = true;
      } else {
        this.isUserIconVisible = false;
      }      
    });
  }

  title = 'school-management-system';
}
