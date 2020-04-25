import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostResponse, Post } from '../../interfaces/interfaces';
import { UserService } from './user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const BASEURL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts = 0;

  newPost = new EventEmitter<Post>();

  constructor( private http: HttpClient,
               private userSrv: UserService,
               private fileTransfer: FileTransfer) { }

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

  uploadImage( img ) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: { 'x-token' : this.userSrv.token }
   };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

 
    fileTransfer.upload( img, `${ BASEURL }/posts/upload`, options)
    .then((data) => {
      // success
      console.log( data );
    }, (err) => {
      // error
      console.log('error loading the image', err );

    });
  }

}
