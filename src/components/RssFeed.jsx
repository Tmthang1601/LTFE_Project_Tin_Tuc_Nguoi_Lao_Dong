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
    const [showStats, setShowStats] = useState(false);
    const location = useLocation();
    const itemsPerPage = 6;

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
                'ai-365': 'ai-365',
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

    // if (loading) return <div>Loading...</div>;
    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
        }}>
            Loading...
        </div>
    );
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

//     return (
//         <div className="container my-4">
//             <h3><u>TIN NỔI BẬT - {category.toUpperCase()}</u></h3>
//
//             <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//                 <h3 style={{ marginBottom: '20px' }}><u>TIN NỔI BẬT - {category.toUpperCase()}</u></h3>
//
//                 <button
//                     style={{
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         padding: '10px 15px',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         marginBottom: '20px'
//                     }}
//                     onClick={() => setShowStats(!showStats)}
//                 >
//                     {showStats ? 'Ẩn thống kê' : 'Hiển thị thống kê'}
//                 </button>
//
//                 {showStats && (
//                     <div style={{ marginBottom: '20px' }}>
//                         <h4>Thống kê bài viết</h4>
//                         <ArticleChart data={data} />
//                     </div>
//                 )}
//
//                 <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//                     <input
//                         type="text"
//                         style={{
//                             flex: 2,
//                             padding: '10px',
//                             borderRadius: '5px',
//                             border: '1px solid #ced4da'
//                         }}
//                         placeholder="Tìm kiếm bài viết..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                     <select
//                         style={{
//                             flex: 1,
//                             padding: '10px',
//                             borderRadius: '5px',
//                             border: '1px solid #ced4da'
//                         }}
//                         onChange={handleSortChange}
//                         value={sortOption}
//                     >
//                         <option value="newest">Mới nhất</option>
//                         <option value="oldest">Cũ nhất</option>
//                         <option value="popularity">Độ phổ biến</option>
//                         <option value="title">Tiêu đề</option>
//                     </select>
//                 </div>
//             </div>
//             {filteredData.length === 0 ? (
//                 <div className="alert alert-info">Không tìm thấy bài viết nào phù hợp.</div>
//             ) : (
//                 <div className="container d-flex justify-content-center align-items-center flex-column my-3">
//                     {currentItems.map((item, index) => (
//                         <div key={index} className="container my-3 p-3" style={{width: "600px", boxShadow: "2px 2px 10px silver", borderRadius: "10px"}}>
//                             <h5 className="my-2">{item.title}</h5>
//                             {item.imgSrc && (
//                                 <div className="d-flex justify-content-center align-items-center">
//                                     <img src={item.imgSrc} alt="Article" className="img-fluid" style={{width: "100%", height: "300px", objectFit: "cover"}}/>
//                                 </div>
//                             )}
//                             <p className="my-1">{item.description}</p>
//                             <p className="text-muted">Ngày đăng: {item.pubDate.toLocaleString()}</p>
//                             <p className="text-muted">Độ phổ biến: {item.popularity}</p>
//                             <a href={item.link} target="_blank" rel="noopener noreferrer">Xem thêm</a>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <div className="pagination d-flex justify-content-center">
//                 {currentPage > 1 && (
//                     <button onClick={() => paginate(currentPage - 1)} className="btn btn-outline-primary mx-1">
//                         Previous
//                     </button>
//                 )}
//                 {renderPaginationButtons()}
//                 {currentPage < totalPages && (
//                     <button onClick={() => paginate(currentPage + 1)} className="btn btn-outline-primary mx-1">
//                         Next
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default RssFeed;
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f5f5',
        },
        title: {
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: '#333',
        },
        highlight: {
            background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            padding: '0 10px',
            borderRadius: '5px',
        },
        controlsContainer: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
        },
        statsToggle: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
            borderRadius: '5px',
            ':hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-2px)',
            },
        },
        statsContainer: {
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#e9ecef',
            borderRadius: '5px',
        },
        searchSortContainer: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
        },
        input: {
            flex: 1,
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '5px',
        },
        articlesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
        },
        articleCard: {
            backgroundColor: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            animation: 'fadeIn 0.5s ease-in-out',
            ':hover': {
                transform: 'translateY(-5px)',
            },
        },
        articleImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        },
        articleContent: {
            padding: '1rem',
        },
        articleTitle: {
            fontSize: '1.2rem',
            marginBottom: '0.5rem',
            color: '#333',
        },
        articleDescription: {
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '1rem',
        },
        articleMeta: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#999',
            marginBottom: '1rem',
        },
        readMore: {
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '5px 10px',
            textDecoration: 'none',
            borderRadius: '3px',
            transition: 'background-color 0.3s',
            ':hover': {
                backgroundColor: '#0056b3',
            },
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
        },
        pageButton: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            borderRadius: '3px',
            ':hover': {
                backgroundColor: '#0056b3',
            },
        },
        loader: {
            textAlign: 'center',
            fontSize: '1.5rem',
            color: '#666',
        },
        noResults: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666',
            marginTop: '2rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                <span style={styles.highlight}>{category.toUpperCase()}</span> NEWS
            </h1>

            <div style={styles.controlsContainer}>
                <button
                    style={{
                        ...styles.statsToggle,
                        ...(showStats ? { backgroundColor: '#f44336' } : {}),
                    }}
                    onClick={() => setShowStats(!showStats)}
                >
                    {showStats ? 'Hide Stats' : 'Show Stats'}
                </button>

                {showStats && (
                    <div style={styles.statsContainer}>
                        <h4>Article Statistics</h4>
                        <ArticleChart data={data} />
                    </div>
                )}

                <div style={styles.searchSortContainer}>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select
                        style={styles.input}
                        onChange={handleSortChange}
                        value={sortOption}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popularity">Popularity</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div style={styles.loader}>Loading...</div>
            ) : filteredData.length === 0 ? (
                <div style={styles.noResults}>No articles found matching your criteria.</div>
            ) : (
                <div style={styles.articlesGrid}>
                    {currentItems.map((item, index) => (
                        <article key={index} style={{
                            ...styles.articleCard,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            {item.imgSrc && (
                                <img src={item.imgSrc} alt={item.title} style={styles.articleImage}/>
                            )}
                            <div style={styles.articleContent}>
                                <h2 style={styles.articleTitle}>{item.title}</h2>
                                <p style={styles.articleDescription}>{item.description}</p>
                                <div style={styles.articleMeta}>
                                    <span>{item.pubDate.toLocaleString()}</span>
                                    <span>Popularity: {item.popularity}</span>
                                </div>
                                <div style={{marginTop: 'auto', alignSelf: 'flex-start'}}>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                                       style={styles.readMore}>
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <div style={styles.pagination}>
            {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)} style={styles.pageButton}>
                        Previous
                    </button>
                )}
                {renderPaginationButtons()}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)} style={styles.pageButton}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default RssFeed;