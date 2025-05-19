// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../redux/Store"
// import {
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   ImageList,
//   ImageListItem,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   TextField,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   Container,
//   Paper,
//   Avatar,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import {
//   MoreVert as MoreVertIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   CloudUpload as CloudUploadIcon,
//   Image as ImageIcon,
//   Feedback as FeedbackIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material"
// import ShowFile from "./ShowFile"
// import type { Question } from "./QuestionsList"
// import { deleteQuestion, getQuestions, updateQuestion } from "../redux/QuestionsSlice"
// import axios from "axios"
// import { motion, AnimatePresence } from "framer-motion"

// const API_BASE_URL = "https://localhost:7230/api/"

// const MyQuestions = () => {
//   const currentUser = useSelector((state: RootState) => state.User?.user)
//   const [myQuestions, setMyQuestions] = useState<Question[]>([])
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [selectedQuestion, setSelectedQuestion] = useState<Question>({} as Question)
//   const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [initialLoading, setInitialLoading] = useState(true)
//   const [success, setSuccess] = useState("")
//   const [error, setError] = useState("")
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
//   const [uploadLoading, setUploadLoading] = useState(false)
//   const [expandedFeedbackQuestionId, setExpandedFeedbackQuestionId] = useState<number | null>(null)

//   const theme = useTheme()
//   // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

//   const dispatch: AppDispatch = useDispatch()

//   // Fetch questions on component mount
//   useEffect(() => {
//     console.log(currentUser);
//     const fetchQuestions = async () => {
//       try {
//     // console.log(currentUser);

//         setInitialLoading(true)
//         // const questions = await dispatch(getMYQuestions(currentUser?.id)).unwrap()
//         setMyQuestions(currentUser?.questions || []) // שמירה ישירה ל-state המקומי
//         // console.log(myQuestions);
        
//       } catch (err) {
//         setError("Failed to load questions. Please try again.")
//       } finally {
//         setInitialLoading(false)
//       }
//     }
  
//     fetchQuestions()
//   }, [dispatch])
 
//   // Update local state when user data changes
//   useEffect(() => {
//     if (currentUser?.questions) {
//       console.log(currentUser);
      
//       setMyQuestions(currentUser.questions || [])
//     }
//   }, [currentUser])
//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, question: Question) => {
//     setAnchorEl(event.currentTarget)
//     setSelectedQuestion(question)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleEdit = () => {
//     if (selectedQuestion) {
//       setEditingQuestionId(selectedQuestion.id)
//     }
//     handleMenuClose()
//   }

//   const handleDeleteClick = () => {
//     handleMenuClose()
//     setDeleteConfirmOpen(true)
//   }

//   const handleDeleteConfirm = async () => {
//     setLoading(true)
//     try {
//       if (selectedQuestion) {
//         await dispatch(deleteQuestion(selectedQuestion.id))
//         setMyQuestions((prev) => prev.filter((q) => q.id !== selectedQuestion.id))
//         setSuccess("Question deleted successfully")
//       }
//     } catch (err) {
//       setError("Failed to delete question. Please try again.")
//     } finally {
//       setLoading(false)
//       setDeleteConfirmOpen(false)
//     }
//   }

//   const handleFieldChange = (questionId: number, field: keyof Question, value: any) => {
//     setMyQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
//     if (selectedQuestion?.id === questionId) {
//       setSelectedQuestion((prev) => ({
//         ...prev!,
//         [field]: value,
//         feedbacks: prev?.feedbacks || [],
//       }))
//     }
//   }

//   const handleDeleteImage = (questionId: number, imageId: number) => {
//     setMyQuestions((prev) => {
//       const updatedQuestions = prev.map((q) =>
//         q.id === questionId ? { ...q, images: q.images.filter((img) => img.id !== imageId) } : q,
//       )

//       if (selectedQuestion?.id === questionId) {
//         const updatedQuestion = updatedQuestions.find((q) => q.id === questionId)
//         setSelectedQuestion(updatedQuestion!)
//       }

//       return updatedQuestions
//     })
//   }

