

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import {
//   Typography,
//   List,
//   TextField,
//   Box,
//   IconButton,
//   Tooltip,
//   Popover,
//   Avatar,
//   Paper,
//   Card,
//   CardContent,
//   useTheme,
//   Button,
//   Fade,
//   Snackbar,
//   Alert,
// } from "@mui/material"
// import {
//   Reply as ReplyIcon,
//   EmojiEmotions as EmojiEmotionsIcon,
//   Send as SendIcon,
//   Cancel as CancelIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
// } from "@mui/icons-material"
// import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../redux/Store"
// import { AddFeedback } from "../redux/FeedbacksSlice"
// import { getQuestions } from "../redux/QuestionsSlice"
// import { updateUser } from "../redux/UserSlice"
// import { motion, AnimatePresence } from "framer-motion"
// import { sendEmail } from "../services/Email"
// import axios from "axios"

// export interface Feedback {
//   id?: number
//   content: string
//   questionId: number
//   userName: string
//   userEmail: string
//   parentFeedbackId?: number // ID of the original feedback (if this is a reply)
// }


// const FeedbackSection = ({ feedbacks, questionId, questionUserName, questionUserEmail, questionTitle, questionUserId }: {

//   feedbacks: Feedback[];

//   questionId: number;

//   questionUserName: string;

//   questionUserEmail: string;

//   questionTitle: string;

//   questionUserId: number;

// }) => {
//   const [newFeedback, setNewFeedback] = useState("") // State for new feedback
//   const [localFeedbacks, setLocalFeedbacks] = useState<Feedback[]>(feedbacks) // Local state for feedbacks
//   const [replyTo, setReplyTo] = useState<Feedback | null>(null) // State for specific reply
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) // Anchor for emoji picker
//   const [showAllComments, setShowAllComments] = useState(false) // State to control showing all comments
//   const [snackbarOpen, setSnackbarOpen] = useState(false) // State for snackbar
//   const [snackbarMessage, setSnackbarMessage] = useState("") // State for snackbar message
//   const feedbackEndRef = useRef<HTMLDivElement>(null) // Ref for scrolling to bottom

//   const theme = useTheme()
//   const dispatch = useDispatch<AppDispatch>()
//   const user = useSelector((state: RootState) => state.User.user)
// console.log(questionUserEmail,questionUserId);

//   // Scroll to bottom when replying
//   useEffect(() => {
//     if (replyTo && feedbackEndRef.current) {
//       feedbackEndRef.current.scrollIntoView({ behavior: "smooth" })
//     }
//   }, [replyTo])

//   // Update local feedbacks when props change
//   useEffect(() => {
//     setLocalFeedbacks(feedbacks)
//   }, [feedbacks])

//   const handleSendFeedback = async (content: string) => {
//     if (!content.trim()) return

//     if (!user) {
//       setSnackbarMessage("Please sign in to add feedback")
//       setSnackbarOpen(true)
//       return
//     }

//     const newFeedbackObject: Feedback = {
//       content: replyTo
//         ? `Replying to: "${replyTo.content.substring(0, 30)}${replyTo.content.length > 30 ? "..." : ""}"
// ${content}`
//         : content,
//       questionId,
//       userName: user?.userName || "Anonymous",
//       userEmail: user?.email || "",
//       parentFeedbackId: replyTo?.id, // If this is a reply, store the original feedback ID
//     }

//     try {
//       const resultAction = await dispatch(AddFeedback(newFeedbackObject))
//       await dispatch(getQuestions())

//       if (AddFeedback.fulfilled.match(resultAction)) {
//         setLocalFeedbacks((prev) => [...prev, { ...newFeedbackObject, id: resultAction.payload.id }])
// console.log(questionUserId);

