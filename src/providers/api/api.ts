import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map'
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private API_URL: string = 'https://tekraze.com/wp-json/wp/v2/';
  public Categories: any = [];

  constructor(public http: HttpClient, public httpNew: Http) {
    console.log('Hello ApiProvider Provider');
  }

  get (query:string =''){
        return this.http.get(this.API_URL + query);
  }

  getCategories(){
    this.get('categories').subscribe( (data) =>{
      this.Categories = data;
    });
  }

  getCategoryName(category_id:number){
    let category_name:string =  "";

    this.Categories.forEach(element => {
      if (element.id == category_id){
        category_name = element.name;
      }
    });
    return category_name;
  }

  // Create comments
  /*
  createComment(postId, user, comment){
    let header: Headers = new Headers();

    return this.http.post(this.API_URL + "comments" {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: header })
    .map(res => res.json());
  }
*/
  ////////get the comments //////
 getComments(postId:number, page:number = 1){
  return this.httpNew.get(this.API_URL + "comments?post=" + postId + '&page=' + page)
    .map( res => res.json());
  }

}
