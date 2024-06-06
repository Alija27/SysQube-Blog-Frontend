import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import View from './components/View'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './Providers/AuthProvider'

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /> </>
    },
    {
      path: '/post',
      element: <><Navbar /><View /> </>
    },
    {
      path: '/login',
      element: <><Navbar /><Login /> </>
    }


  ])

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>

    </>
  )
}

export default App
