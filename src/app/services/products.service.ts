import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, ObservableInput, of } from "rxjs";
import { ProductHuntPost } from "../domain/product-hunt-post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) {}

  retrievePostsByDay(day?: string): Observable<ProductHuntPost[]> {
    const options = day ? { params: new HttpParams().set('day', day) } : {};

    return this.httpClient.get<ProductHuntPost[]>(`/api/v1/posts`, options);
  }

}
