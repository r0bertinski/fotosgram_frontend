import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};


  constructor( private userService: UserService ) {}

  ngOnInit() {
    this.user = this.userService.getUser();

    console.log( 'user', this.user );
  }

  logout() {
    
  }

}
