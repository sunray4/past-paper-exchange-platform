import React, { useEffect, useState } from 'react';

export default function ExerciseCards(props) {
    return (
        <div className='flex bg-[#CDCCCC] rounded-md p-4 m-60 mt-0 mb-10'>
            <div className='w-3/4 p-2'>
            <h1 className='text-2xl font-semibold' >{props.subject} {props.unit} {props.year}</h1>
            <p className='flex space-x-20 '>
                <span >{props.school}</span>
                <span>{props.teacher}</span>
            </p>
            <p className='mt-3 font-light text-sm'>{props.description}</p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-4'>
                <button onClick={props.viewEx} className='flex items-center justify-center w-35 p-2 self-end bg-[#4C4747] text-white rounded-lg'>View Exercise</button>
                <button onClick={props.viewAns} className='flex items-center justify-center w-35 p-2 self-end bg-[#4C4747] text-white rounded-lg'>View Answer</button>
            </div>
        </div>
    );
}