import {
  createBrowserRouter,
} from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PostArticales from "../Pages/PostArticales/PostArticales";
import ErrorPage from "../Pages/ErrorPage/Error";
import AllArticle from "../Pages/AllArticle/AllArticle";
import Article from "../Pages/AllArticle/Article";



const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true , 
            Component : Home,
        },

        {
          path:'/register',
          Component : Register
        },

        {
          path : '/login',
          Component : Login
        },

        {
          path: '/post',
          Component : PostArticales
        },
        {
          path: '/allArticle',
          Component : AllArticle
        },
        {
          path : '/allArticle/:id',
          Component: Article,
          loader : ({params}) => fetch(`http://localhost:3000/allTask/${params.id}`)
        }
    ]
  },
]);


export default router ;