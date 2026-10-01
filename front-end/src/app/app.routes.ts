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
            }
        ]
    },

    {
        path: "",
        component: Login,
        pathMatch: "full"
    },
];
