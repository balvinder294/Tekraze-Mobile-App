import { Injectable } from '@angular/core';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

@Injectable()
export class AdsServiceProvider {
  clickCount: number;  

  constructor(
    public admob: AdMobFree,
    public platform: Platform
    ) {
    this.clickCount = 0;
  }

  incrementCounter(){
   this.clickCount +=1;
    this.showAds();
  }

  showAds(){
    if (this.clickCount % 6 == 0){
      this.launchInterstitial();
    }
  }

  showVideoAdd(){
    let videoConfig: AdMobFreeRewardVideoConfig = {
      autoShow: true,
      isTesting: false,
      id: 'ca-app-pub-3447738154735769/9714615484'
    }
    this.admob.rewardVideo.config(videoConfig);
    this.admob.rewardVideo.prepare().then(() => {
    }).catch(e => console.log(e));
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        isTesting: false,
        id : 'ca-app-pub-9562540225761386/7165685173',
    };
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
    }).catch(e => console.log(e));
  }

  launchInterstitial() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-9562540225761386/5581140760'
    };
    this.admob.interstitial.config(interstitialConfig);
    this.admob.interstitial.prepare().then(() => {})
    .catch(e => console.log(e));
}

}
