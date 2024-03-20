import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Observable, map } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService extends DefaultDataService<Post> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(options?: HttpOptions | undefined): Observable<Post[]> {
    return this.http.get(`https://authngrx-1-default-rtdb.firebaseio.com/posts.json`).pipe(map((data:any) => {
      const posts: Post[] = [];
      for (let key in data) {
        posts.push({...data[key], id:key});
      }
      return posts;
    }));
  }

  override add(post:Post): Observable<Post> {
    return this.http.post<{name:string}>(`https://authngrx-1-default-rtdb.firebaseio.com/posts.json`, post).pipe(map((data)=>{
      return {...post,id:data.name};
    }));    
  }

  override update(post: Update<Post>, options?: HttpOptions | undefined): Observable<Post> {
    return this.http.put<Post>(`https://authngrx-1-default-rtdb.firebaseio.com/${post.id}.json`, {...post.changes});
  }

  override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
    return this.http.delete(`https://authngrx-1-default-rtdb.firebaseio.com/posts/${id}.json`).pipe(
      map((data) => id),
    );
  }
}
