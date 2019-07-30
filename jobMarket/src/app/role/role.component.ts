import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  // tabulated
  roleId: number
  category: String
  roleName: String

  // calculated
  rankNow: number
  medSalaryNow: number
  
  constructor() { }

  ngOnInit() {
  }

}
