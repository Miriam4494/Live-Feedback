

// import type React from "react"

// import { useEffect, useState } from "react"
// import {
//   Box,
//   CircularProgress,
//   Button,
//   Typography,
//   IconButton,
//   Tooltip,
//   Paper,
//   alpha,
//   Fade,
//   Skeleton,
// } from "@mui/material"
// import {
//   DownloadIcon,
//   FileTextIcon,
//   FileAudioIcon as AudioIcon,
//   FileIcon,
//   ImageIcon,
//   ZoomInIcon,
//   ZoomOutIcon,
//   ExternalLinkIcon,
//   AlertCircleIcon,
//   RefreshCwIcon,
// } from "lucide-react"
// import axios from "axios"

// // New elegant color palette
// const colors = {
//   primary: "#E07A5F", // Terracotta
//   secondary: "#3D405B", // Dark slate blue
//   light: "#F4F1DE", // Cream
//   accent: "#81B29A", // Sage green
//   dark: "#2D3142", // Dark blue-gray
// }

// interface ShowFileProps {
//   fileName: string
//   showDownloadButton?: boolean
//   height?: string | number
//   width?: string | number
//   showControls?: boolean
// }

// const ShowFile = ({
//   fileName,
//   showDownloadButton = true,
//   height = "100%",
//   width = "100%",
//   showControls = true,
// }: ShowFileProps) => {
//   const [fileURL, setFileURL] = useState<string>("")
//   const [fileType, setFileType] = useState<string>("")
//   const [isDownloading, setIsDownloading] = useState<boolean>(false)
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [zoom, setZoom] = useState<number>(100)
//   const [isDragging, setIsDragging] = useState(false)

//   useEffect(() => {
//     const fetchFileUrl = async () => {
//       try {
//         setIsLoading(true)
//         setError(null)

//         const res = await axios.get(`https://localhost:7230/api/S3/download-url/${fileName}`)

//         setFileURL(res.data.downloadUrl)

//         // Extract file extension
//         const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""
//         setFileType(fileExtension)
//       } catch (error) {
//         console.error("Error fetching file URL:", error)
//         setError("Failed to load file")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     if (fileName) {
//       fetchFileUrl()
//     }
//   }, [fileName])

//   // Function to trigger file download
//   const downloadFile = async () => {
//     setIsDownloading(true)
// console.log("מורידים אותי");

//     try {
//       const response = await axios.get(fileURL, {
//         responseType: "blob",
//       })

//       const blob = new Blob([response.data])
//       const link = document.createElement("a")
//       link.href = URL.createObjectURL(blob)
//       link.download = fileName
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.log("שגיאה בהורדת הקובץ", error);
      
//       console.error("Error downloading file:", error)
//       setError("Download failed")
//     } finally {
//       setIsDownloading(false)
//     }
//   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 20, 200))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 20, 50))
//   }

//   const getFileIcon = () => {
//     if (fileType.match(/(jpg|jpeg|png|gif)$/)) return <ImageIcon size={40} />
//     if (fileType === "pdf") return <FileTextIcon size={40} />
//     if (fileType.match(/(mp3|wav|ogg)$/)) return <AudioIcon size={40} />
//     if (fileType.match(/(doc|docx)$/)) return <FileTextIcon size={40} />
//     return <FileIcon size={40} />
//   }

//   const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     const target = event.currentTarget as HTMLDivElement
//     setIsDragging(true)
//     target.style.cursor = "grabbing"
//     target.dataset.startX = event.clientX.toString()
//     target.dataset.startY = event.clientY.toString()
//   }

//   const handleDragMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (!isDragging) return

//     const target = event.currentTarget as HTMLDivElement
//     const startX = Number.parseFloat(target.dataset.startX || "0")
//     const startY = Number.parseFloat(target.dataset.startY || "0")
//     const deltaX = event.clientX - startX
//     const deltaY = event.clientY - startY

//     target.scrollLeft -= deltaX
//     target.scrollTop -= deltaY

//     target.dataset.startX = event.clientX.toString()
//     target.dataset.startY = event.clientY.toString()
//   }

