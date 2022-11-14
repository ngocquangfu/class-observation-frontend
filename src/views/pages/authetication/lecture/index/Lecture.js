import React, { Component } from 'react'
import './Lecture.scss'
import NavBar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';
import { useState } from 'react';
import { apiClient } from '../../../../../api/api-client';

function Lecture() {
    const [row, selectedRow] = useState([]);
    const [data, setDataTable] = useState([]);
    const [total, setTotal] = useState(10);
    const [listObserversion, setlistObserversion] = React.useState([]);
    
    const _requestData = async () => {
        const { data } = await apiClient.get("/api/list-search-observation-plan?campusId=1&semesterId=2")
        const convertData = data.map(i => {
            return {
                value: i.id,
                departmentName: i.departmentName,
                planStatus: i.planStatus,
                createAt: i.createAt
            }
        })

    }



    return (
        <>
            <NavBar />
            <span className="toggler active" data-toggle="grid"><span className="entypo-layout"></span></span>
            <span className="toggler" data-toggle="list"><span className="entypo-list"></span></span>

            <ul className="surveys grid">
                <li className="survey-item">

                    <span className="survey-country list-only">
                        Demo
                    </span>

                    <span className="survey-name">
                        Ngữ văn Lớp 10
                    </span>

                    <span className="survey-country grid-only">
                        Điểm: 90%
                    </span>

                    <div className="pull-right">

                        <span className="survey-progress">
                            <span className="survey-progress-bg">
                                <span className="survey-progress-fg" ></span>
                            </span>

                            <span className="survey-progress-labels">
                                <span className="survey-progress-label">
                                    Đạt
                                </span>

                                <span className="survey-completes">
                                    90 / 100
                                </span>
                            </span>
                        </span>

                        <span className="survey-end-date ended">
                            20-10-2022
                        </span>

                    </div>
                </li>
                <li className="survey-item">

                    <span className="survey-country list-only">
                        Demo
                    </span>

                    <span className="survey-name">
                        Địa Lý Lớp 10
                    </span>

                    <span className="survey-country grid-only">
                        Điểm: 90%
                    </span>

                    <div className="pull-right">

                        <span className="survey-progress">
                            <span className="survey-progress-bg">
                                <span className="survey-progress-fg" ></span>
                            </span>

                            <span className="survey-progress-labels">
                                <span className="survey-progress-label">
                                    Đạt
                                </span>

                                <span className="survey-completes">
                                    90 / 100
                                </span>
                            </span>
                        </span>

                        <span className="survey-end-date ended">
                            20-10-2022
                        </span>

                    </div>
                </li>
                <li className="survey-item">

                    <span className="survey-country list-only">
                        Demo
                    </span>

                    <span className="survey-name">
                        Toán Lớp 10
                    </span>

                    <span className="survey-country grid-only">
                        Điểm: 90%
                    </span>

                    <div className="pull-right">

                        <span className="survey-progress">
                            <span className="survey-progress-bg">
                                <span className="survey-progress-fg" ></span>
                            </span>

                            <span className="survey-progress-labels">
                                <span className="survey-progress-label">
                                    Đạt
                                </span>

                                <span className="survey-completes">
                                    90 / 100
                                </span>
                            </span>
                        </span>

                        <span className="survey-end-date ended">
                            20-10-2022
                        </span>

                    </div>
                </li>

            </ul>
            <Footer />
        </>
    )
}
export default Lecture;