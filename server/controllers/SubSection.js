const SubSection=require('../models/SubSection')
const Section=require('../models/Section')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const {uploadVideoToCloudinary} = require('../utils/videoUploader')

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;
    const video = req.files?.videoFile;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found with given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sub section created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("❌ Error in createSubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



// exports.createSubSection=async (req,res)=>{
//     try {
//         //fetch data from req body
//         const {sectionId,title,timeDuration,description}=req.body

//         //extract file/video
//         const video=req.files.videoFile;
//         //validation
//         if(!sectionId||!title||!description||!video){
//             return res.status(400).json({
//                 success:false,
//                 message:'All fields are required'
//             })
//         }
//         //upload video to cloudinary
//         const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
//         //create a subsection
//         const subSectionDetails = await SubSection.create({
//             title:title,
//             timeDuration:timeDuration,
//             description:description,
//             videoUrl:uploadDetails.secure_url
//         })
//         //update section with this subsection
//         const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{
//             $push:{
//                 subSection:subSectionDetails._id,
//             }
//         },{new:true})

//         //log updated section here after adding populate query
//         //return response
//         return res.status(200).json({
//             success:true,
//             message:'Sub section created successfully',
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:true,
//             message:'Internal Server Error',
//             error:error.message,
//         })
//     }
// }

// exports.createSubSection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body
//     const video = req.files.videoFile

//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       })
//     }

//     // Upload video to Cloudinary (for video, not image!)
//     const uploadDetails = await uploadVideoToCloudinary(video, process.env.FOLDER_NAME)

//     // Create a subsection with duration
//     const subSectionDetails = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//       timeDuration: Math.floor(uploadDetails.duration).toString(), // save in seconds as string
//     })

//     // Update Section with this subsection
//     const updatedSection = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         $push: {
//           subSection: subSectionDetails._id,
//         },
//       },
//       { new: true }
//     ).populate("subSection")

//     return res.status(200).json({
//       success: true,
//       message: "Sub section created successfully",
//       data: updatedSection,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     })
//   }
// }

//make updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSection ID is required to update'
            });
        }

        // find in DB
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        // add data
        if (title) {
            subSection.title = title;
        }

        if (description) {
            subSection.description = description;
        }

        // upload video to cloudinary
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        // save data to DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        });
    }
    catch (error) {
        console.error('Error while updating the section')
        console.error(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating the section",
        })
    }
}

//make delete subSection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // delete from DB
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate('subSection')

        // In frontned we have to take care - when subsection is deleted we are sending ,
        // only section data not full course details as we do in others 

        // success response
        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,

            error: error.message,
            message: "An error occurred while deleting the SubSection",
        })
    }
}