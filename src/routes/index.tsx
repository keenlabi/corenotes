import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./public/auth/authRoutes";

export default function Router() {

    const allRoutes = [...AuthRoutes]

    return (
        <Routes>
            {
                allRoutes.map(({path, element})=> {
                    return  <Route
                                path={path}
                                element={element}
                            />
                })
            }
        </Routes>
    )
}