import React from 'react';


function Hero() {
    return (
        <div className={"container-fluid bg-dark text-white d-flex justify-content-center align-items-center flex-column"}
             style={{height: "50vh"}}>
            <h1 style={{fontSize: "50px", color: "yellow"}}>BÁO TIN TỨC NGƯỜI LAO ĐỘNG</h1>
            <h5>Trang Web Này Được Xây Dựng Từ API Tin Tức Của nld.com.vn</h5>
        </div>
    );
}

export default Hero;