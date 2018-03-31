import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { CommentsPage } from '../comments/comments';

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
  comments: any;
  datas:any[];
  public isLoading:boolean = false;
  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public api:ApiProvider,
        private http: HttpClient,
        private modalCtrl: ModalController
      ) {
   this.post = navParams.get('post');
   console.log(this.post ,'this post variable');
   this.getcomments();
  }

  ionViewDidLoad() {
    this.getcomments();
    this.getrelated();

  }
  

  getcomments(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('comments?post='+ this.post.id).subscribe((comment)=>{
        console.log(comment ,'comment was called');
        this.isLoading = false;
        this.comments = comment;
    }, (error) => {
      this.isLoading = false;
    });
    }
  }

  getrelated(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('posts?_embed&categories='+this.post.categories[0]).subscribe((data)=>{
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

  openCommentPage(url){
    this.navCtrl.push(CommentsPage, {url:url});
    console.log(this.comments,"method was callleddddddd");
  }

}