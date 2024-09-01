import React from 'react';

export function FormInput({ value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <div className='text-base mb-5'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className='w-full p-2 rounded-md bg-[#ffffff] bg-opacity-20 text-white text-center'
      />
    </div>
  );
}
