import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';



const addRoutes: Routes = [
    { path: '' ,component: HomeComponent },
    { path: 'users' ,component: UsersComponent , children:[
        { path: ':id/:name' ,component: UsersComponent }
    ]},
    { path: 'servers' , canActivateChild: [AuthGuard],  component: ServersComponent ,children:[
        { path: ':id' ,component: ServerComponent ,resolve: {serversss: ServerResolver}},
        { path: ':id/edit' ,component: EditServerComponent ,canDeactivate: [CanDeactivateGuard]
    }
    ]},
    // {path: 'not-found' ,component: PageNotFoundComponent},
    {path: 'not-found' ,component: ErrorPageComponent, data: {message: "Page not found!"} },
    {path: '**' ,redirectTo: '/not-found'},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(addRoutes)
  ],
  providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
