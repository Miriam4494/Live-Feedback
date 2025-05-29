// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Paper,
//   Chip,
//   Alert,
//   CircularProgress,
//   Card,
//   CardContent,
//   Divider,
//   useTheme,
//   IconButton,
//   Tooltip,
//   Fade,
//   LinearProgress,
// } from "@mui/material"
// import {
//   CloudUpload as CloudUploadIcon,
//   InsertDriveFile as FileIcon,
//   Image as ImageIcon,
//   AudioFile as AudioIcon,
//   Description as DocIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material"
// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootState } from "../redux/Store"
// import { updateUser } from "../redux/UserSlice"
// import { sendEmail } from "../services/Email"

// const API_BASE_URL = "https://localhost:7230/api/"

// const allowedTypes = [
//   "image/png",
//   "image/jpeg",
//   "image/jpg",
//   "application/pdf",
//   "audio/mpeg",
//   "audio/wav",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ]

// const maxSize = 10 * 1024 * 1024 // 10MB

// const FileUpload = () => {
//   const [question, setQuestion] = useState("")
//   const [title, setTitle] = useState("")
//   const [files, setFiles] = useState<File[]>([])
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const { user } = useSelector((state: RootState) => state.User)
//   const dispatch = useDispatch<AppDispatch>()
//   const theme = useTheme()

//   // Reset progress when not uploading
//   useEffect(() => {
//     if (!uploading) {
//       setUploadProgress(0)
//     }
//   }, [uploading])

//   const getFileIcon = (fileType: string) => {
//     if (fileType.includes("image")) return <ImageIcon />
//     if (fileType.includes("audio")) return <AudioIcon />
//     if (fileType.includes("pdf") || fileType.includes("word")) return <DocIcon />
//     return <FileIcon />
//   }

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const selectedFiles = Array.from(event.target.files)
//       const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type) && file.size <= maxSize)

//       if (validFiles.length !== selectedFiles.length) {
//         setError("Some files were not added: Invalid format or size exceeded 10MB.")
//       } else {
//         setError(null)
//       }

//       setFiles([...files, ...validFiles])
//     }
//   }

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     event.stopPropagation()

//     if (event.dataTransfer.files) {
//       const selectedFiles = Array.from(event.dataTransfer.files)
//       const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type) && file.size <= maxSize)

//       if (validFiles.length !== selectedFiles.length) {
//         setError("Some files were not added: Invalid format or size exceeded 10MB.")
//       } else {
//         setError(null)
//       }

//       setFiles([...files, ...validFiles])
//     }
//   }

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     event.stopPropagation()
//   }

//   const removeFile = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index))
//   }

//   const openFilePicker = () => {
//     fileInputRef.current?.click()
//   }

//   const submitQuestionAndUpload = async () => {
//     console.log(user);

//     if (!question) {
//       setError("Please enter a question.")
//       return
//     }

//     const finalTitle = title || question

//     // Check points
//     const requiredPoints = files.length > 0 ? 5 : 3
//     if ((user?.points || 0) < requiredPoints) {
//       setError(
//         `You need at least ${requiredPoints} points to submit ${files.length > 0 ? "a question with files" : "a question"
//         }.`,
//       )
//       return
//     }

//     try {
//       setUploading(true)
//       setError(null)

//       const progressInterval = setInterval(() => {
//         setUploadProgress((prev) => {
//           const newProgress = prev + Math.random() * 10
//           return newProgress > 90 ? 90 : newProgress
//         })
//       }, 300)

//       const response = await axios.post(`${API_BASE_URL}Question`, {
//         title: finalTitle,
//         content: question,
//         userId: user?.id,
//         userName: user?.userName,
//         userEmail: user?.email,

//       })
//       if (user) {
//         const updatedQuestions = [...(user.questions || []), response.data];
//         console.log(updatedQuestions);
//         const updatedUser = { ...user, questions: updatedQuestions, points: (user.points || 0) - requiredPoints };
//         console.log(updatedUser);

//         dispatch(updateUser(updatedUser));
//       }

