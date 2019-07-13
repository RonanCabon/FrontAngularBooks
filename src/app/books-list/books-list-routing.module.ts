import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './books-list.component';
import { BookReadComponent } from './book-read/book-read.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookCreateComponent } from './book-create/book-create.component';

const routes: Routes = [
  {
    path: '', component: BooksListComponent
  },
  {
    path: 'books-list/book-read/:id', component: BookReadComponent
  },
  {
    path: 'books-list/book-update/:id', component: BookUpdateComponent
  },
  {
    path: 'books-list/book-create', component: BookCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksListRoutingModule { }
