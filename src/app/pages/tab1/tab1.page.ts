import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  disabled = false;

  constructor( private postsService: PostsService) {}

  ngOnInit() {
    this.nexts();
  }

  reload( event ) {
    console.log(' fired reload! ');
    this.nexts( event, true );
    this.disabled = false;
    this.posts = []; // If pull refresher actived, we want to delete all the posts and query them again.
  }

  nexts( event?, pull: boolean = false ) {

    this.postsService.getPosts( pull ) // When pull is true starts getting the posts from page 1.
    .subscribe( resp => {
      console.log(resp);
      this.posts.push( ...resp.posts );

      if ( event ) {
        event.target.complete();
        if ( resp.posts.length === 0 ) {
          // event.target.disabled = true;
          this.disabled = true;
        }
      }
    });
  }
}
