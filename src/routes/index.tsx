import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth/authRoutes";
import DashboardRoutes from "./dashboard/dashboardRoutes";
import { routerType } from "./types";

export default function Router() {

    const allRoutes = [...AuthRoutes, ...DashboardRoutes]

    return (
        <Routes>
            {
                allRoutes.map((routeItem)=> {
                    return  <Route
                                key={routeItem.path}
                                path={routeItem.path}
                                element={routeItem.element}
                                children={RouteItem(routeItem)}
                            />
                })
            }
        </Routes>
    )
}

function RouteItem(route:routerType) {
    {/* create nested route from children array */}
    return route.children?.map((routeItem:routerType)=> {
        return  <Route 
                    key={routeItem.path}
                    path={routeItem.path}
                    element={routeItem.element}
                    children={ RouteItem(routeItem) }
                />
    })
}