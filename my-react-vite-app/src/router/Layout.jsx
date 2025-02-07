import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation.jsx"


export default function Layout() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true);
      }, []);

    return (

        <div>
            <Navigation/>
            <div>
                {isLoaded && <Outlet />}
            </div>
        </div>
    )
}
