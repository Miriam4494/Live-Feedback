



// import { useState, useEffect } from "react"
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   InputAdornment,
//   Divider,
//   Alert,
//   CircularProgress,
//   Slide,
//   useTheme,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material"
// import {
//   Close as CloseIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Person as PersonIcon,
//   ArrowBack as ArrowBackIcon,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../redux/Store"
// import { loginAndRegisterUser, clearError } from "../redux/UserSlice"
// import type { LoginUserType, RegisterUserType } from "../types/User"
// import { useNavigate } from "react-router-dom"
// import { sendEmail } from "../services/Email"

// const AuthPopup = () => {
//   const [isLogin, setIsLogin] = useState(true)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [name, setName] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [validationError, setValidationError] = useState("")
//   const [formSubmitted, setFormSubmitted] = useState(false)
//   const [sendQuestion, setSendQuestion] = useState(false)
//   const [sendFeedback, setSendFeedback] = useState(false)


//   const { error, loading, user } = useSelector((state: RootState) => state.User)
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const theme = useTheme()

//   // Clear errors when switching between login and register
//   useEffect(() => {
//     dispatch(clearError())
//     setValidationError("")
//     setFormSubmitted(false)
//   }, [isLogin, dispatch])

//   // Add this function to properly extract error messages
//   const getErrorMessage = (error: any): string => {
//     if (typeof error === "string") return error
//     if (error && error.message) return error.message
//     if (error && error.response && error.response.data) {
//       const responseData = error.response.data

//       // Check for specific error codes and provide user-friendly messages
//       if (responseData.status === 400) {
//         if (isLogin) {
//           return "Invalid email or password. Please try again."
//         } else {
//           return "Registration failed. This email may already be in use."
//         }
//       }

//       if (responseData.status === 401) {
//         return "You are not authorized. Please log in again."
//       }

//       if (responseData.status === 403) {
//         return "You don't have permission to access this resource."
//       }

//       if (responseData.status === 404) {
//         return "User not found. Please check your credentials."
//       }

//       return responseData.message || "Authentication failed"
//     }
//     return "An unexpected error occurred"
//   }



//   const handleSendWelcomeEmail = async (user: { email: string; userName: string }) => {
//     try {
//       // await sendEmail({
//       //   to: user.email,
//       //   subject: "Welcome to Live Feedback!",
//       //   body: `<h2>Hello ${user.userName || ""},</h2><p>Thank you for joining Live Feedback!</p>`,
//       // });
//       await sendEmail({
//         to: user.email,
//         subject: "Welcome to Live Feedback!",
//         body: `
//           <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
//             <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
//               <h1 style="margin: 0; font-size: 24px;">Welcome to Live Feedback!</h1>
//             </div>
//             <div style="padding: 20px;">
//               <p>Hi <strong>${user.userName || "there"}</strong>,</p>
//               <p>Thank you for joining <strong>Live Feedback</strong>! We're excited to have you on board.</p>
//               <p>Here, you can share your questions, receive valuable feedback, and help others by sharing your insights.</p>
//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="https://your-platform.com" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Get Started</a>
//               </div>
//               <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
//               <p style="font-size: 0.9em; color: #555; text-align: center;">Thank you for joining us!<br />The Live Feedback Team</p>
//             </div>
//           </div>
//         `,
//       });
//       console.log("Welcome email sent successfully!");
//     } catch (error) {
//       console.error("Failed to send welcome email:", error);
//     }
//   };
//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate("/")
//       if(!isLogin) {
//       handleSendWelcomeEmail({ userName: user?.userName, email: user?.email })}
//     }
//   }, [user, navigate])

//   const validateForm = () => {
//     setValidationError("")

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!email) {
//       setValidationError("Email is required")
//       return false
//     } else if (!emailRegex.test(email)) {
//       setValidationError("Please enter a valid email address")
//       return false
//     }

//     // Password validation
//     if (!password) {
//       setValidationError("Password is required")
//       return false
//     } else if (password.length < 6) {
//       setValidationError("Password must be at least 6 characters long")
//       return false
//     }

//     // Registration specific validations
//     if (!isLogin) {
//       if (!name) {
//         setValidationError("Full name is required")
//         return false
//       }

//       if (password !== confirmPassword) {
//         setValidationError("Passwords do not match")
//         return false
//       }
//     }

//     return true
//   }

//   const handleSubmit = async () => {
//     setFormSubmitted(true)

//     if (!validateForm()) {
//       return
//     }

//     const requestData = isLogin
//       ? { Email: email, Password: password }
//       : { UserName: name, Email: email, Password: password, RoleId: 10, sendQuestion, sendFeedback }

//     try {
//       await dispatch(loginAndRegisterUser(requestData as unknown as LoginUserType | RegisterUserType)).unwrap()
//       // If successful, the user will be redirected by the useEffect above

//     } catch (err: any) {
//       // Error is handled by the redux state
//       console.error("Authentication error:", err)
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword)
//   }

