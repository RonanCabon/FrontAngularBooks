import { Injectable } from '@angular/core';
import { BooksModel } from '../models/books-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {

  private baseUrl = 'http://localhost:3000/api/v1/books';
  private uploadImageUrl = 'http://localhost:3000/api/v1/books/upload';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<BooksModel[]> {

    // Casting de la réponse JSON de l'API Rest en un objet typé pour récupérer
    // le tableau de books via la propriété "data" Cf. réponse de l'appel get()
    // du serveur (regarder la réponse de l'appel POSTMAN)

    // Suppression du cache navigateur pour un ré-affichage de la liste des books
    // mise à jour après une suppression, un update ou une création de book

    const httpOptions = {
      headers: new HttpHeaders({
        Pragma:  'no-cache',
        Expires: '0'
      })
    };

    return this.httpClient.get<{
      statut: string,
      data: [],
      message: string
    }>(this.baseUrl, httpOptions).pipe(
      catchError(err => {
          return throwError(err); // propagation de l'erreur
      }),
      switchMap((res) => of<BooksModel[]>(res.data) )
    );

  }

  public getBookById(id: string): Observable<BooksModel> {

    // Casting de la réponse JSON de l'API Rest en un objet typé pour récupérer
    // l'objet book via la propriété "data" Cf. réponse de l'appel get()
    // du serveur (regarder la réponse de l'appel POSTMAN)

    const httpOptions = {
      headers: new HttpHeaders({
        Pragma:  'no-cache',
        Expires: '0'
      })
    };

    return this.httpClient.get<{
      statut: string,
      data: {},
      message: string
    }>(`${this.baseUrl}/${id}`, httpOptions).pipe(
      catchError(err => {
          return throwError(err); // propagation de l'erreur
      }),
      map((res) => res.data as BooksModel));

  }

  public deleteBookById(id: string): Observable<BooksModel> {

    return this.httpClient.delete<{
      statut: string,
      data: {},
      message: string
    }>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
          return throwError(err); // propagation de l'erreur
      }),
    map((res) => res.data as BooksModel));

  }

  public createBook(book: BooksModel): Observable<BooksModel> {

    return this.httpClient.post<{
      statut: string,
      data: {},
      message: string
    }>(`${this.baseUrl}`, book).pipe(
      catchError(err => {
          return throwError(err); // propagation de l'erreur
      }),
    map((res) => res.data as BooksModel));

  }

  public uploadImageFile(formData: FormData) {
    return this.httpClient.post<{
      statut: string,
      data: {},
      message: string
    }>(`${this.uploadImageUrl}`, formData);
  }

  public updateBook(id: string, book: BooksModel): Observable<BooksModel> {

    return this.httpClient.put<{
      statut: string,
      data: {},
      message: string
    }>(`${this.baseUrl}/${id}`, book).pipe(
      catchError(err => {
          return throwError(err); // propagation de l'erreur
      }),
    map((res) => res.data as BooksModel));

  }

}
