import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import View from './components/View'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './Providers/AuthProvider'
import DashboardLayout from './components/Admin/DashboardLayout'
import DashboardPostList from './components/Admin/DashboardPostList'
import RegisterAdmin from './components/Admin/RegisterAdmin'
import UserList from './components/Admin/UserList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /> </>
    },
    {
      path: '/post/:id',
      element: <><Navbar /><View /> </>
    },
    {
      path: '/login',
      element: <><Navbar /><Login /> </>
    },
    {
      path: '/dashboard/posts',
      element: <>
        <Navbar />
        <DashboardLayout>
          <DashboardPostList />
        </DashboardLayout>
      </>
    },
    {
      path: '/dashboard/register-admin',
      element: <>
        <Navbar />
        <DashboardLayout>
          <RegisterAdmin />
        </DashboardLayout>
      </>
    },
    {
      path: '/dashboard/users',
      element: <>
        <Navbar />
        <DashboardLayout>
          <UserList/>
        </DashboardLayout>
      </>
    },

  ])

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
          <ToastContainer />
      </AuthProvider>

    </>
  )
}

export default App
