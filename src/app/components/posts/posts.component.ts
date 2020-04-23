import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  // Inserted to this component from another one or from a PAGE ( tab1.page.html ).
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

}
