import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntryComponent } from 'app/components/entry/entry.component';
import { RegisrationComponent } from 'app/components/regisration/regisration.component';
import { UserService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogOffButton(): void {
    this.userService.usersData$.next(null)
    localStorage.removeItem('userEmail')
}
  openEntryForm() {
    this.dialog.open(EntryComponent, {panelClass: 'myapp-style-dialog'});
  }
  openRegistrationForm() {
    this.dialog.open(RegisrationComponent, {panelClass: 'myapp-style-dialog'});
  }
}