//       // user?.questions?.push(question)
//       console.log(user?.questions);
//       console.log(response.data);

//       const questionId = response.data.id

//       // Upload files if any
//       if (files.length > 0) {
//         for (const file of files) {
//           const uploadUrlResponse = await axios.get(`${API_BASE_URL}S3/upload-url`, {
//             params: { fileName: file.name, contentType: file.type },
//           })

//           await axios.put(uploadUrlResponse.data.url, file, {
//             headers: { "Content-Type": file.type },
//           })

//           const downloadUrlResponse = await axios.get(`${API_BASE_URL}S3/download-url/${file.name}`)
//           await axios.post(`${API_BASE_URL}S3/save-file`, {
//             imageUrl: downloadUrlResponse.data.downloadUrl,
//             questionId: questionId,
//             name: file.name,
//           })
//         }
//       }



//       // שליחת מיילים למשתמשים שסימנו שהם רוצים לקבל מיילים
//       try {
//         const emailResponse = await axios.get(`${API_BASE_URL}User/send`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         const emails = emailResponse.data; // מערך של מיילים
//         console.log("Emails to notify:", emails);

//         for (const email of emails) {
//           await sendEmail({
//             to: email,
//             subject: "New Question Posted",
//             body:  `
//             <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
//               <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
//                 <h1 style="margin: 0; font-size: 24px;">A New Question Has Been Posted!</h1>
//               </div>
//               <div style="padding: 20px;">
//                 <p>Hi,</p>
//                 <p>A new question has been posted on <strong>Live Feedback</strong>. Here are the details:</p>
//                 <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; background-color: #f9f9f9; margin-bottom: 20px;">
//                   <p style="margin: 0;"><strong>Title:</strong> ${finalTitle}</p>
//                   <p style="margin: 0;"><strong>Content:</strong> ${question}</p>
//                   ${
//                     files.length > 0
//                       ? `<p style="margin: 0;"><strong>Attachments:</strong> ${files.length} file(s) attached.</p>`
//                       : ""
//                   }
//                 </div>
//                 <div style="text-align: center; margin: 30px 0;">
//                   <a href="https://your-platform.com/questions/${response.data.id}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Question</a>
//                 </div>
//                 <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
//                 <p style="font-size: 0.9em; color: #555; text-align: center;">Thank you for being part of our community!<br />The Live Feedback Team</p>
//               </div>
//             </div>
//           `,
//           });
//         }
  

//         console.log("Emails sent successfully!");
//       } catch (emailError) {
//         console.error("Failed to send emails:", emailError);
//       }




//       clearInterval(progressInterval)
//       setUploadProgress(100)

//       setSuccess("Question and files uploaded successfully!")
//       setFiles([])
//       setQuestion("")
//       setTitle("")

//       // Reset progress after a delay
//       setTimeout(() => {
//         setUploading(false)
//       }, 1000)
//     } catch (err: any) {
//       setError("Upload failed: " + err.message)
//       setUploading(false)
//     }
//   }

//   return (
//     <Card
//       elevation={2}
//       sx={{
//         maxWidth: 700,
//         mx: "auto",
//         borderRadius: 2,
//         overflow: "visible",
//       }}
//     >
//       <CardContent sx={{ p: 4 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "primary.main", mb: 3 }}>
//           Ask a Question
//         </Typography>

//         {error && (
//           <Fade in={!!error}>
//             <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }} onClose={() => setError(null)}>
//               {error}
//             </Alert>
//           </Fade>
//         )}

//         {success && (
//           <Fade in={!!success}>
//             <Alert severity="success" sx={{ mb: 3, borderRadius: 1 }} onClose={() => setSuccess(null)}>
//               {success}
//             </Alert>
//           </Fade>
//         )}

//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Title (optional)"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Your question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           multiline
//           rows={4}
//           sx={{ mb: 3 }}
//           error={!question && uploading}
//           helperText={!question && uploading ? "Question is required" : ""}
//         />

