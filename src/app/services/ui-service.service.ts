import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertCtr: AlertController,
               private toastCtr: ToastController ) { }

  async infoAlert( message: string ) {
    const alert = await this.alertCtr.create({
     // header: 'Login',
     // subHeader: 'Your details are not correct, please try again',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async updatedAlert( message: string ) {
    const toast = await this.toastCtr.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
