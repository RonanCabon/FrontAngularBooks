import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list.component';
import { BooksListRoutingModule } from './books-list-routing.module';
import { MaterialModule } from '../material.module';
import { BookReadComponent } from './book-read/book-read.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksListComponent,
    BookReadComponent,
    BookCreateComponent,
    BookUpdateComponent
  ],
  imports: [
    CommonModule,
    BooksListRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class BooksListModule { }
