import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

 constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onSearch(){
      this.items = [];
      this.getPosts();
  }

  getPosts(){
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
  }

  openDetail(item){
    this.navCtrl.push(DetailPage, {post: item});
  }


}
