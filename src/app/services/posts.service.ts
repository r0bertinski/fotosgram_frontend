import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse } from '../../interfaces/interfaces';

const BASEURL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts = 0;

  constructor( private http: HttpClient) { }

  getPosts( pull: boolean = false ) {

    if ( pull ) {
      this.pagePosts = 0;
    }
    
    this.pagePosts ++;
    return this.http.get<PostResponse>(`${BASEURL}/posts?page=${this.pagePosts}`);
  }


}
