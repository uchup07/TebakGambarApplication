import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { GuessPage } from '../../pages/guess-page/guess-page';
import { HomePage } from '../../pages/home/home';

import { Puzzles } from '../../providers/puzzles';
import { Users } from '../../providers/users';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main-page.html'
})

export class MainPage {

  user: any;
  puzzles: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toast: ToastController, public userService: Users, public puzzleService: Puzzles) {
  	this.user = this.navParams.get('user');		// grab user parameter from previous page
  }


  ionViewDidLoad() {

    this.puzzleService.getPuzzles({}).then((data) => {
  		
  		this.puzzles = data;
  		console.log(data);
  		//console.log(this.puzzles[0]._id);
  	}, (err) => {
  		console.log(err);
  	});
  }

  /**
  * Goto Page
  * Jump to GuessPage
  * @param params object
  *
  **/
  goToPage(params) {
  	this.navCtrl.push(GuessPage, { user: this.user, puzzle: params });
  }

}
