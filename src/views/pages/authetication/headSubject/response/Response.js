
import React from 'react'
import './Response.css'
import NavBar from '../../../../components/navbar/Navbar';
import Footer from '../../../../components/footer/Footer';
function Response() {
    return (
        <>
            <NavBar />
            <div className="container-response">
                <form className="input">
                <h1>Phản hồi kế hoạch dự giờ giáo viên</h1>
                    <textarea></textarea>
                    <div className="controls">
                        <button>
                            Gửi
                        </button>
                        
                    </div>
                </form>

            </div>
            <Footer />
        </>
    )
}

export default Response