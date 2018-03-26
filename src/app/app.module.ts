import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';
import { SearchPage } from '../pages/search/search';
import { AdMobFree } from '@ionic-native/admob-free';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AppVersion } from '@ionic-native/app-version';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          backButtontext: ''
        }
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    AdMobFree,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
