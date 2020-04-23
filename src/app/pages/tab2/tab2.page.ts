import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  loadingGeo = false;

  // A new post we are creating.
  currentPost = {
    message: '',
    coords: null,
    position: false
  };

  constructor( private postSrv: PostsService,
               private route: Router,
               private geolocation: Geolocation) {}


  async createPost() {
    console.log( this.currentPost );
    const created = await this.postSrv.createPost( this.currentPost );

    this.currentPost = {
      message: '',
      coords: null,
      position: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {

    if ( !this.currentPost.position ) {
      this.currentPost.coords = null;
      return;
    }
    
    this.loadingGeo = true;


    this.geolocation.getCurrentPosition().then((resp) => {
      
      // resp.coords.latitude
      // resp.coords.longitude
     
      this.loadingGeo = true;

      this.currentPost.coords  = `${ resp.coords.latitude },${ resp.coords.longitude }`;
   
      console.log('location',  this.currentPost.coords );
      this.loadingGeo = false;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     

    console.log( this.currentPost );
  }

}
