import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/users/user-list/user-list')
                        .then(m => m.UserList)
            },
            {
                path: "users/add",
                loadComponent: () =>
                    import('./pages/users/user-form/user-form')
                        .then(m => m.UserForm)
            },
            {
                path:"users/edit/:id",
                loadComponent:()=>
                import('./pages/users/user-form/user-form')
                .then(m=>m.UserForm)
            },
            {
                path: 'users/:id',
                loadComponent: () =>
                    import('./pages/users/user-details/user-details')
                    .then(m => m.UserDetails)
            },
            {
                path: 'projects',
                loadComponent: () =>
                    import('./pages/projects/project-list/project-list')
                        .then(m => m.ProjectList)
            },
            {
                path: 'projects/add',
                loadComponent: () =>
                    import('./pages/projects/project-form/project-form')
                        .then(m => m.ProjectForm)
            },
            {
                path: 'projects/edit/:id',
                loadComponent: () =>
                    import('./pages/projects/project-form/project-form')
                        .then(m => m.ProjectForm)
            },
            {
                path: 'projects/:id',
                loadComponent: () =>
                    import('./pages/projects/project-details/project-details')
                        .then(m => m.ProjectDetails)
            },
            {
                path: 'projects/edit/:id',
                loadComponent: () =>
                import('./pages/projects/project-form/project-form')
                .then(m => m.ProjectForm)
            }


        ]
    },

    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
];
