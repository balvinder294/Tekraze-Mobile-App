import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';
import { AdsServiceProvider } from '../../providers/ads-service/ads-service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private per_page = 5;
  public items:any = [];
  private page:number = 1;
  private showLoadMore = false;
  private isLoading = false;
  searchQuery:string = '';

 constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public api:ApiProvider,
   public adsProvider: AdsServiceProvider
  ) {
  }

  ionViewDidLoad() {
  }

  onSearch(){
      this.items = [];
      this.getPosts();
  }

  getPosts(){
    this.incrementAdsCounter();
    if(!this.isLoading && this.searchQuery.length > 0){
      this.isLoading = true;
      this.api.get('posts?_embed&per_page='+ this.per_page + '&page=' + this.page + '&search='+ this.searchQuery)
      .subscribe((data:any) => {
        this.isLoading = false;
        this.items = this.items.concat(data);
        if( data.length === this.per_page){
          this.page++;
          this.showLoadMore = true;
        }
        else {
          this.showLoadMore = false;
      } 
        this.page++;
    }, (error) => {
      this.isLoading = false;
      if(error.error.code==="rest_post_invalid_page_number"){
        this.showLoadMore = false;
      }
    });
    }
  }

  clearSearch(){
    this.searchQuery = '';
    this.items = [];
    this.page = 1;
    this.showLoadMore = false;
    this.incrementAdsCounter();
  }

  openDetail(item){
    this.incrementAdsCounter();
    this.navCtrl.push(DetailPage, {post: item});
  }

  incrementAdsCounter(){
    this.incrementAdsCounter
  }

}
