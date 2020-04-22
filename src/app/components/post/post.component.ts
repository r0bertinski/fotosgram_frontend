import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  images = ['perro-1.jpg', 'perro-2.jpg', 'perro-3.jpg'];

  constructor() { }

  ngOnInit() {}

}
