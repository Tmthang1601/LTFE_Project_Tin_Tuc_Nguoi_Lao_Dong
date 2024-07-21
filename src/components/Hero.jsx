import React from 'react';

// Styles for the Hero component
const heroStyles = {
    container: {
        height: "50vh",
        backgroundColor: "#282c34", // Xám đậm
        color: "#fff", // Trắng
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
    },
    heading: {
        fontSize: "50px",
        color: "#00bfff", // Xanh dương sáng
        animation: "fadeInUp 2s ease-out",
    },
    subHeading: {
        fontSize: "20px",
        color: "#32cd32", // Xanh lá cây sáng
        animation: "fadeInUp 2s ease-out 1s",
    },
    // Animated gradient background
    gradient: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg, rgba(255,105,180,0.6), rgba(0,191,255,0.6), rgba(34,193,195,0.6), rgba(253,187,45,0.6))",
        backgroundSize: "400% 400%",
        animation: "gradientMove 15s ease infinite",
        zIndex: "-1",
    }
};

// Keyframes for animations
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

// Adding keyframes to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

function Hero() {
    return (
        <div style={heroStyles.container}>
            <div style={heroStyles.gradient}></div>
            <h1 style={heroStyles.heading}>BÁO TIN TỨC NGƯỜI LAO ĐỘNG</h1>
            <h5 style={heroStyles.subHeading}>Trang Web Này Được Xây Dựng Từ API Tin Tức Của nld.com.vn</h5>
        </div>
    );
}

export default Hero;
