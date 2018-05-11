import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

/*
  Generated class for the AdsDerviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdsServiceProvider {

  clickCount: any;  

  constructor(public http: HttpClient,
              public admob: AdMobFree) {
    console.log('Hello AdsDerviceProvider Provider');
    this.clickCount = 0;
  }

  incrementCounter(){
    console.log(this.clickCount);
    this.clickCount +=1;
    console.log(this.clickCount);
    this.showAds();
  }

  showAds(){
    if (this.clickCount % 8 == 0){
      console.log('count was for click',this.clickCount);
      this.launchInterstitial();
    } else if (this.clickCount % 17 == 0){
      this.showVideoAdd();
    }
    else {
      console.log('else case for ads');
    }
  }

  showVideoAdd(){
    console.log('video ad was called');

    let videoConfig: AdMobFreeRewardVideoConfig = {
      autoShow: true,
      isTesting: false,
      id: 'ca-app-pub-3447738154735769/9714615484'
    }

    this.admob.rewardVideo.config(videoConfig);
    this.admob.rewardVideo.prepare().then(() => {
      console.log('video reward ad was shown');
    }).catch(e => console.log(e));
  }

  showBanner() {
    console.log('Banner methid was called');

    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        isTesting: false,
        id : 'ca-app-pub-3447738154735769/7693504766',
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
        // success
        console.log('ad was shown');
    }).catch(e => console.log(e));
  }

  launchInterstitial() {
    console.log('Inter methid was called');
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-3447738154735769/2543876590'
    };

    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare().then(() => {
        // success
        console.log('interstitial ad was shown');
    });

}

}
