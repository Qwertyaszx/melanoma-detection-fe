import { Component, OnInit } from '@angular/core';
import { LayoutControlComponent } from '../layout-control.component';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {

  constructor(private layoutControlComponent: LayoutControlComponent) { }

  ngOnInit(): void {
  }
}