//   const handleDragEnd = () => {
//     setIsDragging(false)
//   }

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height,
//           width,
//           bgcolor: alpha(colors.light, 0.5),
//           borderRadius: 2,
//         }}
//       >
//         <Skeleton
//           variant="rectangular"
//           width="100%"
//           height="100%"
//           animation="wave"
//           sx={{ borderRadius: 2, minHeight: 150 }}
//         />
//       </Box>
//     )
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height,
//           width,
//           bgcolor: alpha(colors.light, 0.5),
//           borderRadius: 2,
//           p: 3,
//         }}
//       >
//         <AlertCircleIcon size={32} style={{ color: colors.primary, marginBottom: 16 }} />
//         <Typography variant="body1" sx={{ fontWeight: 500, color: colors.secondary, mb: 1, textAlign: "center" }}>
//           {error}
//         </Typography>
//         <Button
//           size="small"
//           onClick={() => window.location.reload()}
//           variant="outlined"
//           startIcon={<RefreshCwIcon size={16} />}
//           sx={{
//             mt: 2,
//             borderRadius: 2,
//             borderColor: colors.primary,
//             color: colors.primary,
//             "&:hover": {
//               borderColor: colors.primary,
//               bgcolor: alpha(colors.primary, 0.05),
//             },
//             textTransform: "none",
//             fontWeight: 500,
//           }}
//         >
//           Retry
//         </Button>
//       </Box>
//     )
//   }

//   // Render different file types
//   const renderFileContent = () => {
//     if (fileType.match(/(jpg|jpeg|png|gif)$/)) {
//       return (
//         <Box
//           sx={{
//             position: "relative",
//             height: "100%",
//             width: "100%",
//             overflow: "auto",
//             cursor: isDragging ? "grabbing" : "grab",
//             borderRadius: 2,
//             bgcolor: alpha(colors.light, 0.5),
//           }}
//           onMouseDown={handleDragStart}
//           onMouseMove={handleDragMove}
//           onMouseUp={handleDragEnd}
//           onMouseLeave={handleDragEnd}
//         >
//           <Box
//             component="img"
//             src={fileURL}
//             alt={fileName}
//             sx={{
//               width: `${zoom}%`,
//               height: "auto",
//               objectFit: "contain",
//               display: "block",
//               margin: "0 auto",
//               transition: "width 0.3s ease",
//             }}
//             loading="lazy"
//           />
//           {showControls && (
//             <Fade in={true}>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   display: "flex",
//                   bgcolor: "rgba(255,255,255,0.9)",
//                   borderRadius: 2,
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   p: 0.5,
//                 }}
//               >
//                 <Tooltip title="Zoom in">
//                   <IconButton size="small" onClick={handleZoomIn} sx={{ color: colors.secondary }}>
//                     <ZoomInIcon size={18} />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Zoom out">
//                   <IconButton size="small" onClick={handleZoomOut} sx={{ color: colors.secondary }}>
//                     <ZoomOutIcon size={18} />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </Fade>
//           )}
//         </Box>
//       )
//     }

//     if (fileType === "pdf") {
//       return (
//         <Box sx={{ height: "100%", width: "100%", minHeight: 300, display: "flex", flexDirection: "column" }}>
//           <Box
//             component="iframe"
//             src={fileURL}
//             title={fileName}
//             sx={{
//               width: "100%",
//               flexGrow: 1,
//               border: "none",
//               minHeight: 250,
//               borderRadius: 2,
//             }}
//           />
//           <Button
//             variant="outlined"
//             size="small"
//             component="a"
//             href={fileURL}
//             target="_blank"
//             rel="noopener noreferrer"
//             startIcon={<ExternalLinkIcon size={16} />}
//             sx={{
//               mt: 2,
//               alignSelf: "center",
//               borderRadius: 2,
//               borderColor: colors.primary,
//               color: colors.primary,
//               "&:hover": {
//                 borderColor: colors.primary,
//                 bgcolor: alpha(colors.primary, 0.05),
//               },
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             Open PDF in New Tab
//           </Button>
//         </Box>
//       )
//     }

//     if (fileType.match(/(mp3|wav|ogg)$/)) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             width: "100%",
//             p: 3,
//             minHeight: 120,
//             bgcolor: alpha(colors.light, 0.5),
//             borderRadius: 2,
//           }}
//         >
//           <AudioIcon size={40} style={{ color: colors.primary, marginBottom: 16 }} />
//           <Typography variant="body2" noWrap sx={{ maxWidth: "100%", mb: 2, color: colors.secondary }}>
//             {fileName}
//           </Typography>
//           <Box
//             component="audio"
//             controls
//             src={fileURL}
//             sx={{
//               width: "100%",
//               minWidth: "250px",
//               "&::-webkit-media-controls-panel": {
//                 bgcolor: "white",
//               },
//             }}
//           >
//             Your browser does not support the audio element.
//           </Box>
//         </Box>
//       )
//     }

