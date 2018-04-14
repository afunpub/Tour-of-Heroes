import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // 用`反引號可以把h1等網頁符號各自放一行方便閱讀，如果用單引號''就不能斷行，要連在一起。
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
