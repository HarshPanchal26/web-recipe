import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import axios from '../../axios.config';
import Pagination from '@mui/material/Pagination';


export default function SearchPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const [SearchText, setSearchText] = useState(null);
    const [StateForSerchRecipies, setStateForSerchRecipies] = useState(null);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [page, setPage] = React.useState(1);

    const fetchSearchRecipies = async () => {
        try {
            if (searchParams.get('item') !== null) {
                setSearchText(searchParams.get('item'));
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipe/search?item=${searchParams.get('item')}`);
                ErrorMessage && setErrorMessage('');
                setStateForSerchRecipies(res.data.recipies.results)
                setLoader(false)
            } else {
                setErrorMessage('We are Sorry !! We do not have result for your search')
                setLoader(false)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoader(false)
        }
    }

    const handlePagination = (event, value) => {
        setPage(value);
        navigate({ search: `?item=${SearchText}&page=${value}` });
    };

    useEffect(() => {
        let currentPage = searchParams.get('page');
        if(searchParams.get('item') !== SearchText || !StateForSerchRecipies  ){
            console.log("I am runnig" ,searchParams.get('item') !== SearchText, StateForSerchRecipies)
            fetchSearchRecipies();
        } 
        (currentPage && currentPage < 6) ? setPage(currentPage) : setPage(1)
    }, [searchParams ])

    return (
        <>
            {loader && (
                <div className='h-full w-full'>
                    <div className='flex flex-col justify-center items-center my-1/2 mx-1/2 h-full'>
                        <CircularProgress />
                    </div>
                </div>
            )}
            {!loader && StateForSerchRecipies && (
                <main className='h-full w-full overflow-auto'>
                    {/* Container to hold recipies */}
                    <p className='font-bold mx-3 text-xl my-5 underline'>
                        {`Here is ${StateForSerchRecipies.length} results for your search .`}
                    </p>
                    <div className='p-4 h-auto flex flex-row flex-wrap gap-5 justify-center cursor-pointer'>
                        {/* Box for Recipies */}
                        {StateForSerchRecipies.slice((page * 10 - 10), page * 10).map((item, index) => {
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
            {!loader && ErrorMessage && !StateForSerchRecipies && (
                <>
                    <div className='w-full text-center mt-10'>
                        <p className='font-bold text-2xl'>{ErrorMessage}</p>
                        <p className='text-blue-600 underline cursor-pointer' onClick={() => navigate('/dashbord')}>
                            Go to Dashbord
                        </p>
                    </div>

                </>
            )}
        </>
    )
}

