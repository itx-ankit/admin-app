import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  standalone: true,
})
export class ErrorPageComponent implements OnInit {
  image = '/src/assets/404.png';

  constructor() {}

  ngOnInit(): void {}
}