//         const response = await axios.get(`https://localhost:7230/api/User/send/${questionUserId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         const questionUser = response.data;
//         //         // *********************
//         //         // שליחת מייל לשואל השאלה
//         //         const questionOwnerEmail = feedbacks[0]?.userEmail; // הנחת עבודה שהמייל של השואל נמצא בפידבק הראשון
//         //         if (questionOwnerEmail) {
//         //           await sendEmail({
//         //             to: questionOwnerEmail,
//         //             subject: "New Feedback on Your Question",
//         //             body: `<p>Hi,</p>
//         //             <p>You have received new feedback on your question:</p>
//         //             <blockquote>${content}</blockquote>
//         //             <p>From: ${user?.userName || "Anonymous"}</p>`,
//         //           });
//         //           console.log("📩 Feedback email sent to question owner!");
//         //         }
//         // // ***********************************
//   //       if(questionUser.sendFeedback){
//   //       await sendEmail({
//   //         to: questionUserEmail,
//   //         subject: "New Feedback on Your Question",
//   //         body: `
//   //   <p>Hi ${questionUserName},</p>
//   //   <p>You have received new feedback on your question:</p>
//   //   <p><strong>Question:</strong> ${questionTitle}</p>
//   //   <blockquote>${content}</blockquote>
//   //   <p><strong>From:</strong> ${user?.userName || "Anonymous"}</p>
//   //   <p><strong>Email:</strong> ${user?.email || "No email provided"}</p>
//   //   <p>Thank you for using our platform!</p>
//   // `,
//   //       });}
//   console.log(questionUser.sendFeedback);
//         if (questionUser.sendFeedback) {
  
  
//   await sendEmail({
//     to: questionUserEmail,
//     subject: "New Feedback on Your Question",
//     body: `
//       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
//         <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
//           <h1 style="margin: 0; font-size: 24px;">New Feedback Received!</h1>
//         </div>
//         <div style="padding: 20px;">
//           <p>Hi <strong>${questionUserName}</strong>,</p>
//           <p>Someone has left feedback on your question:</p>
//           <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: #f9f9f9; margin-bottom: 20px;">
//             <p style="margin: 0;"><strong>Question:</strong> ${questionTitle}</p>
//             <blockquote style="margin: 15px 0; padding: 15px; border-left: 4px solid #4CAF50; background-color: #f1f1f1; font-style: italic;">
//               ${content}
//             </blockquote>
//           </div>
//           <p><strong>From:</strong> ${user?.userName || "Anonymous"}</p>
//           <p><strong>Email:</strong> ${user?.email || "No email provided"}</p>
//           <div style="text-align: center; margin: 30px 0;">
//           </div>
//           <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
//           <p style="font-size: 0.9em; color: #555; text-align: center;">Thank you for using our platform!<br />The Live Feedback Team</p>
//         </div>
//       </div>
//     `,
//   });
//   // אם מסתדר אז לעשות
//             // <a href="https://your-platform.com/questions/${questionId}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Your Question</a>

// }
//       //   console.log("📩 Feedback email sent to question owner!");
//       // } else {
//       //   console.log("User opted out of feedback emails.");
//       // }




//       // Update user points
//       if (user) {
//         const updatedUser = { ...user, points: (user.points || 0) + 1 } // Add a point
//         await dispatch(updateUser(updatedUser))

//         setSnackbarMessage("Feedback added! You earned 1 point.")
//         setSnackbarOpen(true)
//       }
//     }
//     } catch (error) {
//     console.error("Error adding feedback:", error)
//     setSnackbarMessage("Failed to add feedback. Please try again.")
//     setSnackbarOpen(true)
//   } finally {
//     setNewFeedback("") // Clear feedback field
//     setReplyTo(null) // Clear reply state
//   }
// }

// const handleKeyDown = async (e: React.KeyboardEvent) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault()
//     await handleSendFeedback(newFeedback)
//   }
// }

// const handleReply = (feedback: Feedback) => {
//   setReplyTo(feedback)
//   setNewFeedback("")
// }

// const handleOpenEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl(event.currentTarget)
// }

// const handleCloseEmojiPicker = () => {
//   setAnchorEl(null)
// }

// const handleEmojiClick = async (emojiData: EmojiClickData) => {
//   const emoji = emojiData.emoji
//   await handleSendFeedback(emoji)
//   handleCloseEmojiPicker()
// }

// const cancelReply = () => {
//   setReplyTo(null)
// }

// const handleCopyEmail = (email: string) => {
//   navigator.clipboard.writeText(email)
//   setSnackbarMessage(`Email copied: ${email}`)
//   setSnackbarOpen(true)
// }

// const toggleShowAllComments = () => {
//   setShowAllComments(!showAllComments)
// }

// // Filter main feedbacks (not replies)
// const mainFeedbacks = localFeedbacks.filter((feedback) => !feedback.parentFeedbackId)

