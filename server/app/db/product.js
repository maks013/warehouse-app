import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    quantity: Number,
    ean_code: String,
    image: String,
}, {
    timestamps: false,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
