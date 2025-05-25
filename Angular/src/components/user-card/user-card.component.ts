
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  imports: [NgClass]
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.user.id);
  }
}
