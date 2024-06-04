import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Login from "../components/Login"
import Index from "../components/Index"
import UseAuth from "../hooks/UseAuth"
import { PersonContextProvider } from "../contexts/PersonContext"

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Login /> }
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Index /> }
        ]
    }
])

function AppRoute() {
    const { user } = UseAuth();
    // console.log(user)
    const finalRouter = user?.fullname ? userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}

export default AppRoute