import React from 'react'
import Hero from "../components/Hero";
import FetchData from "../components/FetchData";

function Categories ({cat})  {
    return (
        <div>
            {cat}
            <Hero/>
            <FetchData/>
        </div>
    )
}

export default Categories