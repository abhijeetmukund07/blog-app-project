import './App.css';
import RootLayout from './components/rootlayout/RootLayout'
import Header from './components/header/header';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login'
import UserProfile from './components/user-profile/UserProfile'
import AuthorProfile from './components/author-profile/AuthorProfile';
import WriteArticle from './components/write-article/WriteArticle';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import SinglePost from './components/user-profile/single-post/SinglePost';
import Articles from './components/articles/Articles'

function App() {

  let browserRouter = createBrowserRouter([
    {
      path:'',
      element: <RootLayout/>,
      children:[
        {
          path:'',
          element:<Header/>
        },
        {
          path:'/signup',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path: '/user-profile',
          element: <UserProfile/>,
          children: [
            {
              path: 'articles',
              element: <Articles/>
            },
            {
              path: 'articles/:articleId',
              element: <SinglePost/>
            },
            {
              path:'',
              element: <Navigate to = "articles"/>
            }
          ]
        },
        {
          path: '/author-profile',
          element: <AuthorProfile/>,
        
          children: [
            {
            path:'new-article',
            element: <WriteArticle/>
          },
          {
            path:'articles-by-author/:author',
            element: <ArticlesByAuthor/>
          },
          {
            path: 'article/:articleId',
            element: <SinglePost/>
          },
          {
            path: '',
            element: <Navigate to = "articles-by-author/:author"/>
            // element: <Navigate to = "new-article"/>
          },
        ]
          
        },
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
