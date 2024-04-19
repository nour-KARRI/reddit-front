import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VotePayload } from './vote/create-vote.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService){}
  
  vote(votePayload: VotePayload){
    return this.http.post('http://localhost:8081/api/vote', votePayload, { responseType: 'text' });
  }
}