// // Determine how many to show
// const displayedFeedbacks = showAllComments ? mainFeedbacks : mainFeedbacks.slice(0, Math.min(3, mainFeedbacks.length))

// return (
//   <Card elevation={0} sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
//     <CardContent>
//       <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
//         Feedback & Comments
//       </Typography>

//       <List sx={{ mb: 3 }}>
//         {Array.isArray(localFeedbacks) && localFeedbacks.length > 0 ? (
//           <AnimatePresence>
//             {displayedFeedbacks.map((feedback, index) => (
//               <motion.div
//                 key={feedback.id || index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Box sx={{ mb: 2 }}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       bgcolor: "grey.50",
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                       <Avatar
//                         sx={{
//                           width: 32,
//                           height: 32,
//                           bgcolor: "primary.main",
//                           mr: 1,
//                           fontSize: "0.875rem",
//                         }}
//                       >
//                         {feedback.userName?.charAt(0).toUpperCase() || "?"}
//                       </Avatar>
//                       <Box>
//                         <Tooltip
//                           title={feedback.userEmail ? `Click to copy: ${feedback.userEmail}` : "No email available"}
//                           arrow
//                           placement="top"
//                         >
//                           <Typography
//                             variant="subtitle2"
//                             sx={{
//                               fontWeight: 600,
//                               cursor: feedback.userEmail ? "pointer" : "default",
//                             }}
//                             onClick={() => feedback.userEmail && handleCopyEmail(feedback.userEmail)}
//                           >
//                             {feedback.userName || "Anonymous"}
//                           </Typography>
//                         </Tooltip>
//                       </Box>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleReply(feedback)}
//                         sx={{ ml: "auto" }}
//                         color="primary"
//                       >
//                         <ReplyIcon fontSize="small" />
//                       </IconButton>
//                     </Box>

//                     <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
//                       {feedback.content}
//                     </Typography>
//                   </Paper>

//                   {/* Display replies */}
//                   {localFeedbacks
//                     .filter((reply) => reply.parentFeedbackId === feedback.id)
//                     .map((reply, replyIndex) => (
//                       <Box
//                         key={replyIndex}
//                         sx={{
//                           ml: 4,
//                           mt: 1,
//                           mb: 1,
//                         }}
//                       >
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: 2,
//                             borderRadius: 2,
//                             bgcolor: "grey.100",
//                             borderLeft: `3px solid ${theme.palette.primary.light}`,
//                           }}
//                         >
//                           <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                             <Avatar
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: "primary.light",
//                                 mr: 1,
//                                 fontSize: "0.75rem",
//                               }}
//                             >
//                               {reply.userName?.charAt(0).toUpperCase() || "?"}
//                             </Avatar>
//                             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                               {reply.userName}
//                             </Typography>
//                           </Box>
//                           <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
//                             {reply.content}
//                           </Typography>
//                         </Paper>
//                       </Box>
//                     ))}
//                 </Box>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         ) : (
//           <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
//             No feedback available. Be the first to comment!
//           </Typography>
//         )}
//       </List>

//       {mainFeedbacks.length > 3 && (
//         <Box sx={{ textAlign: "center", mb: 3 }}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={toggleShowAllComments}
//             endIcon={showAllComments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             sx={{ borderRadius: 4 }}
//           >
//             {showAllComments ? "Show Less" : `View ${mainFeedbacks.length - 3} More Comments`}
//           </Button>
//         </Box>
//       )}

//       {replyTo && (
//         <Fade in={!!replyTo}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               mb: 2,
//               p: 1.5,
//               borderRadius: 1,
//               bgcolor: "grey.100",
//             }}
//           >
//             <Typography variant="body2" sx={{ flex: 1, fontStyle: "italic" }}>
//               Replying to: {replyTo.userName} - "{replyTo.content.substring(0, 40)}
//               {replyTo.content.length > 40 ? "..." : ""}"
//             </Typography>
//             <IconButton size="small" onClick={cancelReply} color="error">
//               <CancelIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         </Fade>
//       )}

