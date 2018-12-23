import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
  pluginName: 'VungleProvider',
  plugin: 'cordova-plugin-vungle',
  platforms: ['Android','IOS'],
  pluginRef: 'Vungle',
  repo: 'https://github.com/floatinghotpot/cordova-plugin-vungle'
})

//public const vungleVideoAdId = "5c1e59ebf415214564bcf7f5";

@Injectable()
export class VungleProvider extends IonicNativePlugin {

  @Cordova()
  prepareRewardVideoAd(vungleVideoAdId: any): Promise<any> { return ;}

  @Cordova()
  showRewardVideoAd(): Promise<any> { return ; }

}
