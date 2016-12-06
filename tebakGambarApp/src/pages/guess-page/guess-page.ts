import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { ResultPage } from '../../pages/result-page/result-page';

import { Puzzles } from '../../providers/puzzles';
import { Users } from '../../providers/users';

/*
  Generated class for the GuessPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guess',
  templateUrl: 'guess-page.html'
})
export class GuessPage {

  answer: any;
  user: any;
  puzzle: any;
  error: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController, public userService: Users, public puzzleService: Puzzles) {
  	this.user = this.navParams.get('user');
  	this.puzzle = this.navParams.get('puzzle');
  	this.error = false;
  	this.answer = '';
  }

  ionViewDidLoad() {
    console.log('Hello GuessPage Page');
  }

  doAnswer() {
  
  	if(this.answer.toLowerCase() != this.puzzle.answer.toLowerCase()) {

  		this.error = true;

  	} else {

  		let options = {
  			_id: this.user._id, 
  			score: this.user.score
  		};

  		this.userService.updateUser(options).then((data) => {
  			console.log(data);
	  		this.user = data;

	  		this.navCtrl.push(ResultPage, {
	  			user: this.user,
	  			puzzle: this.puzzle
	  		});
	  	}, (err) => {
	  		this.showAlert(err);
	  	});

  		
  	}

  	
  }

  /**
  * Resetting error
  *
  **/

  resetError() {
  	this.error = false;
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
