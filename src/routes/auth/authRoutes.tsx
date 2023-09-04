import Login from "src/pages/Auth/Login";
import ForgotPassword from "src/pages/Auth/ForgotPassword/forgotpassword";
import { routerType } from "src/routes/types";

const AuthRoutes: routerType[] = [
  {
    path: "/",
    title: "Login",
    element: <Login />,
  },
  {
    path: "/",
    title: "forgot-password",
    element: <ForgotPassword />,
  },
];

export default AuthRoutes;
