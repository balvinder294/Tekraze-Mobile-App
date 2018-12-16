import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';
import { AdMobFree } from '@ionic-native/admob-free';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AdsServiceProvider } from '../../providers/ads-service/ads-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any = [];
  private per_page:number = 6;
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading:boolean = false;
  private category_id:number = 0;
  private sort:string = '0';

  constructor( public navCtrl: NavController,
               public api:ApiProvider, 
               public navParams: NavParams,
               public admob:AdMobFree,
               private appMinimize: AppMinimize,
               private platform:Platform,
               private socialSharing: SocialSharing,
               private adsService: AdsServiceProvider) {
    if(this.navParams.get('category_id')!=null && this.navParams.get('category_id') !=undefined ){
      this.category_id = this.navParams.get('category_id');
    }
    this.getPosts();    
  }

  incrementClick(){
    this.adsService.incrementCounter();
  }

  getPosts(infiniteScroll = null){
    this.adsService.showBanner();
    if(!this.isLoading){
      this.isLoading = true;
      if(infiniteScroll!=null && infiniteScroll.ionRefresh){
        this.page = 1;
      }
      let url:string = 'posts?_embed&per_page='+this.per_page + '&page='+this.page;
      url += this.category_id!=0 ? '&categories='+this.category_id:'';
      url += this.sort == '1' ? '&order=asc' :this.sort == '2' ? '&orderby=title&order=asc' :this.sort == '3' ? '&orderby=title&order=desc' : '';
      this.api.get(url)
      .subscribe((data:any)=>{
        this.isLoading = false;
        this.items = infiniteScroll!=null && infiniteScroll.ionRefresh ? data : this.items.concat(data);

        if( data.length === this.per_page){
          this.page++;
          this.showLoadMore = true;
        }
      if(infiniteScroll){
        infiniteScroll.complete();
      } 
    }, (error) => {
      this.isLoading = false;
      if(infiniteScroll!=null){
        infiniteScroll.complete();
      }
    });
    }

  }

  openDetail(item){
    this.incrementClick();
    this.navCtrl.push(DetailPage, {post: item});
  }

  openSearchPage(){
    this.navCtrl.push(SearchPage);
    this.adsService.incrementCounter();
  }

  changeSort(){
    this.items = [];
    this.page = 1;
    this.showLoadMore = false;
    this.getPosts();
  }

  share(message,title,image,link) {
    this.socialSharing.share(message, title,image, link).then(() => {
    }).catch(() => {
    });
  }
}