//         <Paper
//           elevation={0}
//           sx={{
//             border: `2px dashed ${theme.palette.primary.light}`,
//             borderRadius: 2,
//             p: 4,
//             cursor: "pointer",
//             backgroundColor: "rgba(0, 0, 0, 0.02)",
//             textAlign: "center",
//             transition: "all 0.2s",
//             "&:hover": {
//               backgroundColor: "rgba(0, 0, 0, 0.04)",
//               borderColor: theme.palette.primary.main,
//             },
//             mb: 3,
//           }}
//           onClick={openFilePicker}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           <input
//             type="file"
//             multiple
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             accept=".png, .jpg, .jpeg, .pdf, .mp3, .wav, .doc, .docx"
//           />
//           <CloudUploadIcon sx={{ fontSize: 60, color: "primary.main", mb: 2, opacity: 0.8 }} />
//           <Typography variant="h6" gutterBottom>
//             {files.length > 0 ? "Add more files" : "Drag files here or click to browse"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Supports images, PDFs, audio files, and documents (max 10MB)
//           </Typography>
//         </Paper>

//         {files.length > 0 && (
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
//               Selected Files ({files.length})
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//               {files.map((file, index) => (
//                 <Chip
//                   key={index}
//                   icon={getFileIcon(file.type)}
//                   label={file.name}
//                   onDelete={() => removeFile(index)}
//                   sx={{
//                     py: 2.5,
//                     borderRadius: 2,
//                     "& .MuiChip-deleteIcon": {
//                       color: "error.main",
//                       "&:hover": {
//                         color: "error.dark",
//                       },
//                     },
//                   }}
//                 />
//               ))}
//             </Box>
//           </Box>
//         )}

//         {uploading && (
//           <Box sx={{ width: "100%", mb: 3 }}>
//             <LinearProgress
//               variant="determinate"
//               value={uploadProgress}
//               sx={{
//                 height: 8,
//                 borderRadius: 4,
//                 mb: 1,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//               }}
//             />
//             <Typography variant="body2" color="text.secondary" align="right">
//               {Math.round(uploadProgress)}% Complete
//             </Typography>
//           </Box>
//         )}

//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography variant="body2" color="text.secondary">
//               {files.length > 0 ? `This will cost ${5} points` : `This will cost ${3} points`}
//             </Typography>
//             <Tooltip title="Points are deducted when you submit a question. You earn points by providing feedback to others.">
//               <IconButton size="small">
//                 <InfoIcon fontSize="small" color="action" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//           <Button
//             onClick={submitQuestionAndUpload}
//             disabled={uploading}
//             variant="contained"
//             size="large"
//             sx={{
//               borderRadius: 2,
//               px: 4,
//               py: 1.5,
//               fontWeight: 600,
//             }}
//             startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : undefined}
//           >
//             {uploading ? "Uploading..." : "Submit Question"}
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   )
// }

// const alpha = (color: string, opacity: number) => {
//   return (
//     color +
//     Math.round(opacity * 255)
//       .toString(16)
//       .padStart(2, "0")
//   )
// }

// export default FileUpload

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Fade,
  alpha,
} from "@mui/material"
import {
  UploadCloudIcon,
  FileIcon,
  ImageIcon,
  FileAudioIcon,
  FileTextIcon,
  InfoIcon,
  XIcon,
  CheckIcon,
} from "lucide-react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/Store"
import { updateUser } from "../redux/UserSlice"
import { sendEmail } from "../services/Email"
import { motion } from "framer-motion"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}
const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "https://live-feedback-lgcr.onrender.com/api/"

const API_BASE_URL = `${apiUrl}`

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const maxSize = 10 * 1024 * 1024 // 10MB

