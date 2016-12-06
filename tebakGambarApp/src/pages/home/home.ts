import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { MainPage } from '../../pages/main-page/main-page';
import { Users } from '../../providers/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	username: any;

  // every import class can add on this constructor for declaration
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController, public userService: Users, public toast: ToastController) {
    this.username = '';
  }

  /**
  * doLogin
  * Do action login
  *
  **/

  doLogin() {

    // create loading
  	let loading = this.loadingCtrl.create({
  		content: 'loading...'
  	});

    // show loading
  	loading.present();

    if(this.username) {

      // create parameter from form input
      let options = {
        username: this.username
      };

      // lets calling user provider
      this.userService.getUser(options).then((data) => {
        
        console.log(data);
        loading.dismiss(); // dismiss loading controller

        // check the data length
        // if user already exists
        if(Object.keys(data).length > 0) {
          
          this.showToast('User logged in successfully!',1000); 

          this.navCtrl.push(MainPage,{user: data});     // jump to MainPage with user parameter

        // if no data, then add new user
        } else {
          
          // lets call user provider for add new user
          this.userService.addUser(options).then((data) => {

            this.showToast('User was added successfully!',1000);

            this.navCtrl.push(MainPage,{user: data});     // jump to MainPage with user parameter

          }, (err) => {
            // show them an error
            this.showAlert(err);
          });
        }

      }, (err) => {
        loading.dismiss();
        this.showAlert(err);    // show an alert
      });
    
    } else {
      loading.dismiss();
      this.showAlert('username tidak boleh kosong');
    }

    

  }


  /**
  * Show alert
  * @param msg string
  *
  **/

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['Dismiss']
    });

    alert.present();
  }

  /**
  * Show Toast
  * @param msg string
  *
  **/

  showToast(msg, duration) {
    let ts = this.toast.create({
      message: msg,
      duration: duration,
      position: 'top'
    });

    ts.onDidDismiss(() => { console.log('Dismissed Toast!'); });

    ts.present();
  }

}