//       <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }} ref={feedbackEndRef}>
//         <TextField
//           label={replyTo ? "Write a reply" : "Add your feedback"}
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={2}
//           value={newFeedback}
//           onChange={(e) => setNewFeedback(e.target.value)}
//           onKeyDown={handleKeyDown}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 2,
//             },
//           }}
//         />
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//           <IconButton
//             color="primary"
//             onClick={handleOpenEmojiPicker}
//             sx={{
//               bgcolor: "grey.100",
//               "&:hover": {
//                 bgcolor: "grey.200",
//               },
//             }}
//           >
//             <EmojiEmotionsIcon />
//           </IconButton>
//           <IconButton
//             color="primary"
//             onClick={() => handleSendFeedback(newFeedback)}
//             disabled={!newFeedback.trim()}
//             sx={{
//               bgcolor: "primary.main",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "primary.dark",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "grey.300",
//                 color: "grey.500",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Box>
//         <Popover
//           open={Boolean(anchorEl)}
//           anchorEl={anchorEl}
//           onClose={handleCloseEmojiPicker}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//         >
//           <EmojiPicker onEmojiClick={handleEmojiClick} />
//         </Popover>
//       </Box>
//     </CardContent>

//     <Snackbar
//       open={snackbarOpen}
//       autoHideDuration={4000}
//       onClose={() => setSnackbarOpen(false)}
//       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//     >
//       <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
//         {snackbarMessage}
//       </Alert>
//     </Snackbar>
//   </Card>
// )
// }

