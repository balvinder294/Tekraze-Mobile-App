import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  private logoUrl:string = 'http://tekraze.com/wp-content/uploads/2018/01/finallogo.png';
  rootPage: any = HomePage;
  category: any;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public api: ApiProvider,
              protected app:App
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.api.getCategories();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(category_id:number = 0) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage, {category_id: category_id});
  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }

  openAboutPage(){
    this.navCtrl.push(AboutPage);
  }

}