//   const handleDeleteFeedback = (questionId: number, feedbackId: number) => {
//     setMyQuestions((prev) => {
//       const updatedQuestions = prev.map((q) =>
//         q.id === questionId ? { ...q, feedbacks: q.feedbacks.filter((fb) => fb.id !== feedbackId) } : q,
//       )
//       if (selectedQuestion?.id === questionId) {
//         const updatedQuestion = updatedQuestions.find((q) => q.id === questionId)
//         setSelectedQuestion(updatedQuestion!)
//       }
//       return updatedQuestions
//     })
//   }

//   const handleUploadImage = async (questionId: number, file: File) => {
//     try {
//       setUploadLoading(true)

//       // Get URL for S3 upload
//       const uploadUrlResponse = await axios.get(`${API_BASE_URL}S3/upload-url`, {
//         params: { fileName: file.name, contentType: file.type },
//       })

//       // Upload file to S3
//       await axios.put(uploadUrlResponse.data.url, file, {
//         headers: { "Content-Type": file.type },
//       })

//       // Get download URL
//       const downloadUrlResponse = await axios.get(`${API_BASE_URL}S3/download-url/${file.name}`)

//       // Create new image object
//       const newImage = {
//         id: Date.now(),
//         imageUrl: downloadUrlResponse.data.downloadUrl,
//         questionId: questionId,
//         name: file.name,
//       }

//       // Update questions state
//       setMyQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, images: [...q.images, newImage] } : q)))

//       // Update selected question if needed
//       if (selectedQuestion?.id === questionId) {
//         setSelectedQuestion((prev) => ({
//           ...prev!,
//           images: [...(prev!.images || []), newImage],
//         }))
//       }

//       setSuccess("File uploaded successfully!")
//     } catch (error) {
//       console.error("Failed to upload file:", error)
//       setError("Failed to upload file. Please try again.")
//     } finally {
//       setUploadLoading(false)
//     }
//   }

//   const saveChanges = async () => {
//     if (selectedQuestion) {
//       setLoading(true)
//       try {
//         const updatedQuestion = await dispatch(
//           updateQuestion({
//             ...selectedQuestion,
//             userName: currentUser?.userName || "",
//           }),
//         ).unwrap()

//         await dispatch(getQuestions())

//         // Update local state
//         setMyQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))

