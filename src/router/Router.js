import React from 'react';
import Home from '../views/pages/home/Home';
import Error404 from '../views/pages/error/error404'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from '../views/pages/authetication/login/Login';
import Admin from '../views/pages/authetication/admin/index/Admin';
import Lecture from '../views/pages/authetication/lecture/LectureContainer';
import LectureDetail from '../views/pages/authetication/lecture/LectureDetailContainer';
import HeadContainer from '../views/pages/authetication/headSubject/PlanContainer';
import HeadModalPlan from '../views/pages/authetication/headSubject/ModalPlanContainer';
import HeadPlanDetail from '../views/pages/authetication/headSubject/PlanDetailContainer';
import TrainContainer from '../views/pages/authetication/training/TrainingContainer';



export const ROUTES = {
    HOME : '',
    LOGIN : 'login',
    ADMIN : 'admin',
    HEADOFSECTIONPLAN: 'head-plan',
    PLAN_DETAIL: `head-plan/:Id`,
    LECTURE: 'lecture',
    LECTURE_DETAIL: 'lecture/:Id',
    TRAINING:'train',
}


export const public_route = [
    {
        path: `/${ROUTES.HOME}`,
        Com: Home,
        role : [1 ,2 ,3]
    },
    {
        path: `/${ROUTES.LOGIN}`,
        Com: Login,
        role : [1 ,2 ,3]
    },
    {
        path : `/${ROUTES.ADMIN}`,
        Com : Admin,
        role : [1]
    },
    {
        path: `*`,
        Com:Error404,
        role : [1 ,2 ,3]
    },
    {
        path: `/${ROUTES.HEADOFSECTIONPLAN}`,
        Com: HeadContainer,
        role : [2]
    },
    {
        path: `/${ROUTES.PLAN_DETAIL}`,
        Com: HeadPlanDetail,
        role : [2]
    },
    {
        path: `/${ROUTES.LECTURE}`,
        Com: Lecture,
        role : [2,3]
    },
    {
        path: `/${ROUTES.LECTURE_DETAIL}`,
        Com: LectureDetail,
        role : [3]
    },
    {
        path: `/${ROUTES.TRAINING}`,
        Com: TrainContainer,
        role : [3]
    }

];