import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksListService } from '../books-list.service';
import { BooksModel } from 'src/app/models/books-model';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  private bookData$: Observable<BooksModel>;
  private book: BooksModel;
  public httpErrorResponse: HttpErrorResponse;
  public errorMessage: string;
  private name: string;

  private uploadImageFile$: Observable<any>;

  private lastImageUploaded;

  constructor(
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.bookData$ = this.booksListService.getBookById(id)
      .pipe(catchError(err => {
        this.httpErrorResponse = err;
        this.errorMessage = this.httpErrorResponse.message;
        return of(err);
      })
      );

      this.bookData$.subscribe(data => this.book = data);

    });
  }

  onFormSubmit(form) {

    this.book.image = this.lastImageUploaded.data.uploadedImage;

    this.bookData$ = this.booksListService.updateBook(this.book._id, this.book)
      .pipe(catchError(err => {
        this.httpErrorResponse = err;
        this.errorMessage = this.httpErrorResponse.message;
        return of(err);
      })
      );

    this.bookData$.subscribe(data => this.book = data);

    this.router.navigate(['/books-list/book-read', this.book._id], {queryParams: {message: `book ${this.book.name} updated !`}});

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
        data => {
          this.lastImageUploaded = data;
        },
        error => console.log('Error from uploadImageFile Observable'));
    }

    // !!! Il faut que le nom dans le formulaire (partie upload)
    // et le nom que l'on append à formData
    // coïncide avec le nom associé dans multer côté serveur => bookImage

  }

}

