import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AdsServiceProvider } from '../../providers/ads-service/ads-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StripHtmlProvider } from '../../providers/strip-html/strip-html';

import { DomSanitizer} from '@angular/platform-browser';
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
  vukkelCommentsUrl: string;
  vukkelEmoteUrl: string;
  vukkelApiKey: string;
  vukkelVariable: any;

  public isLoading:boolean = false;
  constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public api:ApiProvider,
        public adsService: AdsServiceProvider,
        private socialSharing: SocialSharing,
        private stripHtml: StripHtmlProvider,
        public sanatizer: DomSanitizer,
        public elRef: ElementRef,
        public renderer: Renderer2
      ) {
   this.post = navParams.get('post');
   this.shareImage = this.post._embedded['wp:featuredmedia'][0].source_url;
   this.shareLink = this.post.link;
   this.shareMessage = this.stripHtml.transform(this.post.excerpt.rendered);
   this.instaShareMessageHtml = this.post.excerpt.rendered = " Check here :" + this.post.link;
   this.instaShareMessage = this.instaShareMessageHtml;
   this.vukkelApiKey = 'fefbadaf-276f-4f72-8e73-e1a2acb6e966';
   this.vukkelCommentsUrl = `https://cdn.vuukle.com/amp.html?apiKey=${this.vukkelApiKey}&host=tekraze.com&id=${this.post.id}&img=${this.shareImage}&title=${this.post.title.rendered}&url=${this.post.link}`;
   this.vukkelEmoteUrl = `https://cdn.vuukle.com/widgets/emotes.html?apiKey=${this.vukkelApiKey}&host=tekraze.com&articleId=${this.post.id}&img=${this.shareImage}&title=${this.post.title.rendered}&url=${this.post.link}`;
   this.convertHtmlToString();
  }

  vuukleCommentUrl(){
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.vukkelCommentsUrl);
  }

  vuukleEmoteUrl(){
    return this.sanatizer.bypassSecurityTrustResourceUrl(this.vukkelEmoteUrl);
  }

  convertHtmlToString(){
    let parser = new DOMParser ();
    parser.parseFromString(this.shareMessage,'text/html');
  }

  ionViewDidLoad() {
    this.morePagesAvailable = true;
    this.getrelated();
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

  openDetail(item: any){
    this.adsService.incrementCounter();
    this.navCtrl.push(DetailPage, {post: item});
  }

  whatsappShare() {
    this.adsService.incrementCounter();
    this.socialSharing.shareViaWhatsApp(this.shareMessage,this.shareImage,this.shareLink).then(() => {
    }).catch(() => {
    });
  }
  facebookShare() {
    this.adsService.incrementCounter();
    this.socialSharing.shareViaFacebook( this.shareMessage,this.shareImage,this.shareLink).then(() => {
      }).catch(() => {
    });
  }
  instaShare() {
    this.adsService.incrementCounter();
    this.socialSharing.shareViaInstagram( this.instaShareMessage, this.shareImage).then(() => {
    }).catch(() => {
    });
  }
  twitterShare() {
    this.adsService.incrementCounter();
    this.socialSharing.shareViaTwitter( this.shareMessage,this.shareImage,this.shareLink).then(() => {
    }).catch(() => {
    });
  }

  share(message,title,image,link) {
    this.adsService.incrementCounter();
    this.socialSharing.share(message, title,image, link).then(() => {
    }).catch(() => {
    });
  }

}