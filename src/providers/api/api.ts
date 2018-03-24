import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private API_URL: string = 'http://tekraze.com/wp-json/wp/v2/';
  public Categories: any = [];

  constructor(public http: HttpClient) {
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

}
