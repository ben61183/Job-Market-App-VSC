import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { RoleComponent } from './role/role.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    VacancyComponent,
    RoleComponent,
    RoleDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
