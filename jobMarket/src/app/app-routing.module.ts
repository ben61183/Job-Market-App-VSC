import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { RoleComponent } from './role/role.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { RoleAdminComponent} from './role-admin/role-admin.component'
import { NewListingComponent } from './new-listing/new-listing.component';
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';

const routes: Routes = [
  {path: "role-dashboard", component: RoleDashboardComponent},
  {path: "role/:roleId", component: RoleComponent},
  {path: "vacancy-dashboard", component: VacancyDashboardComponent},
  {path: "role-admin", component: RoleAdminComponent}
  // {path: "login", component: UserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

