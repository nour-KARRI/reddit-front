import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../auth/login/login.reponse.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http: HttpClient) { }

  getAllPostsByUser(name: string):Observable<any> {
      return this.http.get('http://localhost:8081/api/post/by-user/'+name);
    }

  getAllPosts(): Observable<Array<PostModel>>{
    return this.http.get<Array<PostModel>>('http://localhost:8081/api/post/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any>{
    return this.http.post<LoginResponse>("http://localhost:8081/api/post", postPayload);
  }

  getPost(id: number):Observable<PostModel>{
    return this.http.get<PostModel>("http://localhost:8081/api/post/"+id);
  }
}
