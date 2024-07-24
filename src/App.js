import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react'

import HomePage from './pages/Home';
import RootLayout from './pages/Root';

const singlePostLoader = async (params) => {
  const module = await import('./pages/Post');
  return module.loader(params)
}
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <Suspense callback={<p>Loading...</p>}><BlogPage /></Suspense>, loader: () => import('./pages/Blog').then(response => response.loader()) },
          {
            path: ':id', element: <Suspense callback={<p>Loading...</p>}><PostPage /></Suspense>, loader: singlePostLoader
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
