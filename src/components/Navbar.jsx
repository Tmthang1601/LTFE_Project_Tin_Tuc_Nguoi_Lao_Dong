import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/Home">
                        <h3 style={{
                            color: '#C0C0C0',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            margin: '0',
                            padding: '5px 10px',
                            textAlign: 'center',
                            display: 'inline-block'
                        }}>
                            Báo Người Lao Động
                        </h3>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Home">Trang Chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ThoiSu">Thời Sự</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/QuocTe">Quốc Tế</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/LaoDong">Lao Động</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/BanDoc">Bạn Đọc</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/KinhTe">Kinh Tế</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/SucKhoe">Sức Khỏe</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/GiaoDuc">Giáo Dục</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/PhapLuat">Pháp Luật</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/VanHoa">Văn Hóa - Văn Nghệ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/GiaiTri">Giải Trí</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/TheThao">Thể Thao</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AI365">AI 365</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/DuLich">Du Lịch Xanh</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/PhuNu">Phụ Nữ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/GiaDinh">Gia Đình</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default Navbar;

