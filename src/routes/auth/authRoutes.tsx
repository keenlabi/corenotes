import { routerType } from "src/routes/types";
import Login from "src/pages/Auth/Login/login";

const AuthRoutes:routerType[] = [
    {
        path:'',
        title: 'Login',
        element: <Login />
    }
]

export default AuthRoutes;