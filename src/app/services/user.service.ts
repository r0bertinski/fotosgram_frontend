import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { User } from '../../interfaces/interfaces';
import { promise } from 'protractor';
import { NavController } from '@ionic/angular';
import { resolve } from 'url';

const { Storage } = Plugins;
const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};

  constructor( private http: HttpClient,
               private navCtrl: NavController ) { }

   login( email: string, password: string) {
    console.log( 'email', email );
    const data = { email, password }; // same than data: data and password:password in EcmaS5

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/login`, data)
      .subscribe( async resp => {
        
        if ( resp['ok']) {
          await this.storeToken( resp['token']);
          resolve(true);
        } else {
          this.token = null;
          Storage.remove( { key: 'token' } );
          resolve(false);
        }
      });
    });
  
  }

  logout() {
    this.token = null;
    this.user = null;
    Storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  getUser() {

    if ( !this.user._id ) {
      this.validateToken();
    }
    console.log( 'user before', this.user );
    return { ...this.user};
  }


  // Store token
  async storeToken( token: string ) {
    await Storage.set({
      key: 'token',
      value: JSON.stringify({
        key: 'token',
        value: token
      })
    });

    // Ensure that the token is validated, the app cannot continue till this validation finish.
    await this.validateToken();
  }

  register( user: User) {

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/create`, user)
          .subscribe( async resp => {
            console.log(  resp );

            if ( resp['ok']) {
              await this.storeToken( resp['token']);
              resolve(true);
            } else {
              this.token = null;
              Storage.remove( { key: 'token' } );
              resolve(false);
            }
          });
    });
  }

  async validateToken(): Promise<boolean> {
      
      await this.loadToken();

      console.log('TOKEN', this.token );

      if ( !this.token ) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve(false);
      }

      return new Promise<boolean>( resolve => {

        const headers = new HttpHeaders( {
          'x-token': this.token
        });

        this.http.get(`${URL}/user/`, { headers } )
            .subscribe( resp => {

              if ( resp['ok'] ) {
                this.user = resp['user'];
                resolve(true);
              } else {
                this.navCtrl.navigateRoot('/login');
                resolve(false);
              }
            });

      });
  }

  async loadToken() {

    // JSON get token
    const token = await Storage.get({ key: 'token' });
    console.log('TOKEN json', token);

    if ( !token.value ){
      this.token = null;
      return;
    }

    this.token = JSON.parse(token.value).value || null;

  }

  updateUser( user: User) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });


    return new Promise( resolve => {
      this.http.post(`${ URL }/user/update`, user, { headers })
      .subscribe( resp => {
         if ( resp['ok'] ) {
           this.storeToken( resp['token']  );
           resolve( true );
         } else {
           console.log( resp );
           resolve( false );
       }
      });

    });
  }

}


