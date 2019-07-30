import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { RoleComponent } from './role/role.component';
import { VacancyComponent } from './vacancy/vacancy.component';


const routes: Routes = [
  {path: "role-dashboard", component: RoleDashboardComponent},
  {path: "role", component: RoleComponent},
  {path: "vacancy-dashboard", component: VacancyComponent},
  // {path: "login", component: UserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