//   return (
//     <Box sx={overlayStyle}>
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Paper elevation={3} sx={paperStyle}>
//           <Box sx={headerStyle}>
//             <Typography variant="h5" sx={titleStyle}>
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </Typography>
//             <IconButton onClick={() => navigate("/")} sx={{ color: "text.secondary" }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
//             {isLogin ? "Sign in to continue to Feedback Hub" : "Join our community to give and receive feedback"}
//           </Typography>

//           {(error || validationError) && (
//             <Slide direction="down" in={!!(error || validationError)}>
//               <Alert
//                 severity="error"
//                 sx={{
//                   mb: 3,
//                   borderRadius: 2,
//                   "& .MuiAlert-icon": {
//                     alignItems: "center",
//                   },
//                 }}
//               >
//                 {validationError || (error ? getErrorMessage(error) : "")}
//               </Alert>
//             </Slide>
//           )}

//           <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {!isLogin && (<>
//               <TextField
//                 label="Full Name"
//                 fullWidth
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 error={formSubmitted && !name}
//                 helperText={formSubmitted && !name ? "Name is required" : ""}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               {/* תיבת סימון לשליחת מיילים על שאלות חדשות */}
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     // checked={sendQuestionEmails}
//                     onChange={(e) => setSendQuestion(e.target.checked)}
//                     color="primary"
//                   />
//                 }
//                 label="Send me an email when a new question is posted"
//               />

//               {/* תיבת סימון לשליחת מיילים על פידבקים */}
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     // checked={sendFeedbackEmails}
//                     onChange={(e) => setSendFeedback(e.target.checked)}
//                     color="primary"
//                   />
//                 }
//                 label="Send me an email when someone gives me feedback"
//               />


//             </>)}







//             <TextField
//               label="Email Address"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={formSubmitted && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
//               helperText={
//                 formSubmitted && !email
//                   ? "Email is required"
//                   : formSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//                     ? "Please enter a valid email address"
//                     : ""
//               }
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <TextField
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={formSubmitted && (!password || password.length < 6)}
//               helperText={
//                 formSubmitted && !password
//                   ? "Password is required"
//                   : formSubmitted && password.length < 6
//                     ? "Password must be at least 6 characters long"
//                     : ""
//               }
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon color="primary" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={togglePasswordVisibility} edge="end">
//                       {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {!isLogin && (
//               <TextField
//                 label="Confirm Password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 fullWidth
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 error={formSubmitted && password !== confirmPassword}
//                 helperText={formSubmitted && password !== confirmPassword ? "Passwords do not match" : ""}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
//                         {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}

//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 sx={{
//                   mt: 2,
//                   py: 1.5,
//                   borderRadius: 2,
//                   fontWeight: 600,
//                   position: "relative",
//                   bgcolor: theme.palette.primary.main,
//                   "&:hover": {
//                     bgcolor: theme.palette.primary.dark,
//                   },
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Create Account"}
//               </Button>
//             </motion.div>
//           </Box>

//           <Divider sx={{ my: 3 }}>
//             <Typography variant="body2" color="text.secondary">
//               OR
//             </Typography>
//           </Divider>

//           <Box
//             onClick={() => setIsLogin(!isLogin)}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               p: 1,
//               borderRadius: 2,
//               transition: "all 0.2s",
//               "&:hover": {
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               },
//             }}
//           >
//             <ArrowBackIcon
//               fontSize="small"
//               sx={{
//                 mr: 1,
//                 color: theme.palette.primary.main,
//                 transform: isLogin ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s",
//               }}
//             />
//             <Typography
//               variant="body2"
//               align="center"
//               sx={{
//                 color: theme.palette.primary.main,
//                 fontWeight: 500,
//               }}
//             >
//               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Box>
//   )
// }

// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 999,
// }

// const paperStyle = {
//   padding: 4,
//   borderRadius: 3,
//   maxWidth: 450,
//   width: "100%",
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
// }

