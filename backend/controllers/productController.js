import Product from '../models/Product.js';

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, imageUrl, stock } = req.body;

        const product = new Product({
            title: title || 'Sample name',
            price: price || 0,
            description: description || 'Sample description',
            imageUrl: imageUrl || '/images/sample.jpg',
            category,
            stock: stock || 0
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category, imageUrl, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.title = title ?? product.title;
            product.description = description ?? product.description;
            product.price = price ?? product.price;
            product.category = category ?? product.category;
            product.imageUrl = imageUrl ?? product.imageUrl;
            product.stock = stock ?? product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
