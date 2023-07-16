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
