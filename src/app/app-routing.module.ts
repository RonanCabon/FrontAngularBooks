import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListModule } from './books-list/books-list.module';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',  loadChildren: './books-list/books-list.module#BooksListModule'
  },
  {
    path: '**', component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
