import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/main-page/main-page';
import { GuessPage } from '../../pages/guess-page/guess-page';

import { Puzzles } from '../../providers/puzzles';
import { Users } from '../../providers/users';

/*
  Generated class for the ResultPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result',
  templateUrl: 'result-page.html'
})
export class ResultPage {

	user: any;
	puzzle: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController, public userService: Users, public puzzleService: Puzzles) {
  	this.user = this.navParams.get('user');
  	this.puzzle = this.navParams.get('puzzle');
  }

  ionViewDidLoad() {
    console.log('Hello ResultPage Page');
  }

  doNext() {

  	let newquestion = this.puzzle.question+1;

  	this.puzzleService.getPuzzles({question: newquestion }).then((data) => {

  		if(Object.keys(data).length > 0) {
  			this.puzzle = data[0];
  			this.navCtrl.push(GuessPage, { user: this.user, puzzle: this.puzzle });
  		} else {
  			this.showToast('Maaf!, level permainan telah berakhir',2000);

  			this.navCtrl.push(MainPage, { user: this.user });

  		}

  	}, (err) => {
  		console.log(err);
  	});
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
