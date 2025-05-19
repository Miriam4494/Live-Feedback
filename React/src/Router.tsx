// // // // router.js
// // // import { createBrowserRouter } from 'react-router-dom';
// // // // import Home from './components/Home';        // דף הבית
// // // import Login from './components/Login';      // דף התחברות
// // // import Register from './components/Register';// דף רישום
// // // import Dashboard from './components/Dashboard'; // דף לוח בקרה
// // // import AppLayout from './components/AppLayout';  // Layout הכללי
// // // import Home from './components/Home';

// // // export const Router = createBrowserRouter([
// // //   {
// // //     path: '/',
// // //     element: <AppLayout />,
// // //     errorElement: <h1>Error. Please try later...</h1>,
// // //     children: [
// // //       { path: '/', element: <Home /> },            // דף הבית
// // //       { path: 'login', element: <Login /> },        // דף התחברות
// // //       { path: 'register', element: <Register /> },  // דף רישום
// // //       { path: 'dashboard', element: <Dashboard /> },// דף לוח בקרה
// // //     ],
// // //   },
// // // ]);
// // // App.js
// // import { createBrowserRouter } from 'react-router-dom';
// // import Home from './components/Home';
// // import Login from './components/Login';
// // import Register from './components/Register';
// // // import Dashboard from '../components/Dashboard';
// // import AppLayout from './components/AppLayout';
// // import Dashboard from './components/Dashboard';
// // import AuthPopup from './components/AuthPopup';
// // import { useState } from 'react';

// // export const Router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <AppLayout />,
// //     errorElement: <h1>Error. Please try later...</h1>,
// //     children: [
// //       { path: '/', element: <Home /> },
// //       { path: 'login', element: <Login /> },
// //       { path: 'register', element: <Register /> },
// //       { path: 'dashboard', element: <Dashboard/> },

// // //{ path: 'l', element: <AuthPopup  /> },//+




// //     ],
// //   },
// // ]);
// // import { createBrowserRouter } from 'react-router-dom';
// // import Home from './components/Home';
// // import Dashboard from './components/Dashboard';
// // import AppLayout from './components/AppLayout';
// // import AuthPopup from './components/AuthPopup';

// // export const Router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <AppLayout />,
// //     errorElement: <h1>Error. Please try later...</h1>,
// //     children: [
// //       { path: '/', element: <Home /> },
// //       { path: 'dashboard', element: <Dashboard /> }, // דף לוח בקרה

// //     ],
// //   },
// // ]);
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
// import Dashboard from './components/Dashboard';
import AppLayout from './components/AppLayout';
import AuthPopup from './components/AuthPopup';
import Settings from './components/Settings';
import FileUpload from './components/FileUpload'
import QuestionsList from './components/QuestionsList';
import { Provider } from 'react-redux';
import store from './redux/Store';
import MyQuestions from './components/MyQuestions';
export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Provider store={store}> <AppLayout /></Provider>,

    errorElement: <h1>Error. Please try later...</h1>,
    children: [
      { path: '/', element: <Home /> },
      // { path: 'dashboard', element: <Dashboard /> }, // דף לוח בקרה
      { path: 'auth', element: <AuthPopup /> }, // הנתיב החדש עבור ה-AuthPopup
      { path: 'settings', element: <Settings/>}, // הנתיב החדש עבור ה-AuthPopup
       { path: 'fileupload', element: <FileUpload/>}, 
       { path: 'all', element: <QuestionsList/>},
       { path: 'myface', element: <MyQuestions/>},

    ],
  },
]);

