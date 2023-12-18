import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { DashBordPages , IntroPages} from './Pages';
import NavbarForDashBord from '../Dashbord/component_dashbord/Navabar';
import { ContextProviderForDashBord } from '../Context/contextForDashBord';
// import { Alert } from '@mui/material';
// import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

const RoutingForIntroPages = [
    ...IntroPages
]

const RoutingForDashBordPages = [
    ...DashBordPages
]


export default function IndexForRoute() {

    // const queryClient = new QueryClient();
    return (
        <>
            {/* <QueryClientProvider client={queryClient}> */}
            {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
            <Router basename="/">
                <Routes>
                    {RoutingForIntroPages.map((page) => {
                        return (
                            <Route
                                path={page.path}
                                element={
                                    <Suspense fallback={<div>Loading......</div>}>
                                        {page.component}
                                    </Suspense>
                                }
                            />
                        )
                    })}
                    {RoutingForDashBordPages.map((page) => {
                        return (
                            <Route
                                path={page.path}
                                element={
                                    <ContextProviderForDashBord>
                                        <div className='md:flex flex-row h-full w-full gap-1'>
                                            <div className='flex flex-col w-full'>
                                                <NavbarForDashBord />
                                                <Suspense fallback={<div>Loading......</div>}>
                                                    <div className='mt-2 overflow-auto h-full mx-2'>
                                                        {page.component}
                                                    </div>
                                                </Suspense>
                                            </div>
                                        </div>
                                     </ContextProviderForDashBord>
                                }
                            />
                        )
                    })}
                </Routes>
            </Router>
            {/* </QueryClientProvider> */}
        </>
    )
}
