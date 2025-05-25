import { createBrowserRouter  } from 'react-router-dom';
import Home from './components/Home';
import AppLayout from './components/AppLayout';
import AuthPopup from './components/AuthPopup';
import Settings from './components/Settings';
import FileUpload from './components/FileUpload'
import QuestionsList from './components/QuestionsList';
import { Provider } from 'react-redux';
import store from './redux/Store';
import MyQuestions from './components/MyQuestions';
export const Router = createBrowserRouter ([
  
  {
    path: '/',
    element: <Provider store={store}> <AppLayout /></Provider>,

    errorElement: <h1>Error. Please try later...</h1>,
    children: [
      { path: '/', element: <Home /> },
      { path: 'auth', element: <AuthPopup /> }, 
      { path: 'settings', element: <Settings /> }, 
      { path: 'fileupload', element: <FileUpload /> },
      { path: 'all', element: <QuestionsList /> },
      { path: 'myface', element: <MyQuestions /> },

    ],
  },
]);

