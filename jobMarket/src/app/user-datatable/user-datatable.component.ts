import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserDatatableDataSource, UserDatatableItem } from './user-datatable-datasource';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-datatable',
  templateUrl: './user-datatable.component.html',
  styleUrls: ['./user-datatable.component.css']
})
export class UserDatatableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<User>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'email'];
  
  allUsers: User[]
  user: User
  
  constructor(private userSvc: UserService) {

  }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.userSvc.loadAllUsersFromService().subscribe(
      response => {
        this.allUsers = response
        this.dataSource.data = response
        console.log(response)
      }
    )
  }
  

}
