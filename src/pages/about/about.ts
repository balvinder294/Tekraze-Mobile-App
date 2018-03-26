import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  appName: any;
  packageName: any;
  versionCode: any;
  versionNumber: any;

  private logoUrl:string = 'http://tekraze.com/wp-content/uploads/2018/01/finallogo.png';
  private logo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appVersion: AppVersion) {
    this.logo = this.logoUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