// const headerStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   mb: 2,
// }

// const titleStyle = {
//   fontWeight: 700,
//   color: "primary.main",
// }

// const alpha = (color: string, opacity: number) => {
//   return (
//     color +
//     Math.round(opacity * 255)
//       .toString(16)
//       .padStart(2, "0")
//   )
// }

// export default AuthPopup




import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  alpha,
  Slide,
} from "@mui/material"
import { MailIcon, LockIcon, UserIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { loginAndRegisterUser, clearError } from "../redux/UserSlice"
import { useNavigate } from "react-router-dom"
import { sendEmail } from "../services/Email"
import type { AppDispatch, RootState } from "../redux/Store"
import type { LoginUserType, RegisterUserType } from "../types/User"
const AuthPopup = () => {
  // New elegant color palette
  const colors = {
    primary: "#E07A5F", // Terracotta
    secondary: "#3D405B", // Dark slate blue
    light: "#F4F1DE", // Cream
    accent: "#81B29A", // Sage green
    dark: "#2D3142", // Dark blue-gray
  }

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [sendQuestion, setSendQuestion] = useState(false)
  const [sendFeedback, setSendFeedback] = useState(false)

  const { error, loading, user } = useSelector((state: RootState) => state.User)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  // const theme = useTheme()
  const apiUrl = import.meta.env.VITE_API_URL;

  // Clear errors when switching between login and register
  useEffect(() => {
    dispatch(clearError())
    setValidationError("")
    setFormSubmitted(false)
  }, [isLogin, dispatch])

  // Extract error messages
  const getErrorMessage = (error: any): string => {
    if (typeof error === "string") return error
    if (error && error.message) return error.message
    if (error && error.response && error.response.data) {
      const responseData = error.response.data

      if (responseData.status === 400) {
        if (isLogin) {
          return "Invalid email or password. Please try again."
        } else {
          return "Registration failed. This email may already be in use."
        }
      }

      if (responseData.status === 401) {
        return "You are not authorized. Please log in again."
      }

      if (responseData.status === 403) {
        return "You don't have permission to access this resource."
      }

      if (responseData.status === 404) {
        return "User not found. Please check your credentials."
      }

      return responseData.message || "Authentication failed"
    }
    return "An unexpected error occurred"
  }

  const handleSendWelcomeEmail = async (user: { email: string; userName: string }) => {
    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Feedback Platform!",
        body: `
          <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <div style="background-color: ${colors.primary}; color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Welcome to Feedback Platform!</h1>
            </div>
            <div style="padding: 24px;">
              <p>Hi <strong>${user.userName || "there"}</strong>,</p>
              <p>Thank you for joining <strong>Feedback Platform</strong>! We're excited to have you on board.</p>
              <p>Here, you can share your questions, receive valuable feedback, and help others by sharing your insights.</p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://your-platform.com" style="display: inline-block; padding: 12px 24px; background-color: ${colors.primary}; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Get Started</a>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="font-size: 0.9em; color: #777; text-align: center;">Thank you for joining us!<br />The Feedback Platform Team</p>
            </div>
          </div>
        `,
      })
      console.log("Welcome email sent successfully!")
    } catch (error) {
      console.error("Failed to send welcome email:", error)
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/")
      if (!isLogin) {
        handleSendWelcomeEmail({ userName: user?.userName, email: user?.email })
      }
    }
  }, [user, navigate, isLogin])

  const validateForm = () => {
    setValidationError("")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setValidationError("Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address")
      return false
    }

    // Password validation
    if (!password) {
      setValidationError("Password is required")
      return false
    } else if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long")
      return false
    }

    // Registration specific validations
    if (!isLogin) {
      if (!name) {
        setValidationError("Full name is required")
        return false
      }

      if (password !== confirmPassword) {
        setValidationError("Passwords do not match")
        return false
      }
    }

    return true
  }

  const handleSubmit = async () => {
    setFormSubmitted(true)

    if (!validateForm()) {
      return
    }

    const requestData = isLogin
      ? { Email: email, Password: password }
      : { UserName: name, Email: email, Password: password, RoleId: 1, sendQuestion, sendFeedback }

    try {
      await dispatch(loginAndRegisterUser(requestData as unknown as LoginUserType | RegisterUserType)).unwrap()
    } catch (err: any) {
      console.error("Authentication error:", err)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${colors.light} 0%, #f8f9fa 100%)`,
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Left side - Illustration/Info */}
        <Box
          sx={{
            flex: "1 1 50%",
            background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
            color: "white",
            padding: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: alpha("#fff", 0.03),
              top: "-100px",
              right: "-100px",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: alpha("#fff", 0.03),
              bottom: "-50px",
              left: "-50px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: "400px", lineHeight: 1.6 }}>
              {isLogin
                ? "Sign in to continue your journey with our feedback platform. Share your insights and grow with our community."
                : "Create an account to join our community of creators and professionals. Give and receive valuable feedback to improve your skills."}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "350px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: alpha("#fff", 0.1),
                  }}
                >
                  <MailIcon size={20} />
                </Box>
                <Typography variant="body2">Receive personalized feedback from experts</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: alpha("#fff", 0.1),
                  }}
                >
                  <UserIcon size={20} />
                </Box>
                <Typography variant="body2">Connect with a community of professionals</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: alpha("#fff", 0.1),
                  }}
                >
                  <LockIcon size={20} />
                </Box>
                <Typography variant="body2">Secure platform with privacy controls</Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Right side - Form */}
        <Box
          sx={{
            flex: "1 1 50%",
            background: "white",
            padding: { xs: 3, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: colors.secondary }}>
              {isLogin ? "Sign In" : "Create Account"}
            </Typography>

            <IconButton
              onClick={() => navigate("/")}
              sx={{
                color: colors.secondary,
                "&:hover": { background: alpha(colors.secondary, 0.05) },
              }}
            >
              <XIcon size={20} />
            </IconButton>
          </Box>

          {(error || validationError) && (
            <Slide direction="down" in={!!(error || validationError)}>
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  "& .MuiAlert-icon": { alignItems: "center" },
                }}
                onClose={() => setValidationError("")}
              >
                {validationError || (error ? getErrorMessage(error) : "")}
              </Alert>
            </Slide>
          )}

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {!isLogin && (
              <TextField
                label="Full Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={formSubmitted && !name}
                helperText={formSubmitted && !name ? "Name is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserIcon size={20} color={colors.primary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(colors.primary, 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.primary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary,
                  },
                }}
              />
            )}

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formSubmitted && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
              helperText={
                formSubmitted && !email
                  ? "Email is required"
                  : formSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "Please enter a valid email address"
                    : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon size={20} color={colors.primary} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha(colors.primary, 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.primary,
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={formSubmitted && (!password || password.length < 6)}
              helperText={
                formSubmitted && !password
                  ? "Password is required"
                  : formSubmitted && password.length < 6
                    ? "Password must be at least 6 characters long"
                    : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon size={20} color={colors.primary} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: colors.secondary }}
                    >
                      {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha(colors.primary, 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.primary,
                },
              }}
            />

            {!isLogin && (
              <>
                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={formSubmitted && password !== confirmPassword}
                  helperText={formSubmitted && password !== confirmPassword ? "Passwords do not match" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon size={20} color={colors.primary} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: colors.secondary }}
                        >
                          {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(colors.primary, 0.5),
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary,
                    },
                  }}
                />

                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, color: colors.secondary, fontWeight: 600 }}>
                    Email Preferences
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendQuestion}
                        onChange={(e) => setSendQuestion(e.target.checked)}
                        sx={{
                          color: colors.primary,
                          "&.Mui-checked": {
                            color: colors.primary,
                          },
                        }}
                      />
                    }
                    label="Send me an email when a new question is posted"
                    sx={{ mb: 1 }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendFeedback}
                        onChange={(e) => setSendFeedback(e.target.checked)}
                        sx={{
                          color: colors.primary,
                          "&.Mui-checked": {
                            color: colors.primary,
                          },
                        }}
                      />
                    }
                    label="Send me an email when someone gives me feedback"
                  />
                </Box>
              </>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  position: "relative",
                  bgcolor: colors.primary,
                  "&:hover": {
                    bgcolor: alpha(colors.primary, 0.9),
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </motion.div>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" sx={{ color: alpha(colors.secondary, 0.6) }}>
              OR
            </Typography>
          </Divider>

          <Box
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              p: 2,
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.05),
              },
            }}
          >
            <ArrowLeftIcon
              size={16}
              style={{
                marginRight: 8,
                color: colors.primary,
                transform: isLogin ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: colors.primary,
                fontWeight: 500,
              }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthPopup
