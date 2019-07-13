import { Component, OnInit } from '@angular/core';
import { BooksListService } from './books-list.service';
import { BooksModel } from '../models/books-model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  private booksData$: Observable<BooksModel[]>;
  private booksArray: BooksModel[];
  public httpErrorResponse: HttpErrorResponse;
  public errorMessage: string;
  public snackBarMessage: string;

  constructor(
    private booksListService: BooksListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.booksData$ = this.booksListService.getBooks()
    .pipe(catchError(err => {
      this.httpErrorResponse = err;
      this.errorMessage = this.httpErrorResponse.message;
      return of([]);
    }));

    this.booksData$.subscribe(data => this.booksArray = data);

    this.activatedRoute.queryParams
    .subscribe(params => this.snackBarMessage = params.message);

  }

  createBook() {
    this.router.navigate(['/books-list/book-create']);
  }

}
