import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AdminService } from '../../services/admin.service';
import { SharingDataService } from 'src/app/sharing-services/sharing-data.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit{
  token: any;
  users: User[] = [];
  currentUser: User = {
    user_id: 0,
    name: '',
    last_name: '',
    birthdate: '',
    document_type: '',
    document_number: 0,
    phone_number: '',
    email: '',
    academy_level: '',
    profession: '',
    rol: 0,
  };

  constructor(private adminService: AdminService, private sharingService: SharingDataService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        for (let i = 0; i < response.info.length; i++) {
          this.users.push(response.info[i])
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
    console.log("usuarios: ", this.users)
  }
}
