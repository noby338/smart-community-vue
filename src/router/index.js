import VueRouter from 'vue-router'

import Index from '../pages/Index'
import Home from '../pages/Home'
import Emp from '../pages/Emp'
import EmpAdd from '../pages/EmpAdd'
import Login from '../pages/Login'
import TableExam from '../pages/example/TableExam'
import FormExam from '../pages/example/FormExam'
import Role from '../pages/Role';
import Parking from '../pages/Parking';


export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/index',
            component: Index,
            children: [{
                path: '/home',
                component: Home,
            },
            {
                path: '/emp',
                component: Emp,
            },
            {
                path: '/empAdd',
                component: EmpAdd,
            },
            {
                path: '/tableExam',
                component: TableExam,
            }
                ,
            {
                path: '/formExam',
                component: FormExam,
            },
            {
                path: '/Role',
                component: Role,
            },
            {
                path: '/parking',
                component: Parking,
            }
                //新添的路由放在这里
            ]
        },



    ]
})