import { Injectable } from '@angular/core';
import { CommentPayload } from './comment-payload';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>('http://localhost:8081/api/comments/by-user/' + name);
  }
  
  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>('http://localhost:8081/api/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    const header = new HttpHeaders().set('Authorization', this.localStorage.retrieve("authenticationToken"));
    const headers = { headers: header };
    return this.http.post<any>('http://localhost:8081/api/comments', commentPayload, headers);
  }
}
