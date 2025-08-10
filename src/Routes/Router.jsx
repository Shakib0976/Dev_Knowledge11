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
import MyArticle from "../Pages/MyArticle/MyArticle";
import About from "../Pages/About/About";
import PrivateRouter from "./PrivateRouter";
import { Suspense } from "react";
import Loader from "../Layouts/Loader";
import CategoryArticle from "../Pages/MyArticle/CategoryArticle";
import ProfileCard from "../Pages/Profile/Profilecard";



const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: '/register',
        Component: Register
      },

      {
        path: '/login',
        Component: Login
      },

      {
        path: '/post',
        element: <PrivateRouter><PostArticales></PostArticales></PrivateRouter>
      },
      {
        path: '/allArticle',
        Component: AllArticle
      },
      {
        path: '/allArticle/:id',
        element: <Suspense fallback={Loader}>
          <PrivateRouter> <Article></Article></PrivateRouter>
        </Suspense>,
        loader: ({ params }) => fetch(`https://dev-talks-11-server.vercel.app/allTask/${params.id}`)
      },
      {
        path: '/article',
        element: <PrivateRouter><MyArticle></MyArticle></PrivateRouter>
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: 'category/:category',
        element: <Suspense fallback={Loader}>
          <CategoryArticle></CategoryArticle>
        </Suspense>,
        loader: ({ params }) => fetch(`https://dev-talks-11-server.vercel.app/category/${params.category}`)
      },
      {
        path: '/profile',
        element:<PrivateRouter><ProfileCard></ProfileCard></PrivateRouter>
      }
    ]
  },
]);


export default router;