import { Component } from '@angular/core';
import { map, merge, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { ProductHuntPost } from '../../domain/product-hunt-post.model';
import { PostsService } from '../../services/products.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  posts$: Observable<ProductHuntPost[]>;
  dateSubject = new Subject<string>();

  constructor(
    private postsService: PostsService
  ) { 
    this.posts$ = merge(
      timer(0).pipe(
        map(() => undefined)
      ),
      this.dateSubject.asObservable()
    ).pipe(
      switchMap(day => this.postsService.retrievePostsByDay(day))
    );
  }

  changeDateEvent(day: string): void {
    this.dateSubject.next(day);
  }

}