//         // Reset editing state
//         setEditingQuestionId(null)
//         setSuccess("Question updated successfully!")
//       } catch (error) {
//         console.error("Failed to save changes:", error)
//         setError("Failed to update question. Please try again.")
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   const cancelEdit = () => {
//     // Reset to original data
//     if (currentUser?.questions) {
//       const originalQuestion = currentUser.questions.find((q) => q.id === editingQuestionId)
//       if (originalQuestion) {
//         setSelectedQuestion(originalQuestion)
//         setMyQuestions((prev) => prev.map((q) => (q.id === editingQuestionId ? originalQuestion : q)))
//       }
//     }
//     setEditingQuestionId(null)
//   }

//   const refreshQuestions = async () => {
//     try {
//       setLoading(true)
//       await dispatch(getQuestions()).unwrap()
//       setSuccess("Questions refreshed successfully")
//     } catch (err) {
//       setError("Failed to refresh questions. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const toggleExpandedFeedbacks = (questionId: number) => {
//     setExpandedFeedbackQuestionId((prevId) => (prevId === questionId ? null : questionId))
//   }

//   if (!currentUser) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error">You must be logged in to view your questions.</Alert>
//       </Container>
//     )
//   }

//   if (initialLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//           <CircularProgress size={60} thickness={4} />
//         </Box>
//       </Container>
//     )
//   }

//   if (myQuestions.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
//             My Questions
//           </Typography>
//           <Button
//             variant="outlined"
//             startIcon={<RefreshIcon />}
//             onClick={refreshQuestions}
//             disabled={loading}
//             sx={{ borderRadius: 2 }}
//           >
//             {loading ? "Refreshing..." : "Refresh"}
//           </Button>
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
//             {error}
//           </Alert>
//         )}

//         <Paper
//           elevation={0}
//           sx={{
//             p: 6,
//             textAlign: "center",
//             borderRadius: 2,
//             border: "1px dashed",
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             You haven't asked any questions yet
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Start by asking a question to get feedback from the community
//           </Typography>
//           <Button
//             variant="contained"
//             component="a"
//             href="/fileupload"
//             sx={{
//               borderRadius: 2,
//               px: 4,
//               py: 1.5,
//               fontWeight: 600,
//             }}
//           >
//             Ask a Question
//           </Button>
//         </Paper>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//         <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
//           My Questions
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <Button
//             variant="outlined"
//             startIcon={<RefreshIcon />}
//             onClick={refreshQuestions}
//             disabled={loading}
//             sx={{ borderRadius: 2 }}
//           >
//             {loading ? "Refreshing..." : "Refresh"}
//           </Button>
//           <Button
//             variant="contained"
//             component="a"
//             href="/fileupload"
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               py: 1,
//               fontWeight: 600,
//             }}
//           >
//             Ask New Question
//           </Button>
//         </Box>
//       </Box>

//       {success && (
//         <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>
//           {success}
//         </Alert>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
//           {error}
//         </Alert>
//       )}

//       <AnimatePresence>
//         {myQuestions.map((question) => (
//           <motion.div
//             key={question.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card
//               elevation={2}
//               sx={{
//                 mb: 3,
//                 position: "relative",
//                 borderRadius: 2,
//                 overflow: "visible",
//               }}
//             >
//               <CardContent sx={{ p: 3 }}>
//                 {editingQuestionId === question.id ? (
//                   <Box component="form">
//                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "primary.main" }}>
//                       Edit Question
//                     </Typography>
//                     <Divider sx={{ mb: 3 }} />

//                     <TextField
//                       fullWidth
//                       label="Title"
//                       value={question.title}
//                       onChange={(e) => handleFieldChange(question.id, "title", e.target.value)}
//                       sx={{ mb: 3 }}
//                     />

//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label="Content"
//                       value={question.content}
//                       onChange={(e) => handleFieldChange(question.id, "content", e.target.value)}
//                       sx={{ mb: 3 }}
//                     />

//                     <Box sx={{ mb: 3 }}>
//                       <Typography
//                         variant="subtitle1"
//                         gutterBottom
//                         sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
//                       >
//                         <ImageIcon sx={{ mr: 1 }} fontSize="small" />
//                         Images & Attachments
//                       </Typography>
//                       {question.images.length > 0 ? (
//                         <ImageList cols={isTablet ? 2 : 3} gap={16} sx={{ mb: 2 }}>
//                           {question.images.map((image) => (
//                             <ImageListItem
//                               key={image.id}
//                               sx={{
//                                 borderRadius: 2,
//                                 overflow: "hidden",
//                                 border: "1px solid",
//                                 borderColor: "divider",
//                                 position: "relative",
//                                 height: 150,
//                               }}
//                             >
//                               <ShowFile fileName={image.name} height={150} />
//                               <IconButton
//                                 onClick={() => handleDeleteImage(question.id, image.id)}
//                                 sx={{
//                                   position: "absolute",
//                                   top: 8,
//                                   right: 8,
//                                   bgcolor: "rgba(255,255,255,0.9)",
//                                   "&:hover": {
//                                     bgcolor: "rgba(255,255,255,1)",
//                                   },
//                                 }}
//                                 size="small"
//                               >
//                                 <DeleteIcon fontSize="small" color="error" />
//                               </IconButton>
//                             </ImageListItem>
//                           ))}
//                         </ImageList>
//                       ) : (
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                           No images or attachments
//                         </Typography>
//                       )}

//                       <Button
//                         variant="outlined"
//                         component="label"
//                         startIcon={uploadLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
//                         disabled={uploadLoading}
//                         sx={{
//                           borderRadius: 2,
//                           py: 1,
//                         }}
//                       >
//                         {uploadLoading ? "Uploading..." : "Upload File"}
//                         <input
//                           type="file"
//                           hidden
//                           accept=".png, .jpg, .jpeg, .pdf, .mp3, .wav, .doc, .docx"
//                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                             if (e.target.files && e.target.files[0]) {
//                               handleUploadImage(question.id, e.target.files[0])
//                             }
//                           }}
//                         />
//                       </Button>
//                     </Box>

//                     <Box sx={{ mb: 3 }}>
//                       <Typography
//                         variant="subtitle1"
//                         gutterBottom
//                         sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
//                       >
//                         <FeedbackIcon sx={{ mr: 1 }} fontSize="small" />
//                         Feedbacks
//                       </Typography>

//                       {question.feedbacks.length > 0 ? (
//                         <List sx={{ bgcolor: "grey.50", borderRadius: 2, p: 2 }}>
//                           {question.feedbacks.map((feedback) => (
//                             <ListItem
//                               key={feedback.id}
//                               secondaryAction={
//                                 <IconButton
//                                   edge="end"
//                                   onClick={() => handleDeleteFeedback(question.id!, feedback.id!)}
//                                   size="small"
//                                 >
//                                   <DeleteIcon fontSize="small" color="error" />
//                                 </IconButton>
//                               }
//                               sx={{
//                                 mb: 1,
//                                 bgcolor: "background.paper",
//                                 borderRadius: 1,
//                                 boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//                               }}
//                             >
//                               <ListItemText
//                                 primary={feedback.content}
//                                 secondary={feedback.userName ? `By: ${feedback.userName}` : undefined}
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           No feedback received yet
//                         </Typography>
//                       )}
//                     </Box>

//                     <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                       <Button
//                         variant="outlined"
//                         color="inherit"
//                         onClick={cancelEdit}
//                         startIcon={<CancelIcon />}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={saveChanges}
//                         disabled={loading}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         {loading ? "Saving..." : "Save Changes"}
//                       </Button>
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         {question.title}
//                       </Typography>
//                       <IconButton
//                         onClick={(event) => handleMenuOpen(event, question)}
//                         size="small"
//                         sx={{
//                           ml: 1,
//                           bgcolor: "grey.100",
//                           "&:hover": {
//                             bgcolor: "grey.200",
//                           },
//                         }}
//                       >
//                         <MoreVertIcon fontSize="small" />
//                       </IconButton>
//                     </Box>

//                     <Typography variant="body1" sx={{ mb: 3 }}>
//                       {question.content}
//                     </Typography>
//                     {question.images.length}
//                     {question.images && question.images.length > 0 && (
//                       <Box sx={{ mb: 3 }}>
//                         <Typography
//                           variant="subtitle2"
//                           gutterBottom
//                           sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
//                         >
//                           <ImageIcon sx={{ mr: 1, fontSize: 18 }} />
//                           Attachments ({question.images.length})
//                         </Typography>
//                         <ImageList cols={isTablet ? 2 : 3} gap={8} sx={{ maxHeight: 200, overflow: "auto" }}>
//                           {question.images.map((image) => (
//                             <ImageListItem
//                               key={image.id}
//                               sx={{
//                                 borderRadius: 1,
//                                 overflow: "hidden",
//                                 border: "1px solid",
//                                 borderColor: "divider",
//                                 position: "relative",
//                                 height: 150,
//                               }}
//                             >
//                               <ShowFile fileName={image.name} height={150} />
//                             </ImageListItem>
//                           ))}
//                         </ImageList>
//                       </Box>
//                     )}

//                     {question.feedbacks && question.feedbacks.length > 0 && (
//                       <Box sx={{ mt: 2 }}>
//                         <Typography
//                           variant="subtitle2"
//                           gutterBottom
//                           sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
//                         >
//                           <FeedbackIcon sx={{ mr: 1, fontSize: 18 }} />
//                           Feedback ({question.feedbacks.length})
//                         </Typography>
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: 2,
//                             bgcolor: "grey.50",
//                             borderRadius: 2,
//                             maxHeight: expandedFeedbackQuestionId === question.id ? "none" : 200,
//                             overflow: "auto",
//                           }}
//                         >
//                           {question.feedbacks
//                             .slice(0, expandedFeedbackQuestionId === question.id ? question.feedbacks.length : 3)
//                             .map((feedback, index) => (
//                               <Box
//                                 key={feedback.id}
//                                 sx={{
//                                   mb:
//                                     index <
//                                     (expandedFeedbackQuestionId === question.id ? question.feedbacks.length - 1 : 2)
//                                       ? 2
//                                       : 0,
//                                 }}
//                               >
//                                 <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
//                                   <Avatar
//                                     sx={{
//                                       width: 24,
//                                       height: 24,
//                                       fontSize: "0.75rem",
//                                       bgcolor: "primary.main",
//                                       mr: 1,
//                                     }}
//                                   >
//                                     {feedback.userName?.charAt(0).toUpperCase() || "?"}
//                                   </Avatar>
//                                   <Typography variant="caption" color="text.secondary">
//                                     {feedback.userName || "Anonymous"}
//                                   </Typography>
//                                 </Box>
//                                 <Typography variant="body2">{feedback.content}</Typography>
//                                 {index <
//                                   (expandedFeedbackQuestionId === question.id ? question.feedbacks.length - 1 : 2) &&
//                                   question.feedbacks.length > 1 && <Divider sx={{ mt: 2 }} />}
//                               </Box>
//                             ))}
//                           {question.feedbacks.length > 3 && (
//                             <Typography
//                               variant="body2"
//                               color="primary"
//                               onClick={() => toggleExpandedFeedbacks(question.id)}
//                               sx={{
//                                 mt: 1,
//                                 textAlign: "center",
//                                 fontWeight: 500,
//                                 cursor: "pointer",
//                                 "&:hover": {
//                                   textDecoration: "underline",
//                                 },
//                               }}
//                             >
//                               {expandedFeedbackQuestionId === question.id
//                                 ? "Show less"
//                                 : `View ${question.feedbacks.length - 3} more ${question.feedbacks.length - 3 === 1 ? "comment" : "comments"}`}
//                             </Typography>
//                           )}
//                         </Paper>
//                       </Box>
//                     )}
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       {/* Menu for question actions */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={handleEdit}>
//           <EditIcon fontSize="small" sx={{ mr: 1 }} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
//           <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
//           Delete
//         </MenuItem>
//       </Menu>

//       {/* Delete confirmation dialog */}
//       <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete this question? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteConfirm}
//             color="error"
//             variant="contained"
//             disabled={loading}
//             startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   )
// }

// export default MyQuestions


"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/Store"
import {
  Card,
  CardContent,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  Menu,
  MenuItem,
  Container,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  alpha,
} from "@mui/material"
import {
  MoreVerticalIcon,
  TrashIcon,
  PencilIcon,
  SaveIcon,
  XIcon,
  UploadCloudIcon,
  ImageIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "lucide-react"
import ShowFile from "./ShowFile"
import type { Question } from "./QuestionsList"
import { deleteQuestion, getQuestions, updateQuestion } from "../redux/QuestionsSlice"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@mui/material/styles"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

const API_BASE_URL = "https://localhost:7230/api/"

const MyQuestions = () => {
  const currentUser = useSelector((state: RootState) => state.User?.user)
  const [myQuestions, setMyQuestions] = useState<Question[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<Question>({} as Question)
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [expandedFeedbackQuestionId, setExpandedFeedbackQuestionId] = useState<number | null>(null)

  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const dispatch: AppDispatch = useDispatch()

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setInitialLoading(true)
        setMyQuestions(currentUser?.questions || [])
      } catch (err) {
        setError("Failed to load questions. Please try again.")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchQuestions()
  }, [dispatch, currentUser])

  // Update local state when user data changes
  useEffect(() => {
    if (currentUser?.questions) {
      setMyQuestions(currentUser.questions || [])
    }
  }, [currentUser])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, question: Question) => {
    setAnchorEl(event.currentTarget)
    setSelectedQuestion(question)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedQuestion) {
      setEditingQuestionId(selectedQuestion.id)
    }
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setLoading(true)
    try {
      if (selectedQuestion) {
        await dispatch(deleteQuestion(selectedQuestion.id))
        setMyQuestions((prev) => prev.filter((q) => q.id !== selectedQuestion.id))
        setSuccess("Question deleted successfully")
      }
    } catch (err) {
      setError("Failed to delete question. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
    }
  }

  const handleFieldChange = (questionId: number, field: keyof Question, value: any) => {
    setMyQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion((prev: Question | null) => ({
        ...prev!,
        [field]: value,
        feedbacks: prev?.feedbacks || [],
      }))
    }
  }

  const handleDeleteImage = (questionId: number, imageId: number) => {
    setMyQuestions((prev) => {
      const updatedQuestions = prev.map((q) =>
        q.id === questionId ? { ...q, images: q.images.filter((img) => img.id !== imageId) } : q,
      )

      if (selectedQuestion?.id === questionId) {
        const updatedQuestion = updatedQuestions.find((q) => q.id === questionId)
        setSelectedQuestion(updatedQuestion!)
      }

      return updatedQuestions
    })
  }

  const handleDeleteFeedback = (questionId: number, feedbackId: number) => {
    setMyQuestions((prev) => {
      const updatedQuestions = prev.map((q) =>
        q.id === questionId ? { ...q, feedbacks: q.feedbacks.filter((fb) => fb.id !== feedbackId) } : q,
      )
      if (selectedQuestion?.id === questionId) {
        const updatedQuestion = updatedQuestions.find((q) => q.id === questionId)
        setSelectedQuestion(updatedQuestion!)
      }
      return updatedQuestions
    })
  }

  const handleUploadImage = async (questionId: number, file: File) => {
    try {
      setUploadLoading(true)

      // Get URL for S3 upload
      const uploadUrlResponse = await axios.get(`${API_BASE_URL}S3/upload-url`, {
        params: { fileName: file.name, contentType: file.type },
      })

      // Upload file to S3
      await axios.put(uploadUrlResponse.data.url, file, {
        headers: { "Content-Type": file.type },
      })

      // Get download URL
      const downloadUrlResponse = await axios.get(`${API_BASE_URL}S3/download-url/${file.name}`)

      // Create new image object
      const newImage = {
        id: Date.now(),
        imageUrl: downloadUrlResponse.data.downloadUrl,
        questionId: questionId,
        name: file.name,
      }

      // Update questions state
      setMyQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, images: [...q.images, newImage] } : q)))

      // Update selected question if needed
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion((prev) => ({
          ...prev!,
          images: [...(prev!.images || []), newImage],
        }))
      }

      setSuccess("File uploaded successfully!")
    } catch (error) {
      console.error("Failed to upload file:", error)
      setError("Failed to upload file. Please try again.")
    } finally {
      setUploadLoading(false)
    }
  }

  const saveChanges = async () => {
    if (selectedQuestion) {
      setLoading(true)
      try {
        const updatedQuestion = await dispatch(
          updateQuestion({
            ...selectedQuestion,
            userName: currentUser?.userName || "",
          }),
        ).unwrap()

        await dispatch(getQuestions())

        // Update local state
        setMyQuestions((prev) => prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))

        // Reset editing state
        setEditingQuestionId(null)
        setSuccess("Question updated successfully!")
      } catch (error) {
        console.error("Failed to save changes:", error)
        setError("Failed to update question. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const cancelEdit = () => {
    // Reset to original data
    if (currentUser?.questions) {
      const originalQuestion = currentUser.questions.find((q) => q.id === editingQuestionId)
      if (originalQuestion) {
        setSelectedQuestion(originalQuestion)
        setMyQuestions((prev) => prev.map((q) => (q.id === editingQuestionId ? originalQuestion : q)))
      }
    }
    setEditingQuestionId(null)
  }

  const refreshQuestions = async () => {
    try {
      setLoading(true)
      await dispatch(getQuestions()).unwrap()
      setSuccess("Questions refreshed successfully")
    } catch (err) {
      setError("Failed to refresh questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const toggleExpandedFeedbacks = (questionId: number) => {
    setExpandedFeedbackQuestionId((prevId) => (prevId === questionId ? null : questionId))
  }

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: colors.primary,
            },
          }}
        >
          You must be logged in to view your questions.
        </Alert>
      </Container>
    )
  }

  if (initialLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress size={60} thickness={4} sx={{ color: colors.primary }} />
        </Box>
      </Container>
    )
  }

  if (myQuestions.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: colors.secondary }}>
            My Questions
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshCwIcon size={18} />}
            onClick={refreshQuestions}
            disabled={loading}
            sx={{
              borderRadius: 2,
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
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": {
                color: colors.primary,
              },
            }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            border: `1px dashed ${alpha(colors.secondary, 0.2)}`,
            bgcolor: alpha(colors.light, 0.3),
          }}
        >
          <Box sx={{ mb: 3 }}>
            <MessageSquareIcon size={48} style={{ color: alpha(colors.secondary, 0.3) }} />
          </Box>
          <Typography variant="h6" sx={{ color: colors.secondary, fontWeight: 600, mb: 1 }}>
            You haven't asked any questions yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
            Start by asking a question to get feedback from the community
          </Typography>
          <Button
            variant="contained"
            component="a"
            href="/fileupload"
            startIcon={<PlusIcon size={18} />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              bgcolor: colors.primary,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.9),
              },
              textTransform: "none",
            }}
          >
            Ask a Question
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: colors.secondary }}>
          My Questions
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshCwIcon size={18} />}
            onClick={refreshQuestions}
            disabled={loading}
            sx={{
              borderRadius: 2,
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
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            variant="contained"
            component="a"
            href="/fileupload"
            startIcon={<PlusIcon size={18} />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              bgcolor: colors.primary,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.9),
              },
              textTransform: "none",
            }}
          >
            Ask New Question
          </Button>
        </Box>
      </Box>

      {success && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: colors.accent,
            },
          }}
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: colors.primary,
            },
          }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <AnimatePresence>
        {myQuestions.map((question) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              elevation={0}
              sx={{
                mb: 3,
                position: "relative",
                borderRadius: 3,
                overflow: "visible",
                border: `1px solid ${alpha(colors.secondary, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {editingQuestionId === question.id ? (
                  <Box component="form" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.secondary }}>
                      Edit Question
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <TextField
                      fullWidth
                      label="Title"
                      value={question.title}
                      onChange={(e) => handleFieldChange(question.id, "title", e.target.value)}
                      sx={{
                        mb: 3,
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
                      fullWidth
                      multiline
                      rows={4}
                      label="Content"
                      value={question.content}
                      onChange={(e) => handleFieldChange(question.id, "content", e.target.value)}
                      sx={{
                        mb: 3,
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

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: 600, display: "flex", alignItems: "center", color: colors.secondary }}
                      >
                        <ImageIcon size={18} style={{ marginRight: 8 }} />
                        Images & Attachments
                      </Typography>
                      {question.images.length > 0 ? (
                        <ImageList cols={isTablet ? 2 : 3} gap={16} sx={{ mb: 2 }}>
                          {question.images.map((image: { id: number; name: string }) => (
                            <ImageListItem
                              key={image.id}
                              sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                                position: "relative",
                                height: 150,
                              }}
                            >
                              <ShowFile fileName={image.name} height={150} />
                              <IconButton
                                onClick={() => handleDeleteImage(question.id, image.id)}
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  bgcolor: "rgba(255,255,255,0.9)",
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,1)",
                                  },
                                  color: colors.primary,
                                }}
                                size="small"
                              >
                                <TrashIcon size={16} />
                              </IconButton>
                            </ImageListItem>
                          ))}
                        </ImageList>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          No images or attachments
                        </Typography>
                      )}

                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={uploadLoading ? <CircularProgress size={20} /> : <UploadCloudIcon size={18} />}
                        disabled={uploadLoading}
                        sx={{
                          borderRadius: 2,
                          py: 1,
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
                        {uploadLoading ? "Uploading..." : "Upload File"}
                        <input
                          type="file"
                          hidden
                          accept=".png, .jpg, .jpeg, .pdf, .mp3, .wav, .doc, .docx"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadImage(question.id, e.target.files[0])
                            }
                          }}
                        />
                      </Button>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: 600, display: "flex", alignItems: "center", color: colors.secondary }}
                      >
                        <MessageSquareIcon size={18} style={{ marginRight: 8 }} />
                        Feedbacks
                      </Typography>

                      {question.feedbacks.length > 0 ? (
                        <List sx={{ bgcolor: alpha(colors.light, 0.5), borderRadius: 2, p: 2 }}>
                          {question.feedbacks.map((feedback) => (
                            <ListItem
                              key={feedback.id}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  onClick={() => handleDeleteFeedback(question.id!, feedback.id!)}
                                  size="small"
                                  sx={{ color: colors.primary }}
                                >
                                  <TrashIcon size={16} />
                                </IconButton>
                              }
                              sx={{
                                mb: 1,
                                bgcolor: "white",
                                borderRadius: 2,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              }}
                            >
                              <ListItemText
                                primary={feedback.content}
                                secondary={feedback.userName ? `By: ${feedback.userName}` : undefined}
                                primaryTypographyProps={{
                                  sx: { color: colors.secondary, fontWeight: 500 },
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No feedback received yet
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={cancelEdit}
                        startIcon={<XIcon size={18} />}
                        sx={{
                          borderRadius: 2,
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
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={saveChanges}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon size={18} />}
                        sx={{
                          borderRadius: 2,
                          bgcolor: colors.primary,
                          "&:hover": {
                            bgcolor: alpha(colors.primary, 0.9),
                          },
                          textTransform: "none",
                          fontWeight: 500,
                        }}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: colors.secondary }}>
                        {question.title}
                      </Typography>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, question)}
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: alpha(colors.light, 0.7),
                          "&:hover": {
                            bgcolor: alpha(colors.light, 1),
                          },
                          color: colors.secondary,
                        }}
                      >
                        <MoreVerticalIcon size={18} />
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 3, color: colors.secondary }}>
                      {question.content}
                    </Typography>

                    {question.images && question.images.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          sx={{ fontWeight: 600, display: "flex", alignItems: "center", color: colors.secondary }}
                        >
                          <ImageIcon size={16} style={{ marginRight: 8 }} />
                          Attachments ({question.images.length})
                        </Typography>
                        <ImageList cols={isTablet ? 2 : 3} gap={8} sx={{ maxHeight: 200, overflow: "auto" }}>
                          {question.images.map((image) => (
                            <ImageListItem
                              key={image.id}
                              sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                                position: "relative",
                                height: 150,
                              }}
                            >
                              <ShowFile fileName={image.name} height={150} />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    )}

                    {question.feedbacks && question.feedbacks.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          sx={{ fontWeight: 600, display: "flex", alignItems: "center", color: colors.secondary }}
                        >
                          <MessageSquareIcon size={16} style={{ marginRight: 8 }} />
                          Feedback ({question.feedbacks.length})
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor: alpha(colors.light, 0.5),
                            borderRadius: 2,
                            maxHeight: expandedFeedbackQuestionId === question.id ? "none" : 200,
                            overflow: "auto",
                            border: `1px solid ${alpha(colors.secondary, 0.08)}`,
                          }}
                        >
                          {question.feedbacks
                            .slice(0, expandedFeedbackQuestionId === question.id ? question.feedbacks.length : 3)
                            .map((feedback: { id: number; content: string; userName?: string }, index) => (
                              <Box
                                key={feedback.id}
                                sx={{
                                  mb:
                                    index <
                                    (expandedFeedbackQuestionId === question.id ? question.feedbacks.length - 1 : 2)
                                      ? 2
                                      : 0,
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                  <Avatar
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      fontSize: "0.75rem",
                                      bgcolor: colors.primary,
                                      mr: 1,
                                    }}
                                  >
                                    {feedback.userName?.charAt(0).toUpperCase() || <UserIcon size={12} />}
                                  </Avatar>
                                  <Typography variant="caption" color="text.secondary">
                                    {feedback.userName || "Anonymous"}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: colors.secondary }}>
                                  {feedback.content}
                                </Typography>
                                {index <
                                  (expandedFeedbackQuestionId === question.id ? question.feedbacks.length - 1 : 2) &&
                                  question.feedbacks.length > 1 && <Divider sx={{ mt: 2 }} />}
                              </Box>
                            ))}
                          {question.feedbacks.length > 3 && (
                            <Typography
                              variant="body2"
                              color="primary"
                              onClick={() => toggleExpandedFeedbacks(question.id)}
                              sx={{
                                mt: 1,
                                textAlign: "center",
                                fontWeight: 500,
                                cursor: "pointer",
                                color: colors.primary,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              {expandedFeedbackQuestionId === question.id ? (
                                <>
                                  Show less <ChevronUpIcon size={16} style={{ marginLeft: 4 }} />
                                </>
                              ) : (
                                <>
                                  View {question.feedbacks.length - 3} more{" "}
                                  {question.feedbacks.length - 3 === 1 ? "comment" : "comments"}{" "}
                                  <ChevronDownIcon size={16} style={{ marginLeft: 4 }} />
                                </>
                              )}
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Menu for question actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ color: colors.secondary }}>
          <PencilIcon size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: colors.primary }}>
          <TrashIcon size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ color: colors.secondary, fontWeight: 600 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: colors.secondary }}>
            Are you sure you want to delete this question? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            sx={{
              color: colors.secondary,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TrashIcon size={16} />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              bgcolor: colors.primary,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.9),
              },
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default MyQuestions
