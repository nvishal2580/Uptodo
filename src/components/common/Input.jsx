import React from 'react';

function Input({type,title,placeholder,value,setValue,required,customStyle}) {
  return <div className='mt-4'>
      <h1 className='text-[#6AABB1]'>{title}</h1>
      <input required={required} value={value} onChange={(e) => setValue(e.currentTarget.value)} type={type} className={`border focus:border-none bg-[#FFFFFF] focus:bg-white focus:outline-blue-400 appearance-none my-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${customStyle} `} placeholder={placeholder} />
  </div>;
}

export default Input;
