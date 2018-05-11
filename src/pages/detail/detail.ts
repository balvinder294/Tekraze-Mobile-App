import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { CommentsPage } from '../comments/comments';
import { AdsServiceProvider } from '../../providers/ads-service/ads-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StripHtmlProvider } from '../../providers/strip-html/strip-html';

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

  instaShareMessageHtml: string;
  instaShareMessage: string;
  morePagesAvailable: boolean;
  public post:any = [];
  public relateditems:any = [];
  comments: any;
  datas:any[];
  shareMessage: string;
  shareLink: string;
  shareImage: string;

  public isLoading:boolean = false;
  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public api:ApiProvider,
        private modalCtrl: ModalController,
        public adsService: AdsServiceProvider,
        private socialSharing: SocialSharing,
        private stripHtml: StripHtmlProvider
      ) {
   this.post = navParams.get('post');
   this.shareImage = this.post._embedded['wp:featuredmedia'][0].source_url;
   this.shareLink = this.post.link;
   this.shareMessage = this.post.excerpt.rendered;
   this.instaShareMessageHtml = this.post.excerpt.rendered = " Check here :" + this.post.link;
   this.instaShareMessage = this.instaShareMessageHtml;
   this.convertHtmlToString();
  }

  convertHtmlToString(){
    let parser = new DOMParser ();
    parser.parseFromString(this.shareMessage,'text/html');

    console.log(parser);
  }

  ionViewDidLoad() {
    this.morePagesAvailable = true;
    this.getrelated();
    this.getcomments();
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
    this.adsService.incrementCounter();
    this.navCtrl.push(DetailPage, {post: item});
  }

  openCommentPage(url){
    this.navCtrl.push(CommentsPage, {url:url});
    console.log(this.comments,"method was callleddddddd");
  }

  whatsappShare() {
    this.socialSharing.shareViaWhatsApp(this.shareMessage,this.shareImage,this.shareLink).then(() => {
      console.log("shareViaWhatsApp: Success");
    }).catch(() => {
      console.error("shareViaWhatsApp: failed");
    });
  }
  facebookShare() {
    this.socialSharing.shareViaFacebook( this.shareMessage,this.shareImage,this.shareLink).then(() => {
      console.log("shareViaFacebook: Success");
    }).catch(() => {
      console.error("shareViaFacebook: failed");
    });
  }
  instaShare() {
    this.socialSharing.shareViaInstagram( this.instaShareMessage, this.shareImage).then(() => {
      console.log("shareViaInstagram: Success");
    }).catch(() => {
      console.error("shareViaInstagram: failed");
    });
  }
  twitterShare() {
    this.socialSharing.shareViaTwitter( this.shareMessage,this.shareImage,this.shareLink).then(() => {
      console.log("shareViaTwitter: Success");
    }).catch(() => {
      console.error("shareViaTwitter: failed");
    });
  }

}