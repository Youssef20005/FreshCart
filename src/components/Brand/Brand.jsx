import React from 'react'

export default function Brand({item}) {
  return (
    <>
    <div className="col-md-2">
        <img src={item.image} className='w-100' alt="" />
        <h5 className='text-center'>{item.name}</h5>
    </div>
    </>
  )
}
