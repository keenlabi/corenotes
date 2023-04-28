import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./public/auth/authRoutes";
import DashboardRoutes from "./public/dashboard/dashboardRoutes";

export default function Router() {

    const allRoutes = [...AuthRoutes, ...DashboardRoutes]

    return (
        <Routes>
            {
                allRoutes.map(({path, element, children})=> {
                    return  <Route
                                key={path}
                                path={path}
                                element={element}
                            >
                                {/* create nested route from children array */}
                                {
                                    children?.map(({path, element})=> {
                                        return  <Route 
                                                    key={path}
                                                    path={path}
                                                    element={element}
                                                />
                                    })
                                }
                            </Route>
                })
            }
        </Routes>
    )
}