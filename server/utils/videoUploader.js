const cloudinary = require("cloudinary").v2

/**
 * Uploads a video file to Cloudinary.
 *
 * @param {Object} file - The video file from req.files
 * @param {string} folder - The folder name in Cloudinary
 * @returns {Promise<Object>} - Upload result including duration, secure_url, etc.
 */
exports.uploadVideoToCloudinary = async (file, folder) => {
  try {
    const options = {
      resource_type: "video", // Important: this ensures Cloudinary treats it as video
      folder: folder,
    }

    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, options)
    return uploadResult
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error)
    throw error
  }
}
