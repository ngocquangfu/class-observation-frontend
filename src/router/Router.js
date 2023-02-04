import React from 'react';
import HomePage from '../views/pages/home/Home';
import Error404 from '../views/pages/error/error404'
import Login from '../views/pages/authetication/login/Login';
import Admin from '../views/pages/authetication/admin/index/Admin';
import Lecture from '../views/pages/authetication/lecture/LectureContainer';
import LectureDetail from '../views/pages/authetication/lecture/LectureDetailContainer';
import HeadContainer from '../views/pages/authetication/headSubject/PlanContainer';
import TrainContainer from '../views/pages/authetication/training/TrainingContainer';
import AssessmentPlan from '../views/pages/authetication/headSubject/AssessmentPlan';
import LectureResult from '../views/pages/authetication/lecture/LectureResult';
import LectureResultContainer from '../views/pages/authetication/lecture/LectureResultContainer';



export const ROUTES = {
    HOME: ``,
    LOGIN: `login`,
    ADMIN: `admin`,
    HEADOFSECTIONPLAN: `head-plan`,
    PLAN_DETAIL: `head-plan/:Id`,
    LECTURE: `lecture`,
    LECTURE_DETAIL: `lecture/:Id`,
    LECTURE_RESULT: `lecture-result`,
    LECTURE_RESULT_DETAIL: `lecture-result/:Id`,
    TRAINING: `train`,
}


export const public_route = [
    {
        path: `/${ROUTES.HOME}`,
        Com: HomePage,
        role: [1, 2, 3, 4 ,5]
    },
    {
        path: `/${ROUTES.LOGIN}`,
        Com: Login,
        role: [1, 2, 3, 4 ,5]
    },
    {
        path: `/${ROUTES.ADMIN}`,
        Com: Admin,
        role: [1]
    },
    {
        path: `/*`,
        Com: Error404,
        role: [1, 2, 3, 4 ,5]
    },
    {
        path: `/${ROUTES.HEADOFSECTIONPLAN}`,
        Com: HeadContainer,
        role: [2]
    },
    {
        path: `/${ROUTES.PLAN_DETAIL}`,
        Com: AssessmentPlan,
        role: [2]
    },
    {
        path: `/${ROUTES.LECTURE}`,
        Com: Lecture,
        role: [2,4]
    },
    {
        path: `/${ROUTES.LECTURE_RESULT}`,
        Com: LectureResultContainer,
        role: [2,4]
    },
    {
        path: `/${ROUTES.LECTURE_RESULT_DETAIL}`,
        Com: LectureResult,
        role: [2,4]
    },
    {
        path: `/${ROUTES.LECTURE_DETAIL}`,
        Com: LectureDetail,
        role: [2,4]
    },
    {
        path: `/${ROUTES.TRAINING}`,
        Com: TrainContainer,
        role: [3,5]
    }

];