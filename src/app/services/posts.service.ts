import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse, Post } from '../../interfaces/interfaces';
import { UserService } from './user.service';

const BASEURL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts = 0;

  newPost = new EventEmitter<Post>();

  constructor( private http: HttpClient,
               private userSrv: UserService) { }

  getPosts( pull: boolean = false ) {

    if ( pull ) {
      this.pagePosts = 0;
    }
    
    this.pagePosts ++;
    return this.http.get<PostResponse>(`${BASEURL}/posts?page=${this.pagePosts}`);
  }

  createPost( post: Post ) {

    const headers = new HttpHeaders( {
      'x-token': this.userSrv.token
    });

    return new Promise( resolve => {
      this.http.post(`${ BASEURL }/posts`, post, { headers })
      .subscribe( resp => {

        if ( resp['ok'] ) {
          console.log( resp  );
          this.newPost.emit( resp['data'] );
          resolve( true );
        }

        resolve( false );
      });
    });

 
  }


}
