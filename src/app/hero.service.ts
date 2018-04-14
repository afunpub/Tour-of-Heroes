import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES} from './mock-heroes';

import {Observable} from 'rxjs/observable';
import {of} from 'rxjs/observable/of'; // 為何兩個O的大小寫不一樣?

import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  // private heroesUrl = 'https://angular2test-75d92.firebaseio.com/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService:' + message);
  }
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('英雄列表匯入完成');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
    );
  }
  getHeroe(id: number): Observable<Hero> {
    this.messageService.add(`英雄匯入完成 id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
          tap(_ => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }
    /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
