const CategoryModel = require('../models/category_model');

exports.addCategory = async (req, res) => {

    const { name, parentID } = req.body;
    const categoryModel = new CategoryModel({
        name,
        slug: name,
        parentID
    });
    if (parentID) {
        try {
            if (!await CategoryModel.findById(parentID)) {
                return res.status(400).json({ message: 'Invalid parent category ID!' });
            }
        }
        catch (error) {
            if (error.kind == 'ObjectId')
                return res.status(400).json({ message: 'Invalid parent category ID!' });
            return res.status(500).json({ message: 'Something went to wrong' });
        }

    }
    try {
        const category = await categoryModel.save();

        if (category)
            return res.status(201).json({ message: 'Category added successful !' });

        return res.status(500).json({ message: 'Something went to wrong' });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({ message: 'Category name already exits!' });
        }
        return res.status(500).json({ message: 'Something went to wrong' });
    }


}

exports.updateCategory = async (req, res) => {

    const { name, parentID } = req.body;
    const categoryModel = {
        name,
        slug: name,
        parentID
    };
    if (parentID) {
        try {
            if (!await CategoryModel.findById(parentID)) {
                if (error.kind == 'ObjectId')
                    return res.status(400).json({ message: 'Invalid parent category ID!' });
                return res.status(500).json({ message: 'Something went to wrong' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid parent category ID!' });
        }
    }

    try {
        if (await CategoryModel.findByIdAndUpdate(req.params.id, categoryModel))
            return res.status(200).json({ message: 'Update successful!' });

        return res.status(400).json({ message: 'Invalid category ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid category ID!' });

        return res.status(500).json({ message: 'Something went to wrong' });
    }

}


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().select('-__v').exec();
        if (categories) {
            const categoriesList = createCategoriesList(categories);
            return res.status(200).json(categoriesList);
        }

        return res.status(404).json({ message: 'Category not found!' });
    } catch (error) {
        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.getCategoryByID = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id).select('-__v').exec();
        if (category)
            return res.status(200).json(category);

        return res.status(400).json({ message: 'Invalid category ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid category ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.deleteCategoryByID = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            if (await CategoryModel.findByIdAndDelete(req.params.id))
                return res.status(200).json({
                    message: 'Delete successful!'
                });
            return res.status(400).json({ message: 'Invalid category ID!' });

        } catch (error) {
            if (error.kind == 'ObjectId')
                return res.status(400).json({ message: 'Invalid category ID!' });

            return res.status(500).json({ message: 'Something want to wrong!' });
        }
    } else {
        return res.status(403).json({
            message: 'Permission denied !'
        });
    }
}

// join category & child categories
function createCategoriesList(categories, parentID = null) {
    var categoriesList = [];
    let category;

    if (parentID == null) {
        category = categories.filter(cat => cat.parentID == undefined);
    } else {
        category = categories.filter(cat => cat.parentID == parentID);
    }

    for (let cat of category) {
        categoriesList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategoriesList(categories, cat._id)
        });
    }
    return categoriesList;
}