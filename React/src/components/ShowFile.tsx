

import type React from "react"

import { useEffect, useState } from "react"
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
} from "lucide-react"
import axios from "axios"

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

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await axios.get(`https://localhost:7230/api/S3/download-url/${fileName}`)

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

  // Function to trigger file download
  const downloadFile = async () => {
    setIsDownloading(true)
console.log("מורידים אותי");

    try {
      const response = await axios.get(fileURL, {
        responseType: "blob",
      })

      const blob = new Blob([response.data])
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.log("שגיאה בהורדת הקובץ", error);
      
      console.error("Error downloading file:", error)
      setError("Download failed")
    } finally {
      setIsDownloading(false)
    }
  }

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
        >
          <Box
            component="img"
            src={fileURL}
            alt={fileName}
            sx={{
              width: `${zoom}%`,
              height: "auto",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
              transition: "width 0.3s ease",
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
              </Box>
            </Fade>
          )}
        </Box>
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

      {/* {showDownloadButton && fileURL && !fileType.match(/\.(jpg|jpeg|png|gif)$/i) && ( */}
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
      {/* )} */}
    </Paper>
  )
}

export default ShowFile

