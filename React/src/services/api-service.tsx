// שירות API להורדת קבצים
// הוסף את הקובץ הזה לתיקיית services או utils בפרויקט שלך

import axios from "axios"

// פונקציה להורדת קובץ דרך ה-proxy
export const downloadFileViaProxy = async (url: string, fileName: string): Promise<Blob> => {
  try {
    // שימוש בנקודת הקצה proxy-download
    const response = await axios.get(
      `/api/proxy-download?url=${encodeURIComponent(url)}&fileName=${encodeURIComponent(fileName)}`,
      {
        responseType: "blob",
      },
    )

    return response.data
  } catch (error) {
    console.error("Error downloading file via proxy:", error)
    throw error
  }
}

// פונקציה להורדת קובץ ישירות מהדפדפן
export const downloadFileDirectly = async (url: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()

    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = blobUrl
    link.download = fileName

    document.body.appendChild(link)
    link.click()

    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    }, 100)
  } catch (error) {
    console.error("Error downloading file directly:", error)
    throw error
  }
}
