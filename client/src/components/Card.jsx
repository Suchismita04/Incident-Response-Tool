import React from "react";

const Card = ({ name, totalNumber }) => {
    return (
        <>


            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <p className=" text-gray-700 font-bold dark:text-gray-400">{totalNumber}</p>
            </a>

        </>
    )
}

export default Card;