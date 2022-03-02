import React from 'react'


const Quote = ({ id, author, text }) => (
    <div className=' p-5 mt-24 -rotate-1 '>
        <blockquote className="text-center quote before:absolute before:text-gray-500 before:text-[70px] after:text-[70px] after:absolute after:text-gray-500 after:w-4 after:h-4 before:content-['“'] before:-left-5 before:-top-2 after:content-['”'] after:-right-5 after:-bottom-1 ">
            <div className="mt-6 text-xl font-light ">{text}</div>
        </blockquote>
            <div className='float-right ml-24 mt-6 text-xl font-extralight'>- {author}</div>
    </div>

)

export default Quote