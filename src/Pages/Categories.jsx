import React from 'react'

import RssFeed from "../components/RssFeed";

function Categories ({cat})  {
    return (
        <div style={{minHeight: "100vh"}}>
            <RssFeed category={cat} /
        </div>
    )
}

export default Categories