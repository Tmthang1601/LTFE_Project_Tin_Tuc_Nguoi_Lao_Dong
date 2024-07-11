// import React, {useEffect, useState} from 'react';
// import axios from "axios";

// const FetchData = () => {
//     const [Data, setData] = useState("");
//     const fetchData = async () => {
//         await axios
//             .get(
//             "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f35783780331498f92aabe60e6a573c6"
//             )
//             .then((res) => setData(res.data.articles));

//     };
//     useEffect(() => {
//         fetchData();
//     }, {});
//     return (
//         <div className={"container"}>
//             <div className={"my-2"}>
//                 {Data ? Data.map((items, index) =>
//                     <>
//                         <div className={"container"}>
//                             <h5> {items.title} </h5>
//                         </div>
//                     </>) : "LOADING..."}
//             </div>
//         </div>
//     );
// }

// export default FetchData;