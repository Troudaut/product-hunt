import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { ProductHuntPost } from "../domain/product-hunt-post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) {}

  retrievePostsByDay(day?: string): Observable<ProductHuntPost[]> {
    const params = new HttpParams();
    if (day) {
      params.append('day', day);
    }
    return this.httpClient.get<ProductHuntPost[]>(`/api/v1/posts`, {
      params
    });
  }

}
