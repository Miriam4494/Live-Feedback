
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Router } from './Router'

function App() {

  return (
    <>
      <RouterProvider router={Router} />  
    </>
  )
}

export default App

// import { RouterProvider } from 'react-router-dom'
// import './App.css'
// import { Router } from './Router'

// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

// const theme = createTheme({
//   typography: {
//     fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
//     h1: {
//       fontWeight: 700,
//     },
//     h2: {
//       fontWeight: 700,
//     },
//     h3: {
//       fontWeight: 700,
//     },
//     h4: {
//       fontWeight: 600,
//     },
//     h5: {
//       fontWeight: 600,
//     },
//     h6: {
//       fontWeight: 600,
//     },
//     body1: {
//       lineHeight: 1.6,
//     },
//     body2: {
//       lineHeight: 1.6,
//     },
//   },
//   palette: {
//     primary: {
//       main: "#7D5BA6", // Soft purple
//       light: "#9D7BC6",
//       dark: "#5D4186",
//     },
//     secondary: {
//       main: "#99C1B9", // Sage green
//       light: "#B9D1C9",
//       dark: "#79A199",
//     },
//     background: {
//       default: "#FFFFFF",
//       paper: "#FFFFFF",
//     },
//     text: {
//       primary: "#333333",
//       secondary: "#555555",
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           fontWeight: 500,
//           boxShadow: "none",
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//         },
//       },
//     },
//   },
// })

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <RouterProvider router={Router} />
//     </ThemeProvider>
//   )
// }

// export default App