//     if (fileType.match(/(doc|docx)$/)) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//             width: "100%",
//             p: 3,
//             bgcolor: alpha(colors.light, 0.5),
//             borderRadius: 2,
//           }}
//         >
//           <FileTextIcon size={40} style={{ color: colors.primary, marginBottom: 16 }} />
//           <Typography variant="body2" noWrap sx={{ maxWidth: "100%", mb: 2, color: colors.secondary }}>
//             {fileName}
//           </Typography>
//           <Button
//             variant="contained"
//             size="small"
//             component="a"
//             href={fileURL}
//             target="_blank"
//             rel="noopener noreferrer"
//             startIcon={<ExternalLinkIcon size={16} />}
//             sx={{
//               bgcolor: colors.primary,
//               "&:hover": {
//                 bgcolor: alpha(colors.primary, 0.9),
//               },
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             Open Document
//           </Button>
//         </Box>
//       )
//     }

//     // Default file display
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//           width: "100%",
//           p: 3,
//           bgcolor: alpha(colors.light, 0.5),
//           borderRadius: 2,
//         }}
//       >
//         <Box sx={{ color: colors.primary, mb: 2 }}>{getFileIcon()}</Box>
//         <Typography variant="body1" sx={{ fontWeight: 500, color: colors.secondary, mb: 1, textAlign: "center" }}>
//           {fileName}
//         </Typography>
//         <Button
//           variant="outlined"
//           size="small"
//           startIcon={<DownloadIcon size={16} />}
//           onClick={downloadFile}
//           disabled={isDownloading}
//           sx={{
//             mt: 2,
//             borderRadius: 2,
//             borderColor: colors.primary,
//             color: colors.primary,
//             "&:hover": {
//               borderColor: colors.primary,
//               bgcolor: alpha(colors.primary, 0.05),
//             },
//             textTransform: "none",
//             fontWeight: 500,
//           }}
//         >
//           {isDownloading ? "Downloading..." : "Download"}
//         </Button>
//       </Box>
//     )
//   }

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         position: "relative",
//         height,
//         width,
//         overflow: "hidden",
//         borderRadius: 2,
//         border: `1px solid ${alpha(colors.secondary, 0.1)}`,
//       }}
//     >
//       {renderFileContent()}

//       {/* {showDownloadButton && fileURL && !fileType.match(/\.(jpg|jpeg|png|gif)$/i) && ( */}
//         <Tooltip title="Download file">
//           <IconButton
//             onClick={downloadFile}
//             disabled={isDownloading}
//             size="small"
//             sx={{
//               position: "absolute",
//               bottom: 8,
//               right: 8,
//               bgcolor: "rgba(255,255,255,0.9)",
//               "&:hover": {
//                 bgcolor: "rgba(255,255,255,1)",
//               },
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               color: colors.secondary,
//               transition: "all 0.2s",
//               ":hover": {
//                 color: colors.primary,
//               },
//             }}
//           >
//             {isDownloading ? <CircularProgress size={20} sx={{ color: colors.primary }} /> : <DownloadIcon size={18} />}
//           </IconButton>
//         </Tooltip>
//       {/* )} */}
//     </Paper>
//   )
// }

// export default ShowFile

"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  alpha,
  Fade,
  Skeleton,
} from "@mui/material"
import {
  DownloadIcon,
  FileTextIcon,
  FileAudioIcon as AudioIcon,
  FileIcon,
  ImageIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ExternalLinkIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  RotateCwIcon,
  MaximizeIcon,
  FrameIcon,
} from "lucide-react"
import axios from "axios"

// הוסף את הייבוא הזה בראש הקובץ
import { downloadFileDirectly, downloadFileViaProxy } from "../services/api-service"
import ImageViewerModal from "./ImageViewerModalProps"
// import ImageViewerModal from "./ImageViewerModal"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

interface ShowFileProps {
  fileName: string
  showDownloadButton?: boolean
  height?: string | number
  width?: string | number
  showControls?: boolean
}