const FileUpload = () => {
  const [question, setQuestion] = useState("")
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useSelector((state: RootState) => state.User)
  const dispatch = useDispatch<AppDispatch>()

  // Reset progress when not uploading
  useEffect(() => {
    if (!uploading) {
      setUploadProgress(0)
    }
  }, [uploading])

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return <ImageIcon size={18} />
    if (fileType.includes("audio")) return <FileAudioIcon size={18} />
    if (fileType.includes("pdf") || fileType.includes("word")) return <FileTextIcon size={18} />
    return <FileIcon size={18} />
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files)
      const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type) && file.size <= maxSize)

      if (validFiles.length !== selectedFiles.length) {
        setError("Some files were not added: Invalid format or size exceeded 10MB.")
      } else {
        setError(null)
      }

      setFiles([...files, ...validFiles])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    if (event.dataTransfer.files) {
      const selectedFiles = Array.from(event.dataTransfer.files)
      const validFiles = selectedFiles.filter((file) => allowedTypes.includes(file.type) && file.size <= maxSize)

      if (validFiles.length !== selectedFiles.length) {
        setError("Some files were not added: Invalid format or size exceeded 10MB.")
      } else {
        setError(null)
      }

      setFiles([...files, ...validFiles])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const submitQuestionAndUpload = async () => {
    if (!question) {
      setError("Please enter a question.")
      return
    }

    const finalTitle = title || question.substring(0, 50) + (question.length > 50 ? "..." : "")

    // Check points
    const requiredPoints = files.length > 0 ? 5 : 3
    if ((user?.points || 0) < requiredPoints) {
      setError(
        `You need at least ${requiredPoints} points to submit ${
          files.length > 0 ? "a question with files" : "a question"
        }.`,
      )
      return
    }

    try {
      setUploading(true)
      setError(null)

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)

      const response = await axios.post(`${API_BASE_URL}Question`, {
        title: finalTitle,
        content: question,
        userId: user?.id,
        userName: user?.userName,
        userEmail: user?.email,
      })

      if (user) {
        const updatedQuestions = [...(user.questions || []), response.data]
        const updatedUser = { ...user, questions: updatedQuestions, points: (user.points || 0) - requiredPoints }
        dispatch(updateUser(updatedUser))
      }

      const questionId = response.data.id

      // Upload files if any
      if (files.length > 0) {
        for (const file of files) {
          const uploadUrlResponse = await axios.get(`${API_BASE_URL}S3/upload-url`, {
            params: { fileName: file.name, contentType: file.type },
          })

          await axios.put(uploadUrlResponse.data.url, file, {
            headers: { "Content-Type": file.type },
          })

          const downloadUrlResponse = await axios.get(`${API_BASE_URL}S3/download-url/${file.name}`)
          await axios.post(`${API_BASE_URL}S3/save-file`, {
            imageUrl: downloadUrlResponse.data.downloadUrl,
            questionId: questionId,
            name: file.name,
          })
        }
      }

      // Send emails to users who want to receive notifications
      try {
        const emailResponse = await axios.get(`${API_BASE_URL}User/send`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

        const emails = emailResponse.data

        for (const email of emails) {
          await sendEmail({
            to: email,
            subject: "New Question Posted",
            body: `
              <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <div style="background-color: ${colors.primary}; color: white; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 600;">A New Question Has Been Posted!</h1>
                </div>
                <div style="padding: 24px;">
                  <p>Hi,</p>
                  <p>A new question has been posted on <strong>Feedback Platform</strong>. Here are the details:</p>
                  <div style="border: 1px solid #eee; padding: 16px; border-radius: 8px; background-color: #f9f9f9; margin-bottom: 20px;">
                    <p style="margin: 0;"><strong>Title:</strong> ${finalTitle}</p>
                    <p style="margin: 0;"><strong>Content:</strong> ${question}</p>
                    ${
                      files.length > 0
                        ? `<p style="margin: 0;"><strong>Attachments:</strong> ${files.length} file(s) attached.</p>`
                        : ""
                    }
                  </div>
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="https://your-platform.com/questions/${response.data.id}" style="display: inline-block; padding: 12px 24px; background-color: ${colors.primary}; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">View Question</a>
                  </div>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                  <p style="font-size: 0.9em; color: #777; text-align: center;">Thank you for being part of our community!<br />The Feedback Platform Team</p>
                </div>
              </div>
            `,
          })
        }
      } catch (emailError) {
        console.error("Failed to send emails:", emailError)
      }

      clearInterval(progressInterval)
      setUploadProgress(100)

      setSuccess("Question and files uploaded successfully!")
      setFiles([])
      setQuestion("")
      setTitle("")

      // Reset progress after a delay
      setTimeout(() => {
        setUploading(false)
      }, 1000)
    } catch (err: any) {
      setError("Upload failed: " + err.message)
      setUploading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card
        elevation={0}
        sx={{
          maxWidth: 800,
          mx: "auto",
          borderRadius: 3,
          border: `1px solid ${alpha(colors.secondary, 0.1)}`,
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 4, borderBottom: `1px solid ${alpha(colors.secondary, 0.1)}` }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.secondary, mb: 1 }}>
              Ask a Question
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Share your question with the community and get valuable feedback
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{
                    mb: 4,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: colors.primary,
                    },
                  }}
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {success && (
              <Fade in={!!success}>
                <Alert
                  severity="success"
                  sx={{
                    mb: 4,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: colors.accent,
                    },
                  }}
                  onClose={() => setSuccess(null)}
                  icon={<CheckIcon />}
                >
                  {success}
                </Alert>
              </Fade>
            )}

            <TextField
              fullWidth
              variant="outlined"
              label="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              variant="outlined"
              label="Your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              multiline
              rows={4}
              sx={{
                mb: 4,
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
              error={!question && uploading}
              helperText={!question && uploading ? "Question is required" : ""}
            />

            <Paper
              elevation={0}
              sx={{
                border: `2px dashed ${isDragging ? colors.primary : alpha(colors.secondary, 0.2)}`,
                borderRadius: 3,
                p: 4,
                cursor: "pointer",
                backgroundColor: isDragging ? alpha(colors.light, 0.5) : alpha(colors.light, 0.2),
                textAlign: "center",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: alpha(colors.light, 0.5),
                  borderColor: colors.primary,
                },
                mb: 4,
              }}
              onClick={openFilePicker}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .pdf, .mp3, .wav, .doc, .docx"
              />
              <UploadCloudIcon
                style={{ width: 60, height: 60, color: colors.primary, marginBottom: 16, opacity: 0.8 }}
              />
              <Typography variant="h6" gutterBottom sx={{ color: colors.secondary, fontWeight: 600 }}>
                {files.length > 0 ? "Add more files" : "Drag files here or click to browse"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supports images, PDFs, audio files, and documents (max 10MB)
              </Typography>
            </Paper>

            {files.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: colors.secondary, mb: 2 }}>
                  Selected Files ({files.length})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {files.map((file, index) => (
                    <Chip
                      key={index}
                      icon={getFileIcon(file.type)}
                      label={file.name}
                      onDelete={() => removeFile(index)}
                      sx={{
                        py: 2.5,
                        borderRadius: 2,
                        bgcolor: alpha(colors.light, 0.5),
                        border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                        "& .MuiChip-deleteIcon": {
                          color: colors.primary,
                          "&:hover": {
                            color: alpha(colors.primary, 0.8),
                          },
                        },
                      }}
                      deleteIcon={<XIcon size={16} />}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {uploading && (
              <Box sx={{ width: "100%", mb: 4 }}>
                <Box
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 1,
                    bgcolor: alpha(colors.secondary, 0.1),
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${uploadProgress}%`,
                      bgcolor: colors.primary,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" align="right">
                  {Math.round(uploadProgress)}% Complete
                </Typography>
              </Box>
            )}

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {files.length > 0 ? `This will cost ${5} points` : `This will cost ${3} points`}
                </Typography>
                <Tooltip title="Points are deducted when you submit a question. You earn points by providing feedback to others.">
                  <IconButton size="small" sx={{ color: alpha(colors.secondary, 0.6), ml: 0.5 }}>
                    <InfoIcon size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button
                onClick={submitQuestionAndUpload}
                disabled={uploading}
                variant="contained"
                size="large"
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
                startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : undefined}
              >
                {uploading ? "Uploading..." : "Submit Question"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FileUpload
