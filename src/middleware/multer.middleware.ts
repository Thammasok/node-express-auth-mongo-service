import multer from 'multer'

const storage = multer.memoryStorage() // Store files in memory for quick access

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
})

export default upload
