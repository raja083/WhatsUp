import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store.js'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'sonner'

//loding spinner to display when the page is loading
const isLoading=false;  //yaha pe isLoading useLoadUserQuery se ayega
const CustomSkeleton = ({ children }) => {
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomSkeleton>
        <App />
      </CustomSkeleton>
      <Toaster />
    </Provider>
  </StrictMode>
);