export class Book {
    constructor(
      public Titel: string,
     public isbn: number,
       public pageCount: number,
       public image: string,
       public shortDescription: string,
       public longDescription: string,
       public author: string,
       public categories: string,
       public price: number,
       public discount: number
       

    ) {}
  }
  