import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ArticleChart from './ArticleChart';

const RssFeed = ({ category }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOption, setSortOption] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 5;

    const currentPage = parseInt(new URLSearchParams(location.search).get('page') || '1', 10);

    const getCategoryUrl = (category) => {
        const categoryMap = {
            'home': 'home',
            'thoi-su': 'thoi-su',
            'quoc-te': 'quoc-te',
            'lao-dong': 'lao-dong',
            'ban-doc': 'ban-doc',
            'kinh-te': 'kinh-te',
            'suc-khoe': 'suc-khoe',
            'giao-duc': 'giao-duc-khoa-hoc',
            'phap-luat': 'phap-luat',
            'van-hoa': 'van-hoa-van-nghe',
            'giai-tri': 'giai-tri',
            'the-thao': 'the-thao',
            'cong-nghe': 'cong-nghe',
            'du-lich': 'du-lich-xanh',
            'phu-nu': 'chuyen-trang-phu-nu',
            'gia-dinh': 'gia-dinh'
        };
        return categoryMap[category] || 'home';
    };

    useEffect(() => {
        const fetchRss = async () => {
            setLoading(true);
            try {
                const categoryUrl = getCategoryUrl(category);
                const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nld.com.vn/rss/${categoryUrl}.rss`)}`;
                const response = await axios.get(url);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const items = xmlDoc.querySelectorAll("item");

                const parsedItems = Array.from(items).map((item, index) => {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const description = item.querySelector("description").textContent;
                    const pubDate = new Date(item.querySelector("pubDate").textContent);

                    const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
                    const imgSrc = imgMatch ? imgMatch[1] : null;

                    const plainDescription = description.replace(/<[^>]+>/g, '');

                    return { title, link, description: plainDescription, pubDate, imgSrc, popularity: items.length - index };
                });

                setData(parsedItems);
                setFilteredData(parsedItems);
            } catch (error) {
                console.error('Error fetching RSS:', error);
            }
            setLoading(false);
        };

        fetchRss();
    }, [category]);

    useEffect(() => {
        let sorted = [...data];
        switch(sortOption) {
            case 'newest':
                sorted.sort((a, b) => b.pubDate - a.pubDate);
                break;
            case 'oldest':
                sorted.sort((a, b) => a.pubDate - b.pubDate);
                break;
            case 'popularity':
                sorted.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }



        const filtered = sorted.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered);
    }, [sortOption, data, searchTerm]);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    if (loading) return <div>Loading...</div>;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        navigate(`${location.pathname}?page=${pageNumber}`);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        navigate(`${location.pathname}?page=1`);
    };
    const renderPaginationButtons = () => {
        let buttons = [];
        let startPage, endPage;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`btn ${currentPage === i ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="container my-4">
            <h3><u>TIN NỔI BẬT - {category.toUpperCase()}</u></h3>

            <div className="mb-4">
                <h4>Thống kê bài viết</h4>
                <ArticleChart data={data} />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select className="form-select" onChange={handleSortChange} value={sortOption}>
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="popularity">Độ phổ biến</option>
                    <option value="title">Tiêu đề</option>
                </select>
            </div>
            {filteredData.length === 0 ? (
                <div className="alert alert-info">Không tìm thấy bài viết nào phù hợp.</div>
            ) : (
                <div className="container d-flex justify-content-center align-items-center flex-column my-3">
                    {currentItems.map((item, index) => (
                        <div key={index} className="container my-3 p-3" style={{width: "600px", boxShadow: "2px 2px 10px silver", borderRadius: "10px"}}>
                            <h5 className="my-2">{item.title}</h5>
                            {item.imgSrc && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={item.imgSrc} alt="Article" className="img-fluid" style={{width: "100%", height: "300px", objectFit: "cover"}}/>
                                </div>
                            )}
                            <p className="my-1">{item.description}</p>
                            <p className="text-muted">Ngày đăng: {item.pubDate.toLocaleString()}</p>
                            <p className="text-muted">Độ phổ biến: {item.popularity}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">Xem thêm</a>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination d-flex justify-content-center">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)} className="btn btn-outline-primary mx-1">
                        Previous
                    </button>
                )}
                {renderPaginationButtons()}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)} className="btn btn-outline-primary mx-1">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default RssFeed;