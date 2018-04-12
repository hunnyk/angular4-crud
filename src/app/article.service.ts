import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Article} from "./article/article.model";


@Injectable()
export class ArticleService {

  //articleURL="http://localhost/phpapi/articles/article_api.php";
  constructor(private http:HttpClient) {
  }

  getAllArticles():Observable<Article[]>{
    return this.http.get("http://localhost/phpapi/view_article.php").catch(this.handleError);
  }

  createArticle(article:Article): Observable<number> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post("http://localhost/phpapi/articleapi.php", article, {headers}).catch(this.handleError);
  }

  deleteArticleById(article_id:string):Observable<number>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.delete("http://localhost/phpapi/delete_article.php?action=delete&id="+article_id,{headers}).catch(this.handleError);
  }

  getArticleById(article_id:string):Observable<Article>{
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get("http://localhost/phpapi/getid_article.php?"+article_id,{headers}).catch(this.handleError);
  }

  //Update article
  updateArticle(article: Article):Observable<number> {
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put("http://localhost/phpapi/update_article.php?id="+ article.article_id, {headers}).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