// export default FeedbackSection


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Typography,
  List,
  TextField,
  Box,
  IconButton,
  Tooltip,
  Popover,
  Avatar,
  Paper,
  Card,
  CardContent,
  Button,
  Fade,
  Snackbar,
  Alert,
  Divider,
  alpha,
  CircularProgress,
} from "@mui/material"
import {
  ReplyIcon,
  SmileIcon,
  SendIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/Store"
import { AddFeedback } from "../redux/FeedbacksSlice"
import { getQuestions } from "../redux/QuestionsSlice"
import { updateUser } from "../redux/UserSlice"
import { motion, AnimatePresence } from "framer-motion"
import { sendEmail } from "../services/Email"
import axios from "axios"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

export interface Feedback {
  id?: number
  content: string
  questionId: number
  userName: string
  userEmail: string
  parentFeedbackId?: number // ID of the original feedback (if this is a reply)
  createAt?: Date
}

interface FeedbackSectionProps {
  feedbacks: Feedback[]
  questionId: number
  questionUserName: string
  questionUserEmail: string
  questionTitle: string
  questionUserId: number
}

const FeedbackSection = ({
  feedbacks,
  questionId,
  questionUserName,
  questionUserEmail,
  questionTitle,
  questionUserId,
}: FeedbackSectionProps) => {
  const [newFeedback, setNewFeedback] = useState("")
  const [localFeedbacks, setLocalFeedbacks] = useState<Feedback[]>(feedbacks)
  const [replyTo, setReplyTo] = useState<Feedback | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showAllComments, setShowAllComments] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const feedbackEndRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.User.user)
  const apiUrl = import.meta.env.VITE_API_URL;

  // Scroll to bottom when replying
  useEffect(() => {
    if (replyTo && feedbackEndRef.current) {
      feedbackEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [replyTo])

  // Update local feedbacks when props change
  useEffect(() => {
    setLocalFeedbacks(feedbacks)
  }, [feedbacks])

  const handleSendFeedback = async (content: string) => {
    if (!content.trim()) return

    if (!user) {
      setSnackbarMessage("Please sign in to add feedback")
      setSnackbarOpen(true)
      return
    }

    setIsSubmitting(true)

    const newFeedbackObject: Feedback = {
      content: replyTo
        ? `Replying to: "${replyTo.content.substring(0, 30)}${replyTo.content.length > 30 ? "..." : ""}"
${content}`
        : content,
      questionId,
      userName: user?.userName || "Anonymous",
      userEmail: user?.email || "",
      parentFeedbackId: replyTo?.id,
    }

    try {
      const resultAction = await dispatch(AddFeedback(newFeedbackObject))
      await dispatch(getQuestions())

      if (AddFeedback.fulfilled.match(resultAction)) {
        setLocalFeedbacks((prev) => [...prev, { ...newFeedbackObject, id: resultAction.payload.id }])

        const response = await axios.get(`${apiUrl}User/send/${questionUserId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

        const questionUser = response.data

        if (questionUser.sendFeedback) {
          await sendEmail({
            to: questionUserEmail,
            subject: "New Feedback on Your Question",
            body: `
              <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <div style="background-color: ${colors.primary}; color: white; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Feedback Received!</h1>
                </div>
                <div style="padding: 24px;">
                  <p>Hi <strong>${questionUserName}</strong>,</p>
                  <p>Someone has left feedback on your question:</p>
                  <div style="border: 1px solid #eee; padding: 16px; border-radius: 8px; background-color: #f9f9f9; margin-bottom: 20px;">
                    <p style="margin: 0;"><strong>Question:</strong> ${questionTitle}</p>
                    <blockquote style="margin: 16px 0; padding: 16px; border-left: 4px solid ${colors.primary}; background-color: #f5f5f5; font-style: italic;">
                      ${content}
                    </blockquote>
                  </div>
                  <p><strong>From:</strong> ${user?.userName || "Anonymous"}</p>
                  <p><strong>Email:</strong> ${user?.email || "No email provided"}</p>
                  <div style="text-align: center; margin: 32px 0;">
                  </div>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                  <p style="font-size: 0.9em; color: #777; text-align: center;">Thank you for using our platform!<br />The Feedback Platform Team</p>
                </div>
              </div>
            `,
          })
        }

        // Update user points
        if (user) {
          const updatedUser = { ...user, points: (user.points || 0) + 1 }
          await dispatch(updateUser(updatedUser))

          setSnackbarMessage("Feedback added! You earned 1 point.")
          setSnackbarOpen(true)
        }
      }
    } catch (error) {
      console.error("Error adding feedback:", error)
      setSnackbarMessage("Failed to add feedback. Please try again.")
      setSnackbarOpen(true)
    } finally {
      setNewFeedback("")
      setReplyTo(null)
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      await handleSendFeedback(newFeedback)
    }
  }

  const handleReply = (feedback: Feedback) => {
    setReplyTo(feedback)
    setNewFeedback("")
  }

  const handleOpenEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null)
  }

  // Modified to send emoji directly
  const handleEmojiClick = async (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji
    await handleSendFeedback(emoji)
    handleCloseEmojiPicker()
  }

  const cancelReply = () => {
    setReplyTo(null)
  }

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setSnackbarMessage(`Email copied: ${email}`)
    setSnackbarOpen(true)
  }

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments)
  }

  // Filter main feedbacks (not replies)
  const mainFeedbacks = localFeedbacks.filter((feedback) => !feedback.parentFeedbackId)

  // Determine how many to show
  const displayedFeedbacks = showAllComments ? mainFeedbacks : mainFeedbacks.slice(0, Math.min(3, mainFeedbacks.length))

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        border: `1px solid ${alpha(colors.secondary, 0.1)}`,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(colors.secondary, 0.1)}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.secondary, mb: 1 }}>
            Feedback & Comments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Share your thoughts and insights on this question
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          {Array.isArray(localFeedbacks) && localFeedbacks.length > 0 ? (
            <List sx={{ mb: 3, p: 0 }}>
              <AnimatePresence>
                {displayedFeedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: alpha(colors.light, 0.5),
                          border: `1px solid ${alpha(colors.secondary, 0.08)}`,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor: colors.primary,
                              mr: 1.5,
                              fontSize: "0.875rem",
                            }}
                          >
                            {feedback.userName?.charAt(0).toUpperCase() || <UserIcon size={16} />}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Tooltip
                              title={feedback.userEmail ? `Click to copy: ${feedback.userEmail}` : "No email available"}
                              arrow
                              placement="top"
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  cursor: feedback.userEmail ? "pointer" : "default",
                                  color: colors.secondary,
                                }}
                                onClick={() => feedback.userEmail && handleCopyEmail(feedback.userEmail)}
                              >
                                {feedback.userName || "Anonymous"}
                              </Typography>
                            </Tooltip>
                            {feedback.createAt && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CalendarIcon size={12} style={{ marginRight: 4 }} />
                                {new Date(feedback.createAt).toLocaleDateString()}
                              </Typography>
                            )}
                          </Box>
                          <Tooltip title="Reply">
                            <IconButton
                              size="small"
                              onClick={() => handleReply(feedback)}
                              sx={{
                                color: colors.primary,
                                "&:hover": {
                                  bgcolor: alpha(colors.primary, 0.05),
                                },
                              }}
                            >
                              <ReplyIcon size={18} />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "pre-wrap",
                            color: colors.secondary,
                            lineHeight: 1.6,
                          }}
                        >
                          {feedback.content}
                        </Typography>
                      </Paper>

                      {/* Display replies */}
                      {localFeedbacks
                        .filter((reply) => reply.parentFeedbackId === feedback.id)
                        .map((reply, replyIndex) => (
                          <Box
                            key={replyIndex}
                            sx={{
                              ml: 5,
                              mt: 2,
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: -16,
                                top: 0,
                                bottom: 0,
                                width: 2,
                                bgcolor: alpha(colors.primary, 0.2),
                              }}
                            />
                            <Paper
                              elevation={0}
                              sx={{
                                p: 3,
                                borderRadius: 2,
                                bgcolor: "white",
                                border: `1px solid ${alpha(colors.secondary, 0.08)}`,
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: alpha(colors.primary, 0.8),
                                    mr: 1.5,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {reply.userName?.charAt(0).toUpperCase() || <UserIcon size={14} />}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.secondary }}>
                                    {reply.userName || "Anonymous"}
                                  </Typography>
                                  {reply.createAt && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ display: "flex", alignItems: "center" }}
                                    >
                                      <CalendarIcon size={12} style={{ marginRight: 4 }} />
                                      {new Date(reply.createAt).toLocaleDateString()}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  whiteSpace: "pre-wrap",
                                  color: colors.secondary,
                                  lineHeight: 1.6,
                                }}
                              >
                                {reply.content}
                              </Typography>
                            </Paper>
                          </Box>
                        ))}
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          ) : (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
                bgcolor: alpha(colors.light, 0.3),
                borderRadius: 2,
                mb: 3,
              }}
            >
              <UserIcon size={32} style={{ color: alpha(colors.secondary, 0.3), marginBottom: 16 }} />
              <Typography variant="body1" sx={{ fontWeight: 500, color: colors.secondary, mb: 1 }}>
                No comments yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to share your thoughts on this question
              </Typography>
            </Box>
          )}

          {mainFeedbacks.length > 3 && (
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={toggleShowAllComments}
                endIcon={showAllComments ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  borderColor: alpha(colors.secondary, 0.3),
                  color: colors.secondary,
                  "&:hover": {
                    bgcolor: alpha(colors.secondary, 0.05),
                    borderColor: colors.secondary,
                  },
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {showAllComments ? "Show Less" : `View ${mainFeedbacks.length - 3} More Comments`}
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box ref={feedbackEndRef}>
            {replyTo && (
              <Fade in={!!replyTo}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(colors.light, 0.5),
                    border: `1px solid ${alpha(colors.secondary, 0.08)}`,
                  }}
                >
                  <Typography variant="body2" sx={{ flex: 1, fontStyle: "italic", color: colors.secondary }}>
                    Replying to: {replyTo.userName} - "{replyTo.content.substring(0, 40)}
                    {replyTo.content.length > 40 ? "..." : ""}"
                  </Typography>
                  <IconButton size="small" onClick={cancelReply} sx={{ color: colors.secondary }}>
                    <XIcon size={16} />
                  </IconButton>
                </Box>
              </Fade>
            )}

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.secondary }}>
              {replyTo ? "Write your reply" : "Add your comment"}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                placeholder="Share your thoughts..."
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(colors.primary, 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.primary,
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Tooltip title="Add emoji">
                  <IconButton
                    onClick={handleOpenEmojiPicker}
                    sx={{
                      bgcolor: alpha(colors.light, 0.7),
                      color: colors.secondary,
                      "&:hover": {
                        bgcolor: alpha(colors.light, 1),
                      },
                      width: 40,
                      height: 40,
                    }}
                  >
                    <SmileIcon size={20} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Send comment">
                  <span>
                    <IconButton
                      onClick={() => handleSendFeedback(newFeedback)}
                      disabled={!newFeedback.trim() || isSubmitting}
                      sx={{
                        bgcolor: colors.primary,
                        color: "white",
                        "&:hover": {
                          bgcolor: alpha(colors.primary, 0.9),
                        },
                        "&.Mui-disabled": {
                          bgcolor: alpha(colors.secondary, 0.1),
                          color: alpha(colors.secondary, 0.3),
                        },
                        width: 40,
                        height: 40,
                      }}
                    >
                      {isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon size={20} />}
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseEmojiPicker}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiPopover-paper": {
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </Popover>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: colors.primary,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default FeedbackSection
