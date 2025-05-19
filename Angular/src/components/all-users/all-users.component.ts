
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
// import { User } from '../../models/user.model';
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  imports: [UserCardComponent,CommonModule]
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }
  // deleteUser(userId: number): void {
  //   this.userService.deleteUser(userId).subscribe(() => {
  //     this.users = this.users.filter(user => user.id !== userId);
  //   });
  // }
}