"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, IconButton, Box, Typography, Slider, Tooltip, Fade } from "@mui/material"
import {
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCwIcon,
  RotateCcwIcon,
  MaximizeIcon,
  MinimizeIcon,
  RefreshCwIcon,
  DownloadIcon,
  SunIcon,
  ZapIcon,
  FrameIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { downloadFileDirectly, downloadFileViaProxy } from "../services/api-service"

// New elegant color palette
const colors = {
  primary: "#E07A5F", // Terracotta
  secondary: "#3D405B", // Dark slate blue
  light: "#F4F1DE", // Cream
  accent: "#81B29A", // Sage green
  dark: "#2D3142", // Dark blue-gray
}

interface ImageViewerModalProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  fileName: string
  images?: Array<{ id: number; imageUrl: string; name: string }>
  currentImageId?: number
  onNavigate?: (direction: "prev" | "next") => void
}

const ImageViewerModal = ({
  open,
  onClose,
  imageUrl,
  fileName,
  images,
  onNavigate,
}: ImageViewerModalProps) => {
  const [zoom, setZoom] = useState<number>(100)
  const [rotation, setRotation] = useState<number>(0)
  const [brightness, setBrightness] = useState<number>(100)
  const [contrast, setContrast] = useState<number>(100)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [/*isDownloading*/, setIsDownloading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset image settings when a new image is loaded
  useEffect(() => {
    if (open) {
      setZoom(100)
      setRotation(0)
      setBrightness(100)
      setContrast(100)
      setError(null)
    }
  }, [open, imageUrl])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          if (onNavigate) onNavigate("prev")
          break
        case "ArrowRight":
          if (onNavigate) onNavigate("next")
          break
        case "+":
        case "=":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "r":
          handleRotateClockwise()
          break
        case "R":
          handleRotateCounterClockwise()
          break
        case "f":
          toggleFullscreen()
          break
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen()
          } else {
            onClose()
          }
          break
        case "0":
          handleResetImage()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, isFullscreen, onNavigate])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 300))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 20))
  }

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360)
  }

  const handleResetImage = () => {
    setZoom(100)
    setRotation(0)
    setBrightness(100)
    setContrast(100)
  }

  const handleFitToScreen = () => {
    if (imageRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const imgWidth = imageRef.current.naturalWidth
      const imgHeight = imageRef.current.naturalHeight

      // Calculate the zoom level to fit the image to the container
      const widthRatio = containerWidth / imgWidth
      const heightRatio = containerHeight / imgHeight
      const newZoom = Math.min(widthRatio, heightRatio) * 100 * 0.9 // 90% of the container

      setZoom(newZoom)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const container = containerRef.current
      if (container) {
        container.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
        setIsFullscreen(true)
      }
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
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

  const downloadImage = async () => {
    setIsDownloading(true)
    setError(null)

    try {
      // Try direct download first
      try {
        await downloadFileDirectly(imageUrl, fileName)
        return // If successful, exit the function
      } catch (directError) {
        console.log("Direct download failed, trying proxy:", directError)
        // If failed, try via proxy
        try {
          await downloadFileViaProxy(imageUrl, fileName)
        } catch (proxyError) {
          // If proxy also fails, throw error
          throw proxyError
        }
      }
    } catch (error) {
      console.error("All download methods failed:", error)

      // Clearer error message
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        setError("שגיאת CORS: לא ניתן להוריד את הקובץ. נסה להשתמש בכפתור 'פתח בטאב חדש'.")
      } else {
        setError("שגיאה בהורדת הקובץ. נסה שוב או פתח בטאב חדש.")
      }
    } finally {
      setIsDownloading(false)
    }
  }

  // const openInNewTab = () => {
  //   window.open(imageUrl, "_blank")
  // }

  const hasMultipleImages = images && images.length > 1

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: "rgba(0, 0, 0, 0.9)",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: "hidden", position: "relative" }}>
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            zIndex: 10,
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <XIcon />
        </IconButton>

        {/* Image container */}
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            cursor: isDragging ? "grabbing" : "grab",
            position: "relative",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseEnter={() => setShowControls(true)}
        //   onMouseMove={() => setShowControls(true)}
          onClick={() => setShowControls(true)}
        >
          <Box
            component="img"
            ref={imageRef}
            src={imageUrl}
            alt={fileName}
            sx={{
              maxWidth: `${zoom}%`,
              maxHeight: `${zoom}%`,
              objectFit: "contain",
              transition: "transform 0.3s ease, filter 0.3s ease",
              transform: `rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              userSelect: "none",
              pointerEvents: "none",
            }}
            onLoad={handleFitToScreen}
          />
        </Box>

        {/* Navigation buttons for multiple images */}
        {hasMultipleImages && onNavigate && (
          <>
            <IconButton
              onClick={() => onNavigate("prev")}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                zIndex: 10,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              onClick={() => onNavigate("next")}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                zIndex: 10,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}

        {/* Top controls */}
        <Fade in={showControls}>
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              bgcolor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
              p: 1,
              zIndex: 10,
            }}
          >
            <Tooltip title="Zoom in (+ key)">
              <IconButton size="small" onClick={handleZoomIn} sx={{ color: "white" }}>
                <ZoomInIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Zoom out (- key)">
              <IconButton size="small" onClick={handleZoomOut} sx={{ color: "white" }}>
                <ZoomOutIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Rotate clockwise (r key)">
              <IconButton size="small" onClick={handleRotateClockwise} sx={{ color: "white" }}>
                <RotateCwIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Rotate counter-clockwise (R key)">
              <IconButton size="small" onClick={handleRotateCounterClockwise} sx={{ color: "white" }}>
                <RotateCcwIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Fit to screen">
              <IconButton size="small" onClick={handleFitToScreen} sx={{ color: "white" }}>
                <FrameIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title={isFullscreen ? "Exit fullscreen (f key)" : "Fullscreen (f key)"}>
              <IconButton size="small" onClick={toggleFullscreen} sx={{ color: "white" }}>
                {isFullscreen ? <MinimizeIcon size={20} /> : <MaximizeIcon size={20} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset image (0 key)">
              <IconButton size="small" onClick={handleResetImage} sx={{ color: "white" }}>
                <RefreshCwIcon size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Download image">
              <IconButton size="small" onClick={downloadImage} sx={{ color: "white" }}>
                <DownloadIcon size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* Bottom controls */}
        <Fade in={showControls}>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
              p: 2,
              width: "300px",
              zIndex: 10,
            }}
          >
            {error && (
              <Typography variant="caption" sx={{ color: colors.primary, mb: 1 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SunIcon size={16} style={{ color: "white" }} />
              <Typography variant="caption" sx={{ width: 70, color: "white" }}>
                Brightness
              </Typography>
              <Slider
                size="small"
                value={brightness}
                min={50}
                max={150}
                onChange={(_, value) => setBrightness(value as number)}
                sx={{
                  color: colors.primary,
                  "& .MuiSlider-thumb": {
                    width: 14,
                    height: 14,
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ZapIcon size={16} style={{ color: "white" }} />
              <Typography variant="caption" sx={{ width: 70, color: "white" }}>
                Contrast
              </Typography>
              <Slider
                size="small"
                value={contrast}
                min={50}
                max={150}
                onChange={(_, value) => setContrast(value as number)}
                sx={{
                  color: colors.primary,
                  "& .MuiSlider-thumb": {
                    width: 14,
                    height: 14,
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ZoomInIcon size={16} style={{ color: "white" }} />
              <Typography variant="caption" sx={{ width: 70, color: "white" }}>
                Zoom: {zoom.toFixed(0)}%
              </Typography>
              <Slider
                size="small"
                value={zoom}
                min={20}
                max={300}
                onChange={(_, value) => setZoom(value as number)}
                sx={{
                  color: colors.primary,
                  "& .MuiSlider-thumb": {
                    width: 14,
                    height: 14,
                  },
                }}
              />
            </Box>

            {hasMultipleImages && (
              <Typography variant="caption" sx={{ color: "white", textAlign: "center", mt: 1 }}>
                Use arrow keys to navigate between images
              </Typography>
            )}
          </Box>
        </Fade>
      </DialogContent>
    </Dialog>
  )
}

export default ImageViewerModal
