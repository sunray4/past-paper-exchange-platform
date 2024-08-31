import React, { useEffect, useState } from 'react';

export default function ExerciseCards(props) {
    return (
        <div className='flex bg-[#CDCCCC] rounded-md p-4 m-60 mt-10 mb-10'>
            <div className='w-3/4 p-2'>
            <h1 className='text-2xl font-semibold' >{props.subject} {props.unit} {props.year}</h1>
            <p className='flex space-x-20 mt-2'>
                <span >{props.school}</span>
                <span>{props.teacher}</span>
            </p>
            </div>
            <div className='w-35 p-3 self-end bg-[#4C4747] text-white rounded-lg'>
                <button>View Exercise</button>
            </div>
        </div>
    );
}