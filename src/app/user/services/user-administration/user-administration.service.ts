import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../shared/models/user-model';
import {ActionResultResponse} from "../../../shared/models/action-result-response-view-model";
import {UserPaginationViewmodel} from "../../../shared/models/user-pagination-viewmodel";


@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://dummyjson.com/users";

  //sortiranje
 /* getUsers(sortField?: string, sortOrder?: string): Observable<User[]> {
    let params = new HttpParams();

    // Check if sortField and sortOrder are provided, otherwise use default sorting
    if (sortField && sortOrder) {
      params = params.set('sortField', sortField).set('sortOrder', sortOrder);
    } else {
      // Set default sorting options
      params = params.set('sortField', 'firstName').set('sortOrder', 'asc');
    }

    return this.http.get<User[]>(`${this.apiUrl}/users`, { params });
  }*/

  getUsers(page: number, limit: number, searchTerm?: string): Observable<UserPaginationViewmodel<User[]>> {
    let params = new HttpParams()
      .set('skip', page.toString())
      .set('limit', limit.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    return this.http.get<UserPaginationViewmodel<User[]>>(`${this.apiUrl}`, { params });
  }

  addUser(user: User): Observable<ActionResultResponse<string>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<ActionResultResponse<string>>(`${this.apiUrl}/add`, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<ActionResultResponse<string>> {
    return this.http
      .delete<ActionResultResponse<string>>(`${this.apiUrl}${userId}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<ActionResultResponse<string>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<ActionResultResponse<string>>(`${this.apiUrl}${user.id}`, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
