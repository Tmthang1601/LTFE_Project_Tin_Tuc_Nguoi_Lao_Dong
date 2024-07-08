import React from 'react'
import Hero from "../components/Hero";
import FetchData from "../components/FetchData";

function Categories ({cat})  {
    return (
        <div stye={{minHeight: "100vh"}}>
            {cat}

        </div>
    )
}

export default Categories