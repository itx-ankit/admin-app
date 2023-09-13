import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './state/user.reducer';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./core/login/login.component')).LoginComponent,
  },
  {
    path: 'user-list',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./core/table/table.module')).TableModule,
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./core/login/login.component')).LoginComponent,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ user: UserReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
