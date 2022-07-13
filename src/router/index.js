import VueRouter from 'vue-router'

import Index from '../pages/Index'
import Home from '../pages/Home'
import Emp from '../pages/Emp'
import EmpAdd from '../pages/EmpAdd'
import Login from '../pages/Login'
import TableExam from '../pages/example/TableExam'
import FormExam from '../pages/example/FormExam'
import House from '../pages/House.vue'
import HouseHold from '../pages/HouseHold'
import HouseHoldAdd from '../pages/HouseHoldAdd'
import Role from '../pages/Role';
import Parking from '../pages/Parking';
import Car from '../pages/Car';
import ParkingRecord from '../pages/ParkingRecord';
import Electricity from '../pages/Electricity';
import UtilPrice from '../pages/UtilPrice';



export default new VueRouter({
    routes: [{
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
                    path: '/house',
                    component: House,
                },
                {
                    path: '/houseHold',
                    component: HouseHold,
                },
                {
                    path: '/houseHoldAdd',
                    component: HouseHoldAdd,
                },
                {
                    path: '/tableExam',
                    component: TableExam,
                },
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
                },
                {
                    path: '/car',
                    component: Car,
                },
                {
                    path: '/parkingRecord',
                    component: ParkingRecord,
                },
                {
                    path: '/utilPrice',
                    component: UtilPrice,
                },
                {
                    path: '/electricity',
                    component: Electricity,
                }
                //新添的路由放在这里
            ]
        },



    ]
})