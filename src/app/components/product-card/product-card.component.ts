import { Component, Input, OnInit } from '@angular/core';
import { ProductHuntPost } from '../../domain/product-hunt-post.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input()
  post?: ProductHuntPost;

  ngOnInit(): void {
    console.log(this.post?.name);
  }
}
