import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
    console.log('post list:', this.posts$);

  }

  onDelete(event: Event, id: any) {
    event.preventDefault();
    if (confirm("Are you sure to delete?")) {
      this.postService.delete(id);
    }
  }
}
