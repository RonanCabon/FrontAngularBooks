import { Component, OnInit } from '@angular/core';
import { BooksListService } from './../books-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BooksModel } from 'src/app/models/books-model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.scss']
})
export class BookReadComponent implements OnInit {

  private bookData$: Observable<BooksModel>;
  private book: BooksModel;
  public httpErrorResponse: HttpErrorResponse;
  public errorMessage: string;
  private name: string;
  public snackBarMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private booksListService: BooksListService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.snackBarMessage = params.message;
      this.bookData$ = this.booksListService.getBookById(id)
      .pipe(catchError(err => {
        this.httpErrorResponse = err;
        this.errorMessage = this.httpErrorResponse.message;
        return of(err);
      })
      );

      this.bookData$.subscribe(data => this.book = data);

    });

    this.activatedRoute.queryParams
    .subscribe(params => this.snackBarMessage = params.message);

  }

  deleteBook(id: string) {

    this.bookData$ = this.booksListService.deleteBookById(id)
    .pipe(catchError(err => {
      this.httpErrorResponse = err;
      this.errorMessage = this.httpErrorResponse.message;
      return of(err);
    }),
    );

    // TRES IMPORTANT : il faut ici faire le subscribe() à l'observable
    this.bookData$.subscribe(data => this.book = data);

    this.router.navigate(['/'], {queryParams: {message: `book ${this.book.name} deleted !`}});
  }

  updateBook(id: string) {
    this.router.navigate(['/books-list/book-update', id]);
  }

}
