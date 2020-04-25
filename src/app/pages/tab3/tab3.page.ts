import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // User with the updates.
  user: User = {};


  constructor( private userService: UserService,
               private uiService: UiServiceService,
               private postService: PostsService ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  async update( fUpdate: NgForm ) {
    if ( fUpdate.invalid) { return true; }

    const updated = await this.userService.updateUser( this.user );

    console.log( updated );
    if ( updated ) {
      // toas with update message
      this.uiService.updatedAlert('User data updated!');

    } else {
      // toas with an error message
      this.uiService.updatedAlert('User data cannot be updated!');

    }
  }

  logout() {
    this.userService.logout();
    this.postService.pagePosts = 0;
    console.log('pagePosts', this.postService.pagePosts);
  }

}
