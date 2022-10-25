import React, { Component } from 'react'
import './Lecture.scss'
import NavBar from '../../../components/navbar/Navbar';
import Filter from '../../../components/filter/Filter';
import Footer from '../../../components/footer/Footer';

export default class Index extends Component {
    render() {
        var filterName="Year: ";
        var option = (<select>
            <option defaultValue>All</option>
            <option value="1">2022</option>
            <option value="2">2021</option>
        </select>);
        return (
            <>
                <NavBar />
                <Filter select={option} filterName={filterName} />
                <span className="toggler active" data-toggle="grid"><span className="entypo-layout"></span></span>
                <span className="toggler" data-toggle="list"><span className="entypo-list"></span></span>

                <ul className="surveys grid">
                    <li className="survey-item">

                        <span className="survey-country list-only">
                            Demo
                        </span>

                        <span className="survey-name">
                            This is demo
                        </span>

                        <span className="survey-country grid-only">
                            Mark: 10
                        </span>

                        <div className="pull-right">

                            <span className="survey-progress">
                                <span className="survey-progress-bg">
                                    <span className="survey-progress-fg" ></span>
                                </span>

                                <span className="survey-progress-labels">
                                    <span className="survey-progress-label">
                                        88%
                                    </span>

                                    <span className="survey-completes">
                                        490 / 500
                                    </span>
                                </span>
                            </span>

                            <span className="survey-end-date ended">
                                2014 - May 10
                            </span>
                           
                        </div>
                    </li>
                    
                </ul>
                <Footer/>
            </>
        )
    }

}