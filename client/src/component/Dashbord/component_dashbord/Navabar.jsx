import React, { useContext } from 'react';
import { ContextForDashBord } from '../../Context/contextForDashBord'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Avatar, IconButton } from '@mui/material';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, MagnifyingGlassIcon , SwatchIcon} from '@heroicons/react/20/solid';
import axios from '../../../axios.config';
import Logo from '../../../Asset/logo';

const navigationForSideBar = [
  { name: 'Home', href: '/dashbord', icon: <HomeIcon />, current: false, inMobile: true },
  { name: 'My Book', href: '/mybook', icon: <BookOpenIcon />, current: false, device: 'mobile' },
]
const userNavigation = [
  { name: 'Your Profile', value: 'Profile', href: '#' },
  { name: 'Sign out', value: 'Logout', href: '#' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarForDashBord() {

  const navigate = useNavigate();
  const contextForDashBord = useContext(ContextForDashBord)

  const handleClickForAccount = (task) => {
    if (task === 'Logout') {
      try {
        axios.get(`${process.env.REACT_APP_SERVER_URL}logout/user`)
          .then((res) => {
            console.log("res for logout", res);
            if (res.data.logout) {
              window.location.href = '/login'
            }

          }).catch((error) => {
            alert(error.message)
          })

      } catch (error) {
        alert(`error For LogOut ${error}`)
      }
    }
  }
  const handleSerch = () => {
    const serchBar = document.getElementById('serch-bar').value;
    serchBar && navigate(`/search?item=${serchBar}`)
  }

  return (
    <>
      {/* <div className="min-h-full"> */}
      <Disclosure as="nav" className="bg-slate-200 h-auto w-full sticky -top-1 z-10 p-2 shadow-lg">
        {({ open }) => (
          <>
            <div className=" w-full px-4 sm:px-6 lg:px-8 ">
              <div className="flex h-14 items-center justify-between flex-initial">
                {/*  Company Logo */}
                <div className="flex-shrink-0 xl:flex md:flex">
                  <Logo />
                </div>
                {/*Search Bar  */}
                <div className='flex my-4'>
                  <input
                    type='text'
                    id='serch-bar'
                    className='p-2 xl:w-96 md:w-40 w-40 border border-black rounded-md'
                    placeholder='What you want to cook today ?'
                  ></input>
                  <div className='inline-block bg-white rounded-full mx-2'>
                    <IconButton
                      aria-label="Find Glass"
                      component="span"
                      className="h-12 w-12 cursor-pointer"
                      id={`like-btn`}
                      style={{ color: 'black' }}
                      onClick={handleSerch}
                    >
                      <MagnifyingGlassIcon />
                    </IconButton>
                  </div>
                </div>

                {/* Menu Bar for Search Party */}
                {/* <div className="absolute top-full xl:left-2 md:left-auto left-0 mt-2 md:w-[90%] w-full md:h-80 h-96 overflow-auto border border-gray-300 bg-white rounded-lg shadow-lg z-10 hidden" id='search-modal'>
                  <div className='p-2 text-2xl flex flex-row justify-between '>
                    <p className='my-auto text-2xl font-bold'>{`Result For you`}</p>
                    <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                        style={{ color: 'black' }}
                        onClick={handleOnBlurSerch}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className='flex flex-row'>
                    <div className='md:w-full w-full border-r'>
                      {fetchedPeople.length > 0 && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                        {fetchedPeople.map((item, index) => {
                          return (
                            <li
                              onClick={() => hanldeNavigation(item.username)}
                              key={index}
                              className="cursor-pointer">
                              <div className="flex flex-row justify-between w-full p-3">
                                <div className='flex flex-row gap-x-6'>
                                  <Avatar alt="Remy Sharp"
                                    src={item.profileImage}
                                    sx={{ width: 50, height: 50 }}
                                    className='my-2 mx-2'
                                  />
                                  <div className="min-w-0 flex-grow p-1 text-left">
                                    <p className="text-lg font-semibold leading-6 text-gray-900">{item.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">@{item.username}</p>
                                  </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                  <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-lg leading-6 text-gray-900">{item.type === 'individual' ? 'User' :
                                      item.type === 'CF' ? 'Firm' :
                                        item.type === 'product' ? 'Company' : 'User'}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>)}
                      {fetchedPeople.length === 0 && <Loading />}
                    </div>
                  </div>

                </div> */}

                {/* Icons  Big Screen */}
                <div className="hidden md:block ">
                  {/* Problem here give border and check  */}
                  <div className="flex flex-row space-x-5 h-full gap-4 p-1 items-center">
                    {navigationForSideBar.map((item) => (
                      <NavLink to={item.href} className='text-center'>
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          className="h-12 w-12 cursor-pointer"
                          id={`like-btn`}
                          style={{ color: 'black' }}
                        >
                          {item.icon}
                        </IconButton>
                        <p className='text-gray-900 text-center text-lg xl:block hidden w-auto '>{item.name}</p>
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Menu for Profile  */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          {/* <img className="h-10 w-10 rounded-full" src={contextForDashBord.USER.PROFILEIMAGE} alt="Profile" /> */}
                          <Avatar
                            alt="Remy Sharp"
                            src={contextForDashBord.USER.profileImage}
                            sx={{ width: 45, height: 45 }}
                            className="rounded-full border-4 border-white shadow-lg"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer border-b'
                                  )}
                                  onClick={() => handleClickForAccount(item.value)}
                                >
                                  {item.name}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                {/*  Mobile Screen */}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* All Items for Mobile Screen */}
            <Disclosure.Panel className="md:hidden block">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigationForSideBar.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-10 w-10 cursor-pointer mx-2 border border-blue-800"
                      id={`like-btn`}
                      style={{ color: 'black' }}
                    >
                      {item.icon}
                    </IconButton>
                    <span className='mx-2 text-black'>{item.name}</span>
                  </Link>
                ))}
              </div>
              {/*   */}
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="Remy Sharp"
                      src={''}
                      sx={{ width: 42, height: 42 }}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="ml-3">
                    {/* <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div> */}
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => handleClickForAccount(item.value)}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </  Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
