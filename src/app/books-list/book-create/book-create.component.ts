import { Component, OnInit, ElementRef } from '@angular/core';
import { BooksModel } from 'src/app/models/books-model';
import { BooksListService } from '../books-list.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  private book: BooksModel;
  private bookData$: Observable<BooksModel>;
  public httpErrorResponse: HttpErrorResponse;
  public errorMessage: string;
  private uploadImageFile$: Observable<any>;

  constructor(
    private booksListService: BooksListService,
    private router: Router,
    private el: ElementRef) { }

  ngOnInit() {
    this.book = {
      name: '',
      author: '',
      category: '',
      image: '',
      description: ''
    };
  }

  onFormSubmit(form) {

    // Récupération saisie formulaire dans un objet implémentant BookModel

    /*
    this.book.name = form.name;
    this.book.author = form.author;
    this.book.category = form.category;
    this.book.image = form.image;
    this.book.description = form.description;
    */

    console.log('this.book: ', this.book);

    this.bookData$ = this.booksListService.createBook(this.book)
      .pipe(catchError(err => {
        this.httpErrorResponse = err;
        this.errorMessage = this.httpErrorResponse.message;
        return of(err);
      })
      );

    this.bookData$.subscribe(data => this.book = data);

    this.router.navigate(['/'], {queryParams: {message: `book ${this.book.name} created !`}});

  }

  uploadImageFile() {

    // récupération de l'input file (image) du formulaire
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#bookImage');

    const fileCount = inputEl.files.length;

    if (fileCount > 0) {
      const formData = new FormData();
      formData.append('bookImage', inputEl.files.item(0));
      this.uploadImageFile$ = this.booksListService.uploadImageFile(formData)
      .pipe(catchError(err => {
        this.httpErrorResponse = err;
        this.errorMessage = this.httpErrorResponse.message;
        return of(err);
      })
      );
      this.uploadImageFile$.subscribe(
        data => console.log('Uploading image'),
        error => console.log('Error from uploadImageFile Observable'));
    }

    // !!! Il faut que le nom dans le formulaire (partie upload)
    // et le nom que l'on append à formData
    // coïncide avec le nom associé dans multer côté serveur => bookImage

  }

}
