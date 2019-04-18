import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { UserInfoValidator } from './validator/UserInfoValidator';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {
  @Input() user: User;
  @Input() isLoggedInUser: boolean;
  @Output() refreshData = new EventEmitter();

  private validator: UserInfoValidator;

  editUserForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    biography: new FormControl(''),
    location: new FormControl(''),
    website: new FormControl(''),
  });

  constructor(private modalService: NgbModal, private toastr: ToastrService, private userService: UserService) {
    this.validator = new UserInfoValidator();
  }

  ngOnInit() {
    
  }

  openEditModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateEditedUser(modal) {
    if (this.validator.validateUserInfo(this.editUserForm.value)) {
      this.userService.updateUser(this.user.id, this.editUserForm.value).then(res => {
        this.user = res;
        this.refreshData.emit(this.user);
        modal.close();
        this.toastr.success("Your profile has been successfully updated!")
      }).catch(() => {
        this.toastr.error("Something went wrong while updating your info.");
      });
    }
  }

  checkUsernameAvailability() {
    if (this.editUserForm.get('username').value && this.editUserForm.get('username').valid) {
      this.userService.getUserWithUsername(this.editUserForm.get('username').value).then(res => {
        if (!res) {
          this.toastr.success("This username is available!");
        } else {
          this.toastr.warning("This username is unavailable.");
        }
      }).catch(() => {
        this.toastr.error("Something went wrong while checking the username availability. Please try again later.");
      })
    }
  }
}
