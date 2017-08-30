import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers:[BlogService]
})
export class BlogComponent implements OnInit {
  blogs = [];
  constructor(private blogService: BlogService) { }

  async ngOnInit() {
    this.blogs = await this.blogService.getBlog();
  }

}
