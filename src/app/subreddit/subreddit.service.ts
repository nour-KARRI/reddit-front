import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-response';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../auth/login/login.reponse.payload';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }

getAllSubreddits(): Observable<Array<SubredditModel>>{
  return this.http.get<Array<SubredditModel>>("http://localhost:8081/api/subreddit");
}

createSubreddit(subredditModel: SubredditModel): Observable<any>{
  /* const header = new HttpHeaders().set('Authorization', this.localStorage.retrieve("authenticationToken"));
    const headers = { headers: header }; */
  return this.http.post<LoginResponse>("http://localhost:8081/api/subreddit", subredditModel)
}
}
