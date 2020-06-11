import { Component, OnInit } from '@angular/core';
import { fadeIn, fadeInAnimation} from '../_animations/index'

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
  animations: [fadeInAnimation]
})
export class ListProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
