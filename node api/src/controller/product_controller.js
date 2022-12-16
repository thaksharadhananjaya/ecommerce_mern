const ProductModel = require('../models/product_model');
const CategoryModel = require('../models/category_model');

exports.addProduct = async (req, res) => {

    const { name, categoryID, quantity, price, description } = req.body;
    let files = req.files.map(file => { return file.originalname });

    try {
        if (!await CategoryModel.findById(categoryID)) {
            return res.status(400).json({ message: 'Invalid category ID!' });

        }
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid category ID!' });
        return res.status(500).json({ message: 'Something went to wrong' });
    }
    try {

        /* if (req.files.length > 0 && req.files.length < 6) {
            
        } else if (req.files.length > 5) {
            return res.status(400).json({ message: 'Maximum 5 images only!' });
        } */
        const productModel = new ProductModel({
            name,
            slug: name,
            category: categoryID,
            price,
            quantity,
            images: files,
            description
        });
        const product = await productModel.save();
        if (product)
            return res.status(201).json({ message: 'Product added successful !' });

        return res.status(500).json({ message: 'Something went to wrong' });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({ message: 'Product name already exits!' });
        }
        return res.status(500).json(error);
    }


}

exports.updateProduct = async (req, res) => {

    const { name, categoryID, quantity, price, description } = req.body;
    let files = req.files.map(file => { return file.originalname });
    /* if (req.files.length > 0 && req.files.length < 6) {
        
    } else if (req.files.length > 5) {
        return res.status(400).json({ message: 'Maximum 5 images only!' });
    } */

    try {
        if (!await CategoryModel.findById(categoryID)) {
            return res.status(400).json({ message: 'Invalid category ID!' });
        }
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid category ID!' });
        return res.status(500).json({ message: 'Something went to wrong' });
    }
    try {
        const productModel = {
            name,
            slug: name,
            category: categoryID,
            price,
            quantity,
            images: files,
            description
        };
        if (await ProductModel.findByIdAndUpdate(req.params.id, {
            name: productModel.name,
            slug: productModel.slug,
            category: productModel.category,
            price: productModel.price,
            quantity: productModel.quantity,
            images: productModel.images
        }))
            return res.status(200).json({ message: 'Update successful!' });

        return res.status(400).json({ message: 'Invalid product ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid product ID!' });

        return res.status(500).json({ message: 'Something went to wrong' });
    }


}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().select('-__v').populate('category');
        if (products && products.length > 0) {
            return res.status(200).json(products);
        }
        return res.status(404).json({ message: 'Products not found!' });
    } catch (error) {
        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.getProductByID = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).select('-__v').populate('category');
        if (product)
            return res.status(200).json(product);

        return res.status(400).json({ message: 'Invalid product ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid product ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.getProductByCategories = async (req, res) => {
    const categoryIDs = req.query.categoryIDs.split(',').map(id => { return { category: id.trim() } })
    try {
        const product = await ProductModel.findOne({ $or: categoryIDs }).select('-__v').populate('category');
        if (product)
            return res.status(200).json(product);

        return res.status(404).json({ message: 'Not found products!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Not found products!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.deleteProductByID = async (req, res) => {

    try {
        if (await ProductModel.findByIdAndDelete(req.params.id))
            return res.status(200).json({
                message: 'Delete successful!'
            });
        return res.status(400).json({ message: 'Invalid product ID!' });

    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid product ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }

}


