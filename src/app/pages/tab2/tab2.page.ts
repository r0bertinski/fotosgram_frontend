import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

declare var window: any; // avoid error from typescrip

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
               private geolocation: Geolocation,
               private camera: Camera,
               private imagePicker: ImagePicker ) {}


  async createPost() {
    console.log( this.currentPost );
    const created = await this.postSrv.createPost( this.currentPost );

    this.currentPost = {
      message: '',
      coords: null,
      position: false
    };

    this.tempImages = [];

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

  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);

  }

  library() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };


    this.processImage( options );
  }

  processImage( options: CameraOptions ) {


    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log( img );

      this.postSrv.uploadImage( imageData );
      this.tempImages.push( img );
    }, (err) => {
      // Handle error
    });
  }

}
