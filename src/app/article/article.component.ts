import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ArticleService} from "../article.service";
import {Article} from "./article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  //Component properties
  allArticles: Article[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  articleForm = new FormGroup({
    // article_id: new FormControl(''),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
   constructor(private articleService: ArticleService) {
  }
  ngOnInit(): void {
   this.getAllArticles();
  }

  getAllArticles   (){
     this.articleService.getAllArticles().subscribe(data=>this.allArticles=data,errorCode=>this.statusCode=errorCode);
  }

  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
    }

    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      //Generate article id then create article
      this.articleService.getAllArticles()
        .subscribe(articles => {
          //Create article
          this.articleService.createArticle(article)
            .subscribe(successCode => {
               this.statusCode = 201;
                this.getAllArticles();
                this.backToCreateArticle();
              },
              errorCode => this.statusCode = errorCode
            );
        });
     }
    else {
      //Handle update article
      article.article_id = this.articleIdToUpdate;
      this.articleService.updateArticle(article)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllArticles();
            this.backToCreateArticle();
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  //load article by id
  fetchArticle(article_id: string) {
     //debugger
    this.preProcessConfigurations();
    this.articleService.getArticleById(article_id).subscribe(data => {
          this.articleIdToUpdate = article_id;
          this.articleForm.setValue({title:data.title,category:data.category});
          //this.articleForm.setValue(data=>this.allArticles=data);
          this.processValidation = true;
          this.requestProcessing = false;
        },errorCode =>  this.statusCode = errorCode);
  }

  //Delete
  deleteArticle(article_id:string){
    this.preProcessConfigurations();
    this.articleService.deleteArticleById(article_id).subscribe(successCode=>{
      this.statusCode=204;

    },errorCode=>this.statusCode=errorCode);
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }
}
