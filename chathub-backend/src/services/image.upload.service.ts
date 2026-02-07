import User from '../models/User.model.js'
import cloudinary from '../utils/cloudinary.js'

// ================================ Single image upload for users ===============================
export const singleImageUploadService = async (file: Express.Multer.File, id: string) => {
  try {
    if (!file) {
      throw new Error('No file received')
    }
    const uploadCloudinary = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'e-commerce/users' }, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
        .end(file.buffer)
    })

    const image = {
      publicId: uploadCloudinary.public_id,
      url: uploadCloudinary.secure_url,
    }

    const userFind = await User.findByIdAndUpdate(id, { image })
    return userFind
  } catch (error: any) {
    throw new Error(error.message || 'Image upload failed')
  }
}
