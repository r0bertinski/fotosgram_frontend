import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertCtr: AlertController ) { }

  async infoAlert( message: string ) {
    const alert = await this.alertCtr.create({
     // header: 'Login',
     // subHeader: 'Your details are not correct, please try again',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
