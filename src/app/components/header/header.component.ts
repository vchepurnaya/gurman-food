import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {EntryComponent} from "../entry/entry.component";
import {RegisrationComponent} from "../regisration/regisration.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  openEntryForm() {
    this.dialog.open(EntryComponent, {panelClass: 'myapp-style-dialog'});
  }
  openRegistrationForm() {
    this.dialog.open(RegisrationComponent, {panelClass: 'myapp-style-dialog'});
  }
}