const ShowFile = ({
  fileName,
  showDownloadButton = true,
  height = "100%",
  width = "100%",
  showControls = true,
}: ShowFileProps) => {
  const [fileURL, setFileURL] = useState<string>("")
  const [fileType, setFileType] = useState<string>("")
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState<number>(100)
  const [isDragging, setIsDragging] = useState(false)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false)
  const [rotation, setRotation] = useState<number>(0)
  const [brightness, /*setBrightness*/] = useState<number>(100)
  const [contrast, /*setContrast*/] = useState<number>(100)
  const [/*isFullscreen*/, setIsFullscreen] = useState<boolean>(false)
  // const [showImageControls, setShowImageControls] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await axios.get(`${apiUrl}S3/download-url/${fileName}`)

        setFileURL(res.data.downloadUrl)

        // Extract file extension
        const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""
        setFileType(fileExtension)
      } catch (error) {
        console.error("Error fetching file URL:", error)
        setError("Failed to load file")
      } finally {
        setIsLoading(false)
      }
    }

    if (fileName) {
      fetchFileUrl()
    }
  }, [fileName])

  // החלף את פונקציית downloadFile בפונקציה המשופרת הזו:
  const downloadFile = async () => {
    setIsDownloading(true)
    setError(null)

    try {
      // נסה להוריד ישירות תחילה
      try {
        await downloadFileDirectly(fileURL, fileName)
        return // אם הצליח, צא מהפונקציה
      } catch (directError) {
        console.log("Direct download failed, trying proxy:", directError)
        // אם נכשל, נסה דרך ה-proxy
        try {
          await downloadFileViaProxy(fileURL, fileName)
        } catch (proxyError) {
          // אם גם ה-proxy נכשל, זרוק שגיאה
          throw proxyError
        }
      }
    } catch (error) {
      console.error("All download methods failed:", error)

      // הודעת שגיאה ברורה יותר
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        setError("שגיאת CORS: לא ניתן להוריד את הקובץ. נסה להשתמש בכפתור 'פתח בטאב חדש'.")
      } else {
        setError("שגיאה בהורדת הקובץ. נסה שוב או פתח בטאב חדש.")
      }
    } finally {
      setIsDownloading(false)
    }
  }

  // הוסף פונקציה חדשה לפתיחת תמונות בטאב חדש (כגיבוי)
  // const openInNewTab = () => {
  //   window.open(fileURL, "_blank")
  // }

  // מחק את פונקציית openImageInNewTab ובמקום זה השתמש בdownloadFile גם לתמונות

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 50))
  }

  const getFileIcon = () => {
    if (fileType.match(/(jpg|jpeg|png|gif)$/)) return <ImageIcon size={40} />
    if (fileType === "pdf") return <FileTextIcon size={40} />
    if (fileType.match(/(mp3|wav|ogg)$/)) return <AudioIcon size={40} />
    if (fileType.match(/(doc|docx)$/)) return <FileTextIcon size={40} />
    return <FileIcon size={40} />
  }

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.currentTarget as HTMLDivElement
    setIsDragging(true)
    target.style.cursor = "grabbing"
    target.dataset.startX = event.clientX.toString()
    target.dataset.startY = event.clientY.toString()
  }

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return

    const target = event.currentTarget as HTMLDivElement
    const startX = Number.parseFloat(target.dataset.startX || "0")
    const startY = Number.parseFloat(target.dataset.startY || "0")
    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY

    target.scrollLeft -= deltaX
    target.scrollTop -= deltaY

    target.dataset.startX = event.clientX.toString()
    target.dataset.startY = event.clientY.toString()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const openImageViewer = () => {
    if (fileType.match(/(jpg|jpeg|png|gif)$/)) {
      setIsImageViewerOpen(true)
    }
  }

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  // const handleRotateCounterClockwise = () => {
  //   setRotation((prev) => (prev - 90 + 360) % 360)
  // }

  // const handleResetImage = () => {
  //   setZoom(100)
  //   setRotation(0)
  //   setBrightness(100)
  //   setContrast(100)
  // }

  const handleFitToScreen = () => {
    if (imageRef.current) {
      const container = imageRef.current.parentElement
      if (container) {
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const imgWidth = imageRef.current.naturalWidth
        const imgHeight = imageRef.current.naturalHeight

        // Calculate the zoom level to fit the image to the container
        const widthRatio = containerWidth / imgWidth
        const heightRatio = containerHeight / imgHeight
        const newZoom = Math.min(widthRatio, heightRatio) * 100 * 0.9 // 90% of the container

        setZoom(newZoom)
      }
    }
  }

  // const toggleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     const container = imageRef.current?.parentElement
  //     if (container) {
  //       container.requestFullscreen().catch((err) => {
  //         console.error(`Error attempting to enable fullscreen: ${err.message}`)
  //       })
  //       setIsFullscreen(true)
  //     }
  //   } else {
  //     document.exitFullscreen()
  //     setIsFullscreen(false)
  //   }
  // }

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height,
          width,
          bgcolor: alpha(colors.light, 0.5),
          borderRadius: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ borderRadius: 2, minHeight: 150 }}
        />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height,
          width,
          bgcolor: alpha(colors.light, 0.5),
          borderRadius: 2,
          p: 3,
        }}
      >
        <AlertCircleIcon size={32} style={{ color: colors.primary, marginBottom: 16 }} />
        <Typography variant="body1" sx={{ fontWeight: 500, color: colors.secondary, mb: 1, textAlign: "center" }}>
          {error}
        </Typography>
        <Button
          size="small"
          onClick={() => window.location.reload()}
          variant="outlined"
          startIcon={<RefreshCwIcon size={16} />}
          sx={{
            mt: 2,
            borderRadius: 2,
            borderColor: colors.primary,
            color: colors.primary,
            "&:hover": {
              borderColor: colors.primary,
              bgcolor: alpha(colors.primary, 0.05),
            },
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Retry
        </Button>
      </Box>
    )
  }

  // Render different file types
  const renderFileContent = () => {
    if (fileType.match(/(jpg|jpeg|png|gif)$/)) {
      return (
        <>
          <Box
            sx={{
              position: "relative",
              height: "100%",
              width: "100%",
              overflow: "auto",
              cursor: isDragging ? "grabbing" : "grab",
              borderRadius: 2,
              bgcolor: alpha(colors.light, 0.5),
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onClick={() => {
              // Only open viewer if not dragging
              if (!isDragging) {
                openImageViewer()
              }
            }}
          >
            <Box
              component="img"
              ref={imageRef}
              src={fileURL}
              alt={fileName}
              sx={{
                width: `${zoom}%`,
                height: "auto",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                transition: "transform 0.3s ease, filter 0.3s ease",
                transform: `rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                crossOrigin: "anonymous",
              }}
              loading="lazy"
            />

            {showControls && (
              <Fade in={true}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    bgcolor: "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    p: 0.5,
                    zIndex: 10,
                  }}
                >
                  <Tooltip title="Zoom in">
                    <IconButton size="small" onClick={handleZoomIn} sx={{ color: colors.secondary }}>
                      <ZoomInIcon size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Zoom out">
                    <IconButton size="small" onClick={handleZoomOut} sx={{ color: colors.secondary }}>
                      <ZoomOutIcon size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Rotate clockwise">
                    <IconButton size="small" onClick={handleRotateClockwise} sx={{ color: colors.secondary }}>
                      <RotateCwIcon size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Fit to screen">
                    <IconButton size="small" onClick={handleFitToScreen} sx={{ color: colors.secondary }}>
                      <FrameIcon size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open fullscreen viewer">
                    <IconButton size="small" onClick={openImageViewer} sx={{ color: colors.secondary }}>
                      <MaximizeIcon size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download image">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent opening the viewer
                        downloadFile()
                      }}
                      sx={{ color: colors.secondary }}
                    >
                      <DownloadIcon size={18} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Fade>
            )}

            <Tooltip title="Click to open fullscreen viewer">
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "rgba(255,255,255,0.7)",
                  color: colors.secondary,
                  borderRadius: 10,
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  pointerEvents: "none",
                  opacity: 0.8,
                }}
              >
                Click to enlarge
              </Box>
            </Tooltip>
          </Box>

          <ImageViewerModal
            open={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
            imageUrl={fileURL}
            fileName={fileName}
          />
        </>
      )
    }

    if (fileType === "pdf") {
      return (
        <Box sx={{ height: "100%", width: "100%", minHeight: 300, display: "flex", flexDirection: "column" }}>
          <Box
            component="iframe"
            src={fileURL}
            title={fileName}
            sx={{
              width: "100%",
              flexGrow: 1,
              border: "none",
              minHeight: 250,
              borderRadius: 2,
            }}
          />
          <Button
            variant="outlined"
            size="small"
            component="a"
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<ExternalLinkIcon size={16} />}
            sx={{
              mt: 2,
              alignSelf: "center",
              borderRadius: 2,
              borderColor: colors.primary,
              color: colors.primary,
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: alpha(colors.primary, 0.05),
              },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Open PDF in New Tab
          </Button>
        </Box>
      )
    }

    if (fileType.match(/(mp3|wav|ogg)$/)) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            p: 3,
            minHeight: 120,
            bgcolor: alpha(colors.light, 0.5),
            borderRadius: 2,
          }}
        >
          <AudioIcon size={40} style={{ color: colors.primary, marginBottom: 16 }} />
          <Typography variant="body2" noWrap sx={{ maxWidth: "100%", mb: 2, color: colors.secondary }}>
            {fileName}
          </Typography>
          <Box
            component="audio"
            controls
            src={fileURL}
            sx={{
              width: "100%",
              minWidth: "250px",
              "&::-webkit-media-controls-panel": {
                bgcolor: "white",
              },
            }}
          >
            Your browser does not support the audio element.
          </Box>
        </Box>
      )
    }

    if (fileType.match(/(doc|docx)$/)) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            p: 3,
            bgcolor: alpha(colors.light, 0.5),
            borderRadius: 2,
          }}
        >
          <FileTextIcon size={40} style={{ color: colors.primary, marginBottom: 16 }} />
          <Typography variant="body2" noWrap sx={{ maxWidth: "100%", mb: 2, color: colors.secondary }}>
            {fileName}
          </Typography>
          <Button
            variant="contained"
            size="small"
            component="a"
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<ExternalLinkIcon size={16} />}
            sx={{
              bgcolor: colors.primary,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.9),
              },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Open Document
          </Button>
        </Box>
      )
    }

    // Default file display
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          p: 3,
          bgcolor: alpha(colors.light, 0.5),
          borderRadius: 2,
        }}
      >
        <Box sx={{ color: colors.primary, mb: 2 }}>{getFileIcon()}</Box>
        <Typography variant="body1" sx={{ fontWeight: 500, color: colors.secondary, mb: 1, textAlign: "center" }}>
          {fileName}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon size={16} />}
            onClick={downloadFile}
            disabled={isDownloading}
            sx={{
              mt: 2,
              borderRadius: 2,
              borderColor: colors.primary,
              color: colors.primary,
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: alpha(colors.primary, 0.05),
              },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
          <Button
            variant="outlined"
            size="small"
            component="a"
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<ExternalLinkIcon size={16} />}
            sx={{
              mt: 2,
              borderRadius: 2,
              borderColor: colors.secondary,
              color: colors.secondary,
              "&:hover": {
                borderColor: colors.secondary,
                bgcolor: alpha(colors.secondary, 0.05),
              },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Open in New Tab
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        height,
        width,
        overflow: "hidden",
        borderRadius: 2,
        border: `1px solid ${alpha(colors.secondary, 0.1)}`,
      }}
    >
      {renderFileContent()}

      {showDownloadButton && fileURL && fileType.match(/\.(jpg|jpeg|png|gif)$/i) && (
        <Tooltip title="Download image">
          <IconButton
            onClick={downloadFile}
            disabled={isDownloading}
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,1)",
              },
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              color: colors.secondary,
              transition: "all 0.2s",
              ":hover": {
                color: colors.primary,
              },
            }}
          >
            {isDownloading ? <CircularProgress size={20} sx={{ color: colors.primary }} /> : <DownloadIcon size={18} />}
          </IconButton>
        </Tooltip>
      )}

      {showDownloadButton && fileURL && !fileType.match(/\.(jpg|jpeg|png|gif)$/i) && (
        <Tooltip title="Download file">
          <IconButton
            onClick={downloadFile}
            disabled={isDownloading}
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,1)",
              },
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              color: colors.secondary,
              transition: "all 0.2s",
              ":hover": {
                color: colors.primary,
              },
            }}
          >
            {isDownloading ? <CircularProgress size={20} sx={{ color: colors.primary }} /> : <DownloadIcon size={18} />}
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  )
}

export default ShowFile
