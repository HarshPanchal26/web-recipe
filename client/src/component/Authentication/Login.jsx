import React from 'react'
import { useState, useEffect } from 'react';
import { CircularProgress } from "@mui/material"
import axios from '../../axios.config'
import { verifyDataForLogIn } from '../../utils/verification';

export default function Login() {

  const [loader, setLoader] = useState(true);
  const [LoaderForLogin, setLoaderForLogin] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null);


  // const checkAutorization = () => {
  //   console.log("Check ETC", import.meta.env.VITE_APP_API_URL)
  //   try {
  //     axios.get(`${import.meta.env.VITE_APP_API_URL}login/authorization`).then((result) => {
  //       if (result.data.authorized) {
  //         window.location.href = '/feed'
  //       } else {
  //         setLoader(false);
  //       }
  //     }).catch((error) => {
  //       setLoader(false);
  //     })
  //   } catch (error) {
  //     alert(`Error is ${error.message}`)
  //   }

  // }

  const handlechangeInData = (event) => {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleLogin = async () => {
    error !== null && setError(null);
    try {
      const res = await verifyDataForLogIn(loginData);
      if (res?.Verified) {
        setLoaderForLogin(true);
        axios.post(`${process.env.REACT_APP_SERVER_URL}login/user`, loginData)
          .then((res) => {
            window.location.href = '/dashbord'
          }).catch((error) => {
            setError(`${error.response.data.message}`)
            setLoaderForLogin(false);
          })
      } else {
        setError('Please Enter Email and Password properly.')
        setLoaderForLogin(false);
      }
    } catch (error) {
      setError('Network Error.')
      setLoaderForLogin(false);
    }
  }
  return (
    <div className='w-full h-screen'>
      <div className='flex xl:flex-row flex-col gap-4 h-full'>
        <div className='xl:flex hidden w-1/2 h-full shadow-md'>
          <img
            src='https://thumbs.dreamstime.com/b/heart-shape-various-vegetables-fruits-healthy-food-concept-isolated-white-background-140287808.jpg'
            about='recipi_book'
            alt='recipi_book'
            className='mt-[15%] mx-auto'
          />
        </div>
        <div className='xl:w-1/2 w-full h-full'>
          <div className='mx-auto h-full overflow-auto'>
            <h3 className='font-bold text-center mt-10 text-2xl'>
              Welcome to
            </h3>
            {/* <p className='text-5xl text-center mt-5 text-green-600'>RecipeBook</p> */}
            <div className='w-full mt-3'>
            <img
              alt='logo'
              src='https://img.freepik.com/premium-vector/book-recipe-logo-design-template_145155-1203.jpg?w=2000'
              className='border w-52 h-44 mx-auto border-white '
            />
            </div>
            {/*Login Area  */}
            <div className='mt-1 mx-4'>
              <div className="flex min-h-full flex-1 flex-col justify-center p-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-1 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                    Login to your account
                  </h2>
                </div>
                {error && <p className='mt-3 p-1 text-lg block mx-auto text-red-600 w-1/2 text-center'>{error}</p>}
                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST">
                    <div className="">
                      <label htmlFor="password" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={loginData.email}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                          Password
                        </label>
                        <div className="text-sm">
                          {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> */}
                          Forgot password?
                          {/* </a> */}
                        </div>
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={loginData.password}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleLogin}
                      >
                        {!LoaderForLogin && 'Log In'}
                        {LoaderForLogin && <CircularProgress color="inherit" />}
                      </button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-base text-gray-600">
                    Not a member?{' '}
                    <a href="/signin" className="font-semibold leading-6 ">
                      {/* <p className="inline-block p-2 border rounded-lg mx-3 text-white bg-green-600">Create Your Account</p> */}
                      <p className="inline-block mx-3 text-indigo-600 hover:text-indigo-500">Create Your Account</p>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
