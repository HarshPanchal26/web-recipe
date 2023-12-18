import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import NON_VEG from '../../Asset/non_veg_image.png';
import VEG from '../../Asset/veg_image1.png';
import VEGAN from '../../Asset/vegan-icon.jpg';
import { Button, IconButton } from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Chip from '@mui/material/Chip';
import axios from '../../axios.config';
import BackButton from '../../Asset/BackButton';
import { ContextForDashBord } from '../Context/contextForDashBord';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function DetailedRecipe() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const contextForDashbord = useContext(ContextForDashBord);
    const [loader, setLoader] = useState(true)
    const [StateForSerchRecipies, setStateForSerchRecipies] = useState({});

    const handleFLocalSerch = async () => {

        try {
            if (searchParams.get('search') !== null) {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipe/detailedrecipies?search=${searchParams.get('search')}`);
                setStateForSerchRecipies(res.data.recipe)
                // setStateForSerchRecipies([])
                setLoader(false)
            } else {
                navigate('/dashbord')
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    const handleSaveRecipe = async()=>{
        //code to save it on database 
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}recipe/save` , {recipe_id : searchParams.get('search')})
            const newArray = [...contextForDashbord.SAVED_RECIPE , searchParams.get('search')]
            contextForDashbord.setStateForUser(prevState =>({
                ...prevState,
                savedRecipies : [...newArray]
            }))
            // Save data for local cache 
            let newAddedRecipes = contextForDashbord.SAVED_RECIPE_DATA;
            newAddedRecipes.push({
                id: StateForSerchRecipies?.id,
                image: StateForSerchRecipies?.image,
                title: StateForSerchRecipies?.title
            })
            contextForDashbord.setStateForSavedRecipies(newAddedRecipes)
        } catch (error) {
            console.log('Error ', error)
        }
    }

    const handleRemoveSaveRecipe = async()=>{
        
        //code to save it on database 
        // try {
        //     await axios.post(`${process.env.REACT_APP_SERVER_URL}recipe/unsave` , {recipe_id : searchParams.get('search')})
        //     const newArray = contextForDashbord.SAVED_RECIPE.slice(
        //         contextForDashbord.SAVED_RECIPE.indexOf(searchParams.get('search')) , 1
        //     )
        //     contextForDashbord.setStateForUser(prevState =>({
        //         ...prevState,
        //         savedRecipies : [...newArray]
        //     }))
        // } catch (error) {
        //     console.log('Error ', error)
        // }
    }

    useEffect(() => {
        handleFLocalSerch()
    }, [])
    
    console.log("I have been run", contextForDashbord.SAVED_RECIPE);
    return (
        <>
            {loader && (
                <div className='h-auto w-full'>
                    <div className='flex flex-col justify-center items-center my-1/2 mx-1/2 h-full'>
                        <CircularProgress />
                    </div>
                </div>
            )}
            {!loader && StateForSerchRecipies !== null && (
                <main className='h-full w-full overflow-auto'>
                    {/* Container to hold recipies */}
                    <BackButton />
                    <div className='p-2'>
                        {/* Image , Attributes  */}
                        <div className='flex xl:flex-row flex-col mx-4 gap-10'>
                            <div className='xl:w-[40%] w-full h-96 '>
                                <img
                                    about='image'
                                    alt='dishImage'
                                    src={StateForSerchRecipies?.image}
                                    className='w-full h-full'
                                />
                            </div>
                            <div className='mx-3 w-full'>
                                <div className='p-4 flex flex-row justify-between'>
                                    <p className='font-semibold text-2xl mx-4 underline'>{StateForSerchRecipies.title}</p>
                                    <div className='flex flex-row gap-5'>
                                        {!StateForSerchRecipies.vegetarian && <img
                                            about='image'
                                            alt='dishImage'
                                            src={NON_VEG}
                                            className='w-12 h-12'
                                        />}
                                        {StateForSerchRecipies.vegetarian && <img
                                            about='image'
                                            alt='dishImage'
                                            src={VEG}
                                            className='w-12 h-12'
                                        />}
                                        {StateForSerchRecipies.vegan && <img
                                            about='image'
                                            alt='dishImage'
                                            src={VEGAN}
                                            className='w-12 h-12'
                                        />}
                                    </div>
                                </div>
                                <div className='mt-3 mx-5'>
                                    <ul className='text-xl font-bold'>
                                        <li className='flex flex-row'>
                                            <IconButton
                                                aria-label="upload picture"
                                                component="span"
                                                className="h-12 w-12 cursor-pointer"
                                                id={`like-btn`}
                                                style={{ color: 'black' }}
                                            >
                                                <WatchLaterIcon />
                                            </IconButton>
                                            <p className='my-auto'>{`${StateForSerchRecipies.cookingMinutes === -1 ? 10 : StateForSerchRecipies.cookingMinutes} Minutes`}</p>
                                        </li>
                                        {!contextForDashbord.SAVED_RECIPE.includes(searchParams.get('search')) && (
                                            <li className='flex flex-row justify-end'>
                                                <Button variant='outlined' color='success' onClick={handleSaveRecipe}>Want to Save ?</Button>
                                            </li>)}
                                        {contextForDashbord.SAVED_RECIPE.includes(searchParams.get('search')) && (
                                            <li className='flex flex-row justify-end'>
                                                <Button variant='contained' color='success' onClick={handleRemoveSaveRecipe}>Saved</Button>
                                            </li>)}
                                    </ul>
                                    {/* Tags */}
                                    <div className='mt-3 w-full flex flex-row flex-wrap gap-4 p-5'>
                                        {
                                            StateForSerchRecipies.dishTypes.map((item) => {
                                                return (
                                                    <Chip label={item} variant="filled" color='primary' style={{ padding: '20px 15px' }} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 p-2 h-auto'>
                        <div className='p-4'>
                            <p className='font-bold text-xl'> Detail Recipe : </p>
                            <div className='bg-slate-100 rounded-xl p-2 mt-4'>
                                <ul className='mx-10 list-disc text-lg my-2 '>
                                    {
                                        StateForSerchRecipies.summary.split('. ').map((item) => {
                                            return (
                                                <li className='text-lg mt-3'>
                                                    <p className='my-1 ml-12 text-left p-1 text-lg' dangerouslySetInnerHTML={{ __html: item + '.' }}></p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 p-4 '>
                        <p className='font-bold text-xl'> Ingredients : </p>
                        <div className='flex md:flex-row flex-col gap-4 mt-5 p-3 flex-wrap justify-center'>
                            {
                                StateForSerchRecipies.extendedIngredients.map((item, index) => {
                                    return (
                                        <div className='flex flex-col p-1 md:w-[23%] w-full h-auto' key={index}>
                                            <div className='border-b-2 text-center p-5 rounded-t-xl bg-slate-200'>
                                                <p className='font-bold text-xl underline'>{item.name}</p>
                                            </div>
                                            <div className='text-left p-3 border rounded-sm'>
                                                <p className='text-xl text-center'>{item.original}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {StateForSerchRecipies.instructions.split('.').length > 1 && (
                        <div className='mt-3 p-4'>
                            <p className='font-bold text-xl'> Note : </p>
                            <div className='bg-slate-100 rounded-xl p-2 mt-4'>
                                <ul className=' mx-10 list-disc text-lg my-2'>
                                        {StateForSerchRecipies.instructions.split('. ').map((item) => {
                                            return (
                                                <li className='text-lg mt-3'>
                                                    <p className='my-1 ml-12 text-left p-1 text-lg' dangerouslySetInnerHTML={{ __html: item + '.' }}></p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>)}
                </main>
            )}
            {StateForSerchRecipies === null && (
                <div>No Data for this recipe</div>
            )}
        </>
    )
}


// Recipit by query

//  https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&apiKey=d33f8b134bf14555b59236e0902a4d1f


//  recipi for dashbords

// https://api.spoonacular.com/recipes/complexSearch?number=50&apiKey=d33f8b134bf14555b59236e0902a4d1f


//  recipis in detail

// https://api.spoonacular.com/recipes/716426/information?includeNutrition=false&apiKey=d33f8b134bf14555b59236e0902a4d1f

