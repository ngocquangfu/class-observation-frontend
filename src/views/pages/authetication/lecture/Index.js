import React from 'react'
import './Index.scss'
import NavBar from '../../../components/navbar/Navbar';

function Index() {
    return (
        <>
            <NavBar />
            <span class="toggler active" data-toggle="grid"><span class="entypo-layout"></span></span>
            <span class="toggler" data-toggle="list"><span class="entypo-list"></span></span>

            <ul class="surveys grid">
                <li class="survey-item">

                    <span class="survey-country list-only">
                        Demo
                    </span>

                    <span class="survey-name">
                       This is demo
                    </span>

                    <span class="survey-country grid-only">
                        Mark: 10
                    </span>

                    <div class="pull-right">

                        <span class="survey-progress">
                            <span class="survey-progress-bg">
                                <span class="survey-progress-fg" ></span>
                            </span>

                            <span class="survey-progress-labels">
                                <span class="survey-progress-label">
                                    88%
                                </span>

                                <span class="survey-completes">
                                    490 / 500
                                </span>
                            </span>
                        </span>

                        <span class="survey-end-date ended">
                            2014 - May 10
                        </span>
                        <span class="survey-stage">
                            <span class="stage draft">Draft</span>
                            <span class="stage awarded">Awarded</span>
                            <span class="stage live">Live</span>
                            <span class="stage ended active">Ended</span>
                        </span>
                    </div>
                </li>
               
                
                

            </ul>
        </>
    )
}

export default Index