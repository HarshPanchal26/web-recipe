import React from 'react'
import { useState, useEffect } from 'react';
import { CircularProgress } from "@mui/material"
import axios from '../../axios.config'
import { verifyDataForLogIn, verifyDataForSignIn } from '../../utils/verification';

export default function Signin() {

  const [loader, setLoader] = useState(true);
  const [LoaderForSignIn, setLoaderForSignIn] = useState(false);

  const [signInData, setSignInData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
  })
  const [error, setError] = useState(null);

  // const checkAutorization = () => {
  //   console.log("Check ETC", import.meta.env.VITE_APP_API_URL)
  //   try {
  //     axios.get(`${import.meta.env.VITE_APP_API_URL}signIn/authorization`).then((result) => {
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

    setSignInData({
      ...signInData,
      [name]: value
    })
  }

  const handleSignIn = async () => {
    error !== null && setError(null);
    try {
      const res = await verifyDataForSignIn(signInData);
      if (res?.Verified) {
        var myButton = document.getElementById("sign_btn");
        myButton.disabled = true;
        setLoaderForSignIn(true);
        axios.post(`${process.env.REACT_APP_SERVER_URL}signIn/newuser`, signInData)
          .then((res) => {
            window.location.href = '/dashbord'
          }).catch((error) => {
            setError(`${error.response.data.message}`)
            setLoaderForSignIn(false);
            var myButton = document.getElementById("sign_btn");
            myButton.disabled = false;
          })
      }
    } catch (error) {
      console.log("Error is ", error)
      error?.message && setError(error?.message)
      !error?.message && setError('Network Error')
      setLoaderForSignIn(false);
      var myButton = document.getElementById("sign_btn");
      myButton.disabled = false;
    }
  }
  return (
    <div className='w-full h-screen'>
      <div className='flex xl:flex-row flex-col gap-4 h-full'>
        <div className='xl:flex hidden w-1/2 h-full shadow-md'>
          <img
            src='https://www.stylecraze.com/wp-content/uploads/2015/06/Top-15-Light-Food-Recipes-That-Are-Easy-To-Digest-Banner.jpg'
            about='recipi_book'
            alt='recipi_book'
            className='mt-[10%] mx-auto'
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
            {/*SignIn Area  */}
            <div className='mt-1 mx-4'>
              <div className="flex min-h-full flex-1 flex-col justify-center p-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-1 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Your Account
                  </h2>
                </div>
                {error && <p className='mt-3 p-1 text-lg block mx-auto text-red-600 w-1/2 text-center'>{error}</p>}
                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST">
                    <div>
                      <label htmlFor="fname" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="fname"
                          name="fname"
                          type="email"
                          autoComplete="fname"
                          required
                          value={signInData.fname}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lname" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="lname"
                          name="lname"
                          type="email"
                          autoComplete="lname"
                          required
                          value={signInData.lname}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-5 "
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={signInData.email}
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
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={signInData.password}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                          Confirm Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="cpassword"
                          name="cpassword"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={signInData.cpassword}
                          onChange={handlechangeInData}
                          className="block w-full rounded-md border-0 py-1.5 px-5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        id='sign_btn'
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSignIn}
                      >
                        {!LoaderForSignIn && 'Log In'}
                        {LoaderForSignIn && <CircularProgress color="inherit" />}
                      </button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-base text-gray-600">
                    Already have an account ?{' '}
                    <a href="/login" className="font-semibold leading-6 ">
                      {/* <p className="inline-block p-2 border rounded-lg mx-3 text-white bg-green-600">Create Your Account</p> */}
                      <p className="inline-block mx-3 text-indigo-600 hover:text-indigo-500">Log In</p>
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

