import { Injectable } from '@angular/core'; 
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Users provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Users {
  
  // every import class can add on this constructor for declaration
  constructor(public http: Http) {
    console.log('Hello Users Provider');
  }

  /**
  * Get Users
  * Getting all Users information base on options parameter
  * @param options object ex: {username: ''}
  * @output data object
  **/

  getUsers(options) {
  	return new Promise(resolve => {
  		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');

  		this.http.post('http://localhost:8080/api/users', JSON.stringify(options), {headers:headers})
  			.map(res => res.json())
  			.subscribe(data => {
  				resolve(data);
  			})
  	});
  }

  /**
  * Add User
  * Adding a User information
  * @param options object ex: {username: '', score: ''}
  * @output data object
  **/

  addUser(options) {
  	return new Promise(resolve => {
  		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');

  		this.http.post('http://localhost:8080/api/users/add', JSON.stringify(options), {headers:headers})
  			.map(res => res.json())
  			.subscribe(data => {
  				resolve(data);
  			})
  	});
  }

  /**
  * Get User
  * Getting a single User information base on params
  * @param options object ex: {username: '', score: ''}
  * @output data object
  **/

  getUser(options) {
  	return new Promise(resolve => {
  		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');

  		this.http.post('http://localhost:8080/api/users', JSON.stringify(options), {headers:headers})
  			.map(res => res.json())
  			.subscribe(data => {
          //console.log(data);
          if(Object.keys(data).length > 0) {
            resolve(data[0]);
          } else {
            resolve(data)
          }
  				
  			})
  	});
  }

  /**
  * Detail User
  * Getting a single User information base on id
  * @param id string
  * @output data object
  **/

  detailUser(id) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/users/detail', id, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        })
    });
  }

  /**
  * Update User
  * Updating a User information
  * @param options object ex: {score: ''}
  * @output data object
  **/

  updateUser(options) {
    console.log(options);
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8080/api/users/update', JSON.stringify(options), {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        })
    });
  }
}
