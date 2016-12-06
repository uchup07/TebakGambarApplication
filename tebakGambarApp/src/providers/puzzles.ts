import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Puzzles provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Puzzles {
  
  // every import class can add on this constructor for declaration
  constructor(public http: Http) {
    console.log('Hello Puzzles Provider');
  }

  /**
  * Get Puzzles
  * Getting all Puzzles information base on options parameter
  * @param options object ex: {question: ''}
  * @output data object
  **/

  getPuzzles(options) {
  	return new Promise(resolve => {
  		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');

  		this.http.post('http://localhost:8080/api/puzzles', JSON.stringify(options), {headers:headers})
  			.map(res => res.json())
  			.subscribe(data => {
  				resolve(data);
  			})
  	});
  }

}
