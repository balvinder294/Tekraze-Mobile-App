import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public post:any = [];
  public relateditems:any = [];
  public isLoading:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
   this.post = navParams.get('post');
  console.log(navParams.get('post'));
  console.log(this.post.title.rendered);
  console.log(this.post.title)
  }

  ionViewDidLoad() {
    this.getrelated();
  }

  getrelated(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('posts?_embed&categories='+this.post.categories[0]).subscribe((data)=>{
        console.log(data);
        this.isLoading = false;
        this.relateditems = data;
    }, (error) => {
      this.isLoading = false;
    });
    }

  }

  openDetail(item){
    this.navCtrl.push(DetailPage, {post: item});
  }

}