import {createBrowserRouter} from "react-router-dom"
import Layout from "./Layout"
import Home from "../components/Home/Home"
import WeatherAPI from "../components/Weather/WeatherAPI"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/Weather",
                element: <WeatherAPI/>
            }
        ]
    }
])