import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../axios.config';
import CircularProgress from '@mui/material/CircularProgress';
import { ContextForDashBord } from '../Context/contextForDashBord';
import { Button } from '@mui/material';


export default function MyBook() {

  const [loader, setLoader] = useState(true)
  const [StateForSavedRecipies, setStateForSavedRecipies] = useState(null);
  const contextForDashBord = useContext(ContextForDashBord)
  const navigate = useNavigate()
  const fetchSavedRecipies = async () => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}recipe/multiple`, contextForDashBord.SAVED_RECIPE);
      setStateForSavedRecipies(result.data.recipies)
      contextForDashBord.setStateForSavedRecipies(result.data.recipies)
      setLoader(false)
    } catch (error) {
      console.log("Error is" , error.message)
    }
  }

  useEffect(() => {
    if (!StateForSavedRecipies && contextForDashBord.SAVED_RECIPE.length > 0 && !contextForDashBord.SAVED_RECIPE_DATA) {
      fetchSavedRecipies()
    }else{
      setLoader(false)
      setStateForSavedRecipies(contextForDashBord.SAVED_RECIPE_DATA)
    }
  }, [])

  return (
    <>
      {loader && (
        <div className='h-full w-full'>
          <div className='flex flex-col justify-center items-center my-1/2 mx-1/2 h-full'>
            <CircularProgress />
          </div>
        </div>
      )}
      {!loader && contextForDashBord.SAVED_RECIPE.length > 0 && (
        <main className='h-full w-full overflow-auto'>
          {/* Container to hold recipies */}
          <p className='font-bold mx-3 text-xl my-5'>
             {`Hey ${contextForDashBord.USER.firstName} !! Here's your saved recipies .`}
          </p>
          <div className='p-4 h-auto flex flex-row flex-wrap gap-5 justify-center cursor-pointer'>
            {/* Box for Recipies */}
            {StateForSavedRecipies.map((item, index) => {
              return (
                <NavLink to={`/recipe?search=${item.id}`} about='recipe' key={index}>
                  <div className='flex flex-col w-auto h-auto'>
                    <div className='w-96'>
                      <img
                        alt='images'
                        src={item.image}
                        className='w-full'
                      />
                    </div>
                    <div className='flex flex-row shadow-xl rounded-b-lg p-3 bg-slate-200 w-96 min-h-[100px] justify-between'>
                      <p className='font-bold text-lg text-left'>
                        {item.title}
                      </p>
                      <div className='h-full'>
                        <Button variant='contained' color='success'>
                            Save 
                        </Button>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )
            })}
          </div>
        </main>
      )}
      {contextForDashBord.SAVED_RECIPE.length ===0 && (
        <div className='w-full text-center mt-10'>
            <p className='font-bold text-2xl'>{'Soory !!! You do not have any saved recipe '}</p>
            <p className='text-blue-600 underline cursor-pointer' onClick={()=>navigate('/dashbord')}>
                Go to Dashbord
            </p>
        </div>
      )}
    </>
  )
}



// Recipit by query

//  https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&apiKey=d33f8b134bf14555b59236e0902a4d1f