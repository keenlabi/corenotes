import Login from "../../../pages/auth/Login";
import { routerType } from "../../types";

const AuthRoutes:routerType[] = [
    {
        path:'',
        title: 'Login',
        element: <Login />
    }
]

export default AuthRoutes;