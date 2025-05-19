
// import { useState, useEffect } from "react"
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Alert,
//   CircularProgress,
//   Container,
//   Card,
//   CardContent,
//   Divider,
//   InputAdornment,
//   Avatar,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material"
// import {
//   Close as CloseIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../redux/Store"
// import { updateUser } from "../redux/UserSlice"
// import type { UserType } from "../types/User"

// const Settings = () => {
//   const user = useSelector((state: RootState) => state.User.user)
//   const dispatch = useDispatch<AppDispatch>()

//   const [userData, setUserData] = useState<UserType | null>(user)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   useEffect(() => {
//     if (user) {
//       setUserData(user)
//     }
//   }, [user])

//   const handleSubmit = async () => {
//     if (!userData) {
//       setError("User data is not available")
//       return
//     }

//     try {
//       setLoading(true)
//       setError("")

//       const { userName, email, password, sendQuestion, sendFeedback } = userData

//       if (user) {
//         await dispatch(
//           updateUser({
//             id: user.id,
//             userName,
//             email,
//             password,
//             points: user.points,
//             sendQuestion,
//             sendFeedback
//           }),
//         )
//         setSuccess("Your profile has been updated successfully")
//       } else {
//         setError("User is not available")
//       }
//     } catch (err) {
//       setError("Failed to update profile. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (field: keyof UserType, value: string | boolean) => {
//       if (userData) {
//         setUserData({ ...userData, [field]: value } as UserType)
//       }
//     }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   if (!user) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 8 }}>
//         <Alert severity="error">You must be logged in to access settings</Alert>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <Card elevation={2} sx={{ borderRadius: 2, overflow: "visible" }}>
//           <CardContent sx={{ p: 4 }}>
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//               <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main" }}>
//                 Account Settings
//               </Typography>
//               <IconButton onClick={() => (window.location.href = "/")}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             <Divider sx={{ mb: 4 }} />

//             <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
//               <Avatar
//                 sx={{
//                   width: 100,
//                   height: 100,
//                   bgcolor: "primary.main",
//                   fontSize: "2.5rem",
//                   mb: 2,
//                 }}
//               >
//                 {userData?.userName?.charAt(0).toUpperCase() || "U"}
//               </Avatar>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 {userData?.userName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {userData?.email}
//               </Typography>
//             </Box>

//             {error && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {error}
//               </Alert>
//             )}

//             {success && (
//               <Alert severity="success" sx={{ mb: 3 }}>
//                 {success}
//               </Alert>
//             )}

//             <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//               <TextField
//                 label="Username"
//                 fullWidth
//                 value={userData?.userName || ""}
//                 onChange={(e) => handleChange("userName", e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <TextField
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 value={userData?.email || ""}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />


//               {/* Checkbox לשליחת מיילים על שאלות חדשות */}
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={userData?.sendQuestion || false}
//                     onChange={(e) => handleChange("sendQuestion", e.target.checked)}
//                     color="primary"
//                   />
//                 }
//                 label="Send me an email when a new question is posted"
//               />

//               {/* Checkbox לשליחת מיילים על פידבקים */}
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={userData?.sendFeedback || false}
//                     onChange={(e) => handleChange("sendFeedback", e.target.checked)}
//                     color="primary"
//                   />
//                 }
//                 label="Send me an email when someone gives me feedback"
//               />


//               <TextField
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 fullWidth
//                 value={userData?.password || ""}
//                 onChange={(e) => handleChange("password", e.target.value)}
//                 InputProps={{
//                   readOnly: true, // הופך את השדה לקריאה בלבד

//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={togglePasswordVisibility} edge="end">
//                         {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   backgroundColor: "#f5f5f5", // צבע רקע שמראה שהשדה נעול
//                   "& .MuiInputBase-input.Mui-disabled": {
//                     color: "gray", // צבע טקסט שמראה שהשדה נעול
//                   },
//                 }}
//                 helperText="This field cannot be changed" // טקסט עזר שמראה שהשדה נעול
//               />

//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                   sx={{
//                     mt: 2,
//                     py: 1.5,
//                     borderRadius: 2,
//                     fontWeight: 600,
//                   }}
//                 >
//                   {loading ? "Updating..." : "Save Changes"}
//                 </Button>
//               </motion.div>
//             </Box>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Container>
//   )
// }

// export default Settings

"use client"

