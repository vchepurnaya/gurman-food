import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntryComponent } from 'app/components/entry/entry.component';
import { RegisrationComponent } from 'app/components/regisration/regisration.component';
import { UserService } from '@app/services';
import { takeUntil } from 'rxjs/operators';
import { RegDefinition } from '@app/shared/interfaces';
import { ApiService } from '@app/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
private destroy$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

      this.apiService.getUser(userEmail)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (success: RegDefinition) => {
            console.log(success)
          },
          error => {
            console.log(error)
          }
        )
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
