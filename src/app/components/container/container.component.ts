import { Component } from '@angular/core';
import { catchError, map, merge, Observable, of, Subject, switchMap, tap, timer } from 'rxjs';
import { ProductHuntPost } from '../../domain/product-hunt-post.model';
import { PopupService } from '../../services/common/popup.service';
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
    private postsService: PostsService,
    private popupService: PopupService,
  ) { 
    this.posts$ = merge(
      timer(0).pipe(
        map(() => undefined)
      ),
      this.dateSubject.asObservable()
    ).pipe(
      switchMap(day => this.postsService.retrievePostsByDay(day).pipe(
        catchError(() => {
          this.popupService.showError();
          return of([]);
        })
      )
      ),
    );
  }

  changeDateEvent(day: string): void {
    this.dateSubject.next(day);
  }

}
