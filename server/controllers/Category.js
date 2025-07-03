const Category = require('../models/Category');
//create  handler function
exports.createCategory = async(req,res)=>{
    try {
        //fetch data
        const {name,description}=req.body
        //validation -- both fields must be there
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create entry in database
        const categoryDetails=await Category.create({
            name:name,
            description:description,
        });
        //console.log(tagDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Error while creating category',
            error:error.message,
        })
    }
}
//getAllCategories handler function
exports.showAllCategories=async (req,res)=>{
        try {
            const allCategories=await Category.find({},{name:true,description:true});
            res.status(200).json({
                success:true,
                data: allCategories,
                message:"All categories returned successfully",
                
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
        
     }
}

//  Utility function to generate a random index
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//  GET CATALOG PAGE DETAILS
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("📥 PRINTING CATEGORY ID:", categoryId);

    // 1. Get selected category + its published courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    console.log("Selected Category:", selectedCategory);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Fallback to empty array if no courses
    const selectedCourses = Array.isArray(selectedCategory.courses)
      ? selectedCategory.courses
      : [];

    // 2. Get a different random category (excluding selected one)
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomIndex = getRandomInt(categoriesExceptSelected.length);
      const randomCategoryId = categoriesExceptSelected[randomIndex]._id;

      differentCategory = await Category.findById(randomCategoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // 3. Get all published courses from all categories to compute most-selling
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap(cat => cat.courses || []);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    // 4. Send the response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory: {
          _id: selectedCategory._id,
          name: selectedCategory.name,
          description: selectedCategory.description,
          courses: selectedCourses,
        },
        differentCategories: differentCategory ? [differentCategory] : [],
        mostSellingCourses,
      },
    });

  } catch (error) {
    console.error( "getCategoryPageDetails ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};