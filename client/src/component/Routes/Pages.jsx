import { lazy } from 'react'

const LoginPage = lazy(
    () => import('../Authentication/Login')
)
const SigninPage = lazy(
    () => import('../Authentication/SignIn')
)
const DashbordPage = lazy(
    () => import('../Dashbord/Dashbord')
)
const DetailedRecipe = lazy(
    () => import('../Dashbord/DetailedRecipe')
)
const MyBook = lazy(
    ()=>import('../Dashbord/MyBook')
)

const SearchPage = lazy(
    ()=>import('../Dashbord/SearchPage')
)

const loginMainPage  = {
    path: '/',
    component: <LoginPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}

const loginPage  = {
    path: '/login',
    component: <LoginPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}
const signinPage  = {
    path: '/signin',
    component: <SigninPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}
const dashbordPage  = {
    path: '/dashbord',
    component: <DashbordPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}
const detailsRecipePaage = {
    path: '/recipe',
    component: <DetailedRecipe/>,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}

const mybook  = {
    path: '/mybook',
    component: <MyBook />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}

const searchPage  = {
    path: '/search',
    component: <SearchPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
}

export const IntroPages = [
    loginPage , 
    signinPage ,
    loginMainPage  
] 

export const DashBordPages = [
    dashbordPage,
    mybook,
    detailsRecipePaage,
    searchPage,
]
