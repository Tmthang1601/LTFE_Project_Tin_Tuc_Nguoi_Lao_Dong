
// import {WrapperCateName, WrapperContain} from "./Style";
// import {Col, Row} from "antd";
// import Caption from "../../component/Caption/Caption";
// import {RSSFeed} from "../../service/rssService";
// import {useLoaderData} from "react-router";
// import Item from "../../component/Item";
// import {NewsItem} from "../../component/NewsItem";
// import {useEffect, useState} from "react";

// export async function loadRss({params}: any) {
//     let url = "";
//     let cateName = "";
//     switch (params.nameCate) {
//         case "bong-da-viet-nam":
//             url = "https://thethao247.vn/bong-da-viet-nam-c1.rss";
//             cateName = "Bóng đá Việt Nam";
//             break;
//         case "bong-da-quoc-te":
//             url = "https://thethao247.vn/bong-da-quoc-te-c2.rss";
//             cateName = "Bóng đá Quốc Tế";
//             break;
//         case "tin-chuyen-nhuong":
//             url = "https://thethao247.vn/tin-chuyen-nhuong-c14.rss";
//             cateName = "Chuyển nhượng";
//             break;
//         case "nhan-dinh":
//             url = "https://thethao247.vn/nhan-dinh-c165.rss";
//             cateName = "Nhận định";
//             break;
//         case "the-thao-tong-hop":
//             url = "https://thethao247.vn/the-thao-tong-hop-c5.rss";
//             cateName = "Thể thao tổng hợp";
//             break;
//         case "esport":
//             url = "https://thethao247.vn/esports-c180.rss";
//             cateName = "Esports";
//             break;
//         default:
//             return url;
//     }
//     const data = [];
//     const feed = await RSSFeed(url);
//     data.push(feed);
//     data.push(cateName);
//     return data;
// }

// function CategoryPage() {
//     const data: any = useLoaderData();
//     const feed = data[0];
//     const nameCate = data[1];
//     // Create a new DOM parser
//     const parser = new DOMParser();
//     let imageUrl: any = "";
//     const doc = parser.parseFromString(feed[0].content, 'text/html');
//     const imgElement = doc.querySelector('img');
//     if (imgElement) {
//         imageUrl = imgElement.getAttribute('src');
//     }

//     const [windowSize, setWindowSize] = useState({
//         width: window.innerWidth,
//         height: window.innerHeight,
//     });

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         };

//         window.addEventListener('resize', handleResize);

//         // Cleanup function to remove event listener when component unmounts
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []); // Empty dependency array ensures that effect runs only once after mount

//     const isSmallScreen = windowSize.width < 1200;
//     return (
//         <WrapperContain>
//             <Row>
//                 <Col span={24}>
//                     <WrapperCateName>{nameCate}</WrapperCateName>
//                     {windowSize.width > 768 ? (
//                         <div>
//                              <Item title={feed[0].title} description={feed[0].contentSnippet} imageUrl={imageUrl} newsUrl={feed[0].link} style={{width:"100%", height: "100%"}} styleBody={""} col1={9} col2={15}/>
//                         </div>
//                     ) : (
//                         <div style={{width: "90%", height: "auto", margin: " 20px auto"}}>
//                             <NewsItem title={feed[0].title} description={feed[0].contentSnippet} imageUrl={imageUrl} newsUrl={feed[0].link}/>
//                         </div>
//                     )
//                     }

//                 </Col>
//             </Row>
//             <Row>
//                 {isSmallScreen ?
//                     feed.slice(1, 4).map((item: any, index: any) => {
//                         let imageUrl: any = "";
//                         const doc = parser.parseFromString(item.content, 'text/html');
//                         const imgElement = doc.querySelector('img');
//                         if (imgElement) {
//                             imageUrl = imgElement.getAttribute('src');
//                         }
//                         return (
//                             <Col xl={6} lg={8} md={8}key={index} style={{margin: "0 auto"}}>
//                                 {windowSize.width > 768 ? (
//                                     <div style={{width: "90%", height: 300, margin: " 20px auto"}}>
//                                         <NewsItem title={item.title} description={""} imageUrl={imageUrl} newsUrl={item.link}/>
//                                     </div>
//                                 ) : (
//                                     <div style={{marginBottom: "15px"}}>
//                                         <Item title={item.title} description={""} imageUrl={imageUrl} newsUrl={item.link} style={{width:"100%", height: "100%"}} styleBody={""} col1={9} col2={15} />
//                                     </div>
//                                 )
//                                 }
//                             </Col>
//                         );
//                     }) :
//                     feed.slice(1, 5).map((item: any, index: any) => {
//                         let imageUrl: any = "";
//                         const doc = parser.parseFromString(item.content, 'text/html');
//                         const imgElement = doc.querySelector('img');
//                         if (imgElement) {
//                             imageUrl = imgElement.getAttribute('src');
//                         }
//                         return (
//                             <Col xl={6} lg={8} md={8} key={index} style={{margin: "0 auto"}}>
//                                 <div style={{  width: "90%", height: 350 , margin: " 20px auto"}}>
//                                 <NewsItem title={item.title} description={""} imageUrl={imageUrl} newsUrl={item.link}/>
//                                 </div>
//                             </Col>
//                         );
//                     })
//                 }
//             </Row>
//             <Caption title="Mới nhất"/>
//             <Row>
//                 {
//                     isSmallScreen ? (
//                         feed.slice(4).map((item: any, index: any) => {
//                             let imageUrl: any = "";
//                             const doc = parser.parseFromString(item.content, 'text/html');
//                             const imgElement = doc.querySelector('img');
//                             if (imgElement) {
//                                 imageUrl = imgElement.getAttribute('src');
//                             }
//                             return (
//                                 <Col span={24} key={index} style={{margin: "7.5px auto", marginBottom: "15px"}}>
//                                     <div>
//                                         {windowSize.width > 768 ? (
//                                             <Item title={item.title} description={item.contentSnippet} imageUrl={imageUrl} newsUrl={item.link} style={{width:"100%", height: "100%"}} styleBody={""} col1={6} col2={18}/>
//                                         ): (
//                                             <Item title={item.title} description={item.contentSnippet} imageUrl={imageUrl} newsUrl={item.link} style={{width:"100%", height: "100%"}} styleBody={""} col1={9} col2={15}/>

//                                         )}
//                                     </div>
//                                 </Col>
//                             );
//                         })
//                     ):(
//                         feed.slice(5).map((item: any, index: any) => {
//                             let imageUrl: any = "";
//                             const doc = parser.parseFromString(item.content, 'text/html');
//                             const imgElement = doc.querySelector('img');
//                             if (imgElement) {
//                                 imageUrl = imgElement.getAttribute('src');
//                             }
//                             return (
//                                 <Col span={24} key={index} style={{margin: "7.5px auto", marginBottom: "15px"}}>
//                                     <div>
//                                         {windowSize.width > 768 ? (
//                                             <Item title={item.title} description={item.contentSnippet} imageUrl={imageUrl} newsUrl={item.link} style={{width:"100%", height: "100%"}} styleBody={""} col1={6} col2={18}/>
//                                         ): (
//                                             <Item title={item.title} description={item.contentSnippet} imageUrl={imageUrl} newsUrl={item.link} style={{width:"100%", height: "100%"}} styleBody={""} col1={9} col2={15}/>

//                                         )}
//                                     </div>
//                                 </Col>
//                             );
//                         })
//                     )

//                 }
//             </Row>
//         </WrapperContain>
//     );
// }

// export default CategoryPage;
