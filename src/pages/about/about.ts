import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
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
  devicePlatform: any;
  deviceModel: any;  

  private logoUrl:string = 'http://tekraze.com/wp-content/uploads/2018/01/finallogo.png';
  private logo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appVersion: AppVersion,private device: Device,private platform: Platform) {
    this.logo = this.logoUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.devicePlatform = this.device.platform;
    this.deviceModel = this.device.model;
    this.appVersion.getAppName().then((value)=>{
      this.appName = value;
    });
    this.appVersion.getVersionCode().then((value) => {
      this.versionCode = value;
    });
    this.appVersion.getVersionNumber().then((value)=>{
      this.versionNumber = value;
    });
    this.appVersion.getPackageName().then((value) => {
      this.packageName = value;
    });
  }

}
