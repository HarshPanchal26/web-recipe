import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../axios.config';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { ContextForDashBord } from '../Context/contextForDashBord';
import Pagination from '@mui/material/Pagination';

export default function Dashbord() {
  const contextForDashBord = useContext(ContextForDashBord)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(true)
  const [StateForRecipies, setStateForRecipies] = useState(null);
  const [page, setPage] = React.useState(1);

  const handleFLocalSerch = async () => {

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipe/all`);
      setStateForRecipies(res.data.recipies.results)
      contextForDashBord.setStateForFetchesRecipies(res.data.recipies.results)
      setLoader(false)
    } catch (error) {
      console.log("Error", error)
    }
  }

  const handlePagination = (event, value) => {
    setPage(value);
    navigate(`/dashbord?page=${value}`);
  }


  useEffect(() => {
    if (!StateForRecipies && contextForDashBord.FTECHED_RECIPES == null) {
      handleFLocalSerch()
    } else {
      setStateForRecipies(contextForDashBord.FTECHED_RECIPES)
      setLoader(false)
    }

    let currentPage = searchParams.get('page');
    (currentPage && currentPage < 6) ? setPage(currentPage) : setPage(1)

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
      {!loader && (
        <main className='h-full w-full overflow-auto'>
          {/* Container to hold recipies */}
          <p className='font-bold mx-3 text-xl my-5'>
            Welcome Harsh ! Today's recipies for you .
          </p>
          <div className='p-4 h-auto flex flex-row flex-wrap gap-5 justify-center cursor-pointer'>
            {/* Box for Recipies */}  
            {StateForRecipies.slice((page * 10 - 10), page * 10).map((item, index) => {
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
          <div className='flex justify-center border w-full p-5'>
            <Pagination
              count={5}
              page={page}
              variant='text'
              color='secondary'
              size="large"
              onChange={handlePagination} />
          </div>
        </main>
      )}
    </>
  )
}
