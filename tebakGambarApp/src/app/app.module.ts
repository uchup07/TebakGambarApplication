import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main-page/main-page';
import { ResultPage } from '../pages/result-page/result-page';
import { GuessPage } from '../pages/guess-page/guess-page';
import { Users } from '../providers/users';
import { Puzzles } from '../providers/puzzles';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    ResultPage,
    GuessPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    ResultPage,
    GuessPage
  ],
  providers: [Users, Puzzles,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
