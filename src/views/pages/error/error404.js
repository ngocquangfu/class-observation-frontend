import React from 'react'
import '../styles/error404.css'
import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function error404() {
  return (
    <>
    <NavBar/>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Ối! Rất tiếc! Không thể tìm thấy trang này</h2>
          <p>XIN LỖI NHƯNG TRANG BẠN ĐANG TÌM KIẾM KHÔNG TỒN TẠI, ĐÃ BỊ XÓA. TÊN ĐÃ THAY ĐỔI HOẶC TẠM THỜI KHÔNG CÓ</p>
          <a href="/">Về Trang Chủ</a>
        </div>
      </div>

    <Footer/>

    </>
  )
}

export default error404