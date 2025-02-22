import {Component, OnInit} from '@angular/core';
import {getCookie} from '../get-cookie';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit {
  className: string = "";
  assignmentName: string = "";
  username: string = "";

  ngOnInit() {
    this.username = getCookie('username');
    this.assignmentName = getCookie('assignment');
    this.className = getCookie('class');
  }
}
