import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/loginpage.jsx'
import Register from './components/register.jsx'
import ServerChannels from './components/serverChannels.jsx'
import Dashboard from './components/dashboard.jsx'
import Nitro from './components/nitro.jsx'
import { Provider } from 'react-redux'
import  { store } from './store.js'
import Server from './components/server.jsx'
import FriendList from './components/ui/friendList.jsx'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/nitro',
            element: <Nitro />
          },
          {
            path: '/dashboard/friends',
            element: <FriendList />
          },
        ]
      },
      {
        path: '/dashboard/:serverId',
        element: <Server />
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
)
