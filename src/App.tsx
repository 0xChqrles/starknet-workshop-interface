import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from 'src/components/Layout'

import BoardPage from './pages/Board'
import HomePage from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/board/:address',
    element: (
      <Layout>
        <BoardPage />
      </Layout>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