import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Avatar,
  FormControlLabel,
  Checkbox,
  alpha,
} from "@mui/material"
import {
  XIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SaveIcon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/Store"
import { updateUser } from "../redux/UserSlice"
import type { UserType } from "../types/User"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

const Settings = () => {
  const user = useSelector((state: RootState) => state.User.user)
  const dispatch = useDispatch<AppDispatch>()

  const [userData, setUserData] = useState<UserType | null>(user)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const handleSubmit = async () => {
    if (!userData) {
      setError("User data is not available")
      return
    }

    try {
      setLoading(true)
      setError("")

      const { userName, email, password, sendQuestion, sendFeedback } = userData

      if (user) {
        await dispatch(
          updateUser({
            id: user.id,
            userName,
            email,
            password,
            points: user.points,
            roleId: user.roleId,
            sendQuestion,
            sendFeedback,
          }),
        )
        setSuccess("Your profile has been updated successfully")
      } else {
        setError("User is not available")
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof UserType, value: string | boolean) => {
    if (userData) {
      setUserData({ ...userData, [field]: value } as UserType)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: colors.primary,
            },
          }}
          icon={<AlertCircleIcon />}
        >
          You must be logged in to access settings
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "visible",
            border: `1px solid ${alpha(colors.secondary, 0.1)}`,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 4, borderBottom: `1px solid ${alpha(colors.secondary, 0.1)}` }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: colors.secondary }}>
                  Account Settings
                </Typography>
                <IconButton
                  onClick={() => (window.location.href = "/")}
                  sx={{
                    color: colors.secondary,
                    bgcolor: alpha(colors.light, 0.7),
                    "&:hover": {
                      bgcolor: alpha(colors.light, 1),
                    },
                  }}
                >
                  <XIcon size={20} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Manage your account information and notification preferences
              </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: colors.primary,
                    fontSize: "2.5rem",
                    mb: 2,
                  }}
                >
                  {userData?.userName?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, color: colors.secondary }}>
                  {userData?.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData?.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                    bgcolor: alpha(colors.accent, 0.1),
                    color: colors.accent,
                    py: 0.5,
                    px: 2,
                    borderRadius: 10,
                  }}
                >
                  <CheckCircleIcon size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {userData?.points || 0} points
                  </Typography>
                </Box>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 4,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: colors.primary,
                    },
                  }}
                  onClose={() => setError("")}
                  icon={<AlertCircleIcon />}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 4,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: colors.accent,
                    },
                  }}
                  onClose={() => setSuccess("")}
                  icon={<CheckCircleIcon />}
                >
                  {success}
                </Alert>
              )}

              <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="Username"
                  fullWidth
                  value={userData?.userName || ""}
                  onChange={(e) => handleChange("userName", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserIcon size={20} style={{ color: colors.primary }} />
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
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={userData?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon size={20} style={{ color: colors.primary }} />
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

                <Box
                  sx={{
                    bgcolor: alpha(colors.light, 0.5),
                    borderRadius: 2,
                    p: 3,
                    border: `1px solid ${alpha(colors.secondary, 0.08)}`,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: colors.secondary,
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <BellIcon size={18} style={{ marginRight: 8 }} />
                    Notification Preferences
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData?.sendQuestion || false}
                        onChange={(e) => handleChange("sendQuestion", e.target.checked)}
                        sx={{
                          color: colors.primary,
                          "&.Mui-checked": {
                            color: colors.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: colors.secondary }}>
                          New question notifications
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Receive an email when a new question is posted
                        </Typography>
                      </Box>
                    }
                    sx={{ mb: 1, alignItems: "flex-start" }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userData?.sendFeedback || false}
                        onChange={(e) => handleChange("sendFeedback", e.target.checked)}
                        sx={{
                          color: colors.primary,
                          "&.Mui-checked": {
                            color: colors.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: colors.secondary }}>
                          Feedback notifications
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Receive an email when someone gives feedback on your questions
                        </Typography>
                      </Box>
                    }
                    sx={{ alignItems: "flex-start" }}
                  />
                </Box>

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={userData?.password || ""}
                  onChange={(e) => handleChange("password", e.target.value)}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon size={20} style={{ color: colors.primary }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ color: alpha(colors.secondary, 0.7) }}
                        >
                          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: alpha(colors.light, 0.5),
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                  helperText="This field cannot be changed"
                />

                <Divider sx={{ my: 1 }} />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon size={20} />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      bgcolor: colors.primary,
                      "&:hover": {
                        bgcolor: alpha(colors.primary, 0.9),
                      },
                      textTransform: "none",
                    }}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  )
}

export default Settings
