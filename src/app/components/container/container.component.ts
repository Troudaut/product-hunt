import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductHuntPost } from '../../domain/product-hunt-post.model';
import { PostsService } from '../../services/products.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  posts$: Observable<ProductHuntPost[]>;

  constructor(
    private postsService: PostsService
  ) { 
    this.posts$ = this.postsService.retrievePostsByDay();
  }

}
