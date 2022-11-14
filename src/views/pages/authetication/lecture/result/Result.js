import React, { Component } from 'react'
import NavBar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';
import './Result.scss'

export default class Result extends Component {
    render() {
        return (
            <>
                <NavBar />
                <div className="wrapper">

                    <header>
                        <h1>Kết Quả Đánh Giá Dự Giờ Giảng Viên</h1>
                    </header>
                    <form className='form-result'>

                        <section className="columns">
                            <div className="column">
                                <p id='element-info'>Ngày dự giờ:<span id='element-value'> 20-10-2000</span></p>
                                <p id='element-info'>Địa điểm dự giờ:<span id='element-value'> D293</span></p>
                                <p id='element-info'>Giảng viên:<span id='element-value'> Nguyễn Thu Chi</span></p>
                                <p id='element-info'>Môn học:<span id='element-value'> Ngữ văn</span></p>
                                <br />
                                Tên bài giảng <textarea className='input-info' />
                                <br /><br />


                                <strong>Nhận xét</strong><br />

                                Ưu Điểm:<textarea className='input-info' /> <br />
                                Nhược Điểm:<textarea className='input-info' /> <br />
                                Đánh Giá Chung:<textarea className='input-info' /><br />

                            </div>

                            <div className="column1">
                                <h2>Điểm</h2>
                                <br /><br />
                                <p id='element-info'>Tổng điểm:<span id='element-value'> 100</span></p>
                                <br />
                                <p id='element-info'>Đánh giá:<span id='element-value'> Đạt</span></p>


                            </div>
                            

                        </section>
                        <input type={'button'} value="Gửi" className='button-send'/>

                    </form>

                    <footer>
                        Cảm ơn đã tham gia đánh giá
                    </footer>

                </div>
                <Footer />
            </>
        )
    }
}
