export class Article {
  public article_id:number
  public title: string;
  public category: string;

  constructor(article_id: number,title: string,category: string) {
    this.article_id=article_id;
    this.title=title;
    this.category=category;
  }
}
