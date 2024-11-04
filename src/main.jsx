import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import BstVis from './components/BstVis.jsx'
import BinaryTree from './components/BinaryTree.jsx'
import { TopicRoutes } from './components/Navigation.jsx'


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: TopicRoutes(),
    visible: true,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  </StrictMode>
);
