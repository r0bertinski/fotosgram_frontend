import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiServiceService } from '../../services/ui-service.service';
import { User } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', { static: true}) slides: IonSlides;

loginUser = {
  email: 'testuser7@gmail.com',
  password: '123456'
};


registerUser: User = {

  // Default data
  // email: Math.random().toString(36).substring(7) + '@test.com' ,
  // name: 'papixula' + Math.random().toString(36).substring(7),
  email: 'testuser7@gmail.com',
  name: 'papixula',
  password: '123456',
  avatar: 'av-1.png'
};

  constructor( private userService: UserService,
               private navCtrl: NavController,
               private UiService: UiServiceService ) { }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ) {
    const LOGIN = await this.userService.login( this.loginUser.email, this.loginUser.password );

    if ( LOGIN ) {
      // Nav to tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // show alert , user or pwd not correct.
      this.UiService.infoAlert('User and password are not correct');
    }
  }

  async register( fRegister: NgForm ) {

    // Form validation fails.
    if ( fRegister.invalid ) { return; }

    const REGISTER = await this.userService.register( this.registerUser );


    if ( REGISTER ) {
      // Nav to tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // show alert , user or pwd not correct.
      this.UiService.infoAlert('This email already exists');
    }
  }


  showLogin() {
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }


  showRegister() {
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }

}
