import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const RssFeed = lazy(() => import('./components/RssFeed'));

const App = () => {
  return (
      <Router>
        <Navbar />
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<RssFeed category="home" />} />
            <Route path="/ThoiSu" element={<RssFeed category="thoi-su" />} />
            <Route path="/QuocTe" element={<RssFeed category="quoc-te" />} />
            <Route path="/LaoDong" element={<RssFeed category="lao-dong" />} />
            <Route path="/BanDoc" element={<RssFeed category="ban-doc" />} />
            <Route path="/KinhTe" element={<RssFeed category="kinh-te" />} />
            <Route path="/SucKhoe" element={<RssFeed category="suc-khoe" />} />
            <Route path="/GiaoDuc" element={<RssFeed category="giao-duc" />} />
            <Route path="/PhapLuat" element={<RssFeed category="phap-luat" />} />
            <Route path="/VanHoa" element={<RssFeed category="van-hoa" />} />
            <Route path="/GiaiTri" element={<RssFeed category="giai-tri" />} />
            <Route path="/TheThao" element={<RssFeed category="the-thao" />} />
            <Route path="/CongNghe" element={<RssFeed category="cong-nghe" />} />
            <Route path="/DuLich" element={<RssFeed category="du-lich" />} />
            <Route path="/PhuNu" element={<RssFeed category="phu-nu" />} />
            <Route path="/GiaDinh" element={<RssFeed category="gia-dinh" />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
  );
};

export default App;