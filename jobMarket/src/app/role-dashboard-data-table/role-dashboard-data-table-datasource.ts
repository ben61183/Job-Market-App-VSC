import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { RoleRank } from '../role-rank';

// TODO: Replace this with your own data model type
export interface RoleDashboardDataTableItem {
  roleName: string;
  roleId: number;
  category: string; 
  }


// TODO: replace this with real data from your application
const EXAMPLE_DATA: RoleDashboardDataTableItem[] = [
  {roleId: 1, roleName: 'C#', category: "Programming Language"},
  {roleId: 2, roleName: 'Java', category: "Programming Language"},
  {roleId: 3, roleName: 'JavaScript', category: "Programming Language"},
  {roleId: 4, roleName: 'PHP', category: "Programming Language"},
  {roleId: 5, roleName: 'Web Developer', category: "Job Title"},
  {roleId: 6, roleName: 'Full Stack', category: "Job Title"},
  {roleId: 7, roleName: 'SQL', category: "Programming Language"}
];



/**
 * Data source for the RoleDashboardDataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoleDashboardDataTableDataSource extends DataSource<RoleDashboardDataTableItem> {
  data: RoleDashboardDataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  allRoles: Role[];

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RoleDashboardDataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RoleDashboardDataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RoleDashboardDataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'roleName': return compare(a.roleName, b.roleName, isAsc);
        case 'category': return compare(a.category, b.category , isAsc);
        case 'id': return compare(+a.roleId, +b.roleId, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
