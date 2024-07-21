// import React, { useEffect, useState } from 'react';
// import Parser from 'rss-parser';

// const RSSFeed = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const parser = new Parser();
//     const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

//     parser.parseURL(CORS_PROXY + 'http://laodong.vn/rss/feed.rss', (err, feed) => {
//       if (err) throw err;
//       setArticles(feed.items);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Tin Tức từ Báo Lao Động</h1>
//       {articles.length === 0 ? (
//         <p>Đang tải...</p>
//       ) : (
//         <ul>
//           {articles.map((article, index) => (
//             <li key={index}>
//               <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
//               <p>{article.contentSnippet}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RSSFeed;
