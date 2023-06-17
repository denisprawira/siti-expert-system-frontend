import { useState } from 'react';

export const LoginPage = ()=> {

  return (
        <div className='flex flex-col h-full w-full justify-center items-center max-sm:px-4'>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
             <button className="btn mt-6">Button</button>
          </div>
          
        </div>
  );
}