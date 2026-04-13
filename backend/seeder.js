import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';

dotenv.config();

connectDB();

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Royal Lotus Brass Urli', price: 4500, image: '/images/products/royal_lotus_urli.png', category: 'Decor', description: 'A handcrafted, wide vessel featuring intricate lotus engravings, perfect for floating fragrant flower petals and candles.' },
  { id: 2, name: 'Vintage Ganesha Idol', price: 8200, image: '/images/products/vintage_ganesha_idol.png', category: 'Artifacts', description: 'A magnificent, weighty brass idol of Lord Ganesha, seated on a pedestal. Exudes an aura of ancient prosperity.' },
  { id: 3, name: 'Ornate Diya Stand Set', price: 2100, image: '/images/products/ornate_diya_stand.png', category: 'Spiritual', description: 'A pair of traditional multi-tier brass oil lamps (Diyas). Casts a warm, spiritual glow to illuminate your space.' },
  { id: 4, name: 'Handcrafted Brass Planter', price: 5600, image: '/images/products/handcrafted_brass_planter.png', category: 'Home', description: 'A spacious, hammered brass planter pot that naturally develops a deep patina over time.' },
  { id: 5, name: 'Antique Peacock Brass Bell', price: 3200, image: '/images/products/antique_peacock_bell.png', category: 'Decor', description: 'A decorative hanging brass bell featuring a detailed peacock design, perfect for home entrances.' },
  { id: 6, name: 'Hand-Etched Brass Serving Tray', price: 3800, image: '/images/products/etched_brass_tray.png', category: 'Luxury', description: 'Elegant serving tray with hand-etched geometric patterns, ideal for festive occasions.' },
  { id: 7, name: 'Royal Elephant Brass Vastu Figurine', price: 6500, image: '/images/products/royal_elephant_figurine.png', category: 'Artifacts', description: 'A majestic elephant brass figurine, symbolizing strength and prosperity, perfect for Vastu and home decor.' },
  { id: 8, name: 'Traditional Brass Spice Box', price: 4200, image: '/images/products/brass_spice_box.png', category: 'Kitchen', description: 'Handcrafted brass masala dani with 7 compartments, combining tradition with elegance for your kitchen.' },
  { id: 9, name: 'Royal Peacock Carved Urli', price: 5200, image: '/images/products/peacock_carved_urli.png', category: 'Decor', description: 'A luxurious urli bowl featuring detailed peacock carvings, perfect for festive water and flower arrangements.' },
  { id: 10, name: 'Celestial Brass Sun Art', price: 7800, image: '/images/products/celestial_sun_wall_art.png', category: 'Wall Art', description: 'An intricate celestial sun wall art piece with an antique finish, adding divine warmth to any space.' },
  { id: 11, name: 'Ornate Temple Hanging Bell', price: 2800, image: '/images/products/temple_bell_chain.png', category: 'Decor', description: 'Traditional temple bell with a thick ornate chain, featuring detailed carvings on every link.' },
  { id: 12, name: 'Gajalakshmi Brass Idol Lamp', price: 6200, image: '/images/products/gajalakshmi_idol_lamp.png', category: 'Spiritual', description: 'Magnificent idol lamp of Goddess Lakshmi with elephants, symbolizing prosperity and light.' }
];

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create([
            { name: 'Admin User', email: 'krivia@exa.com', password: 'password123', role: 'admin' },
            { name: 'kunal', email: 'kunal@gmail.com', password: 'password123', role: 'client' },
            { name: 'bhavy', email: 'bhavy@gmail.com', password: 'password123', role: 'client' },
            { name: 'ram', email: 'ram@gmail.com', password: 'password123', role: 'client' },
            { name: 'jeetrajsing', email: 'jeetrajsing@gmail.com', password: 'password123', role: 'client' },
            { name: 'divyarajsinh', email: 'divyarajsinh@gmail.com', password: 'password123', role: 'client' },
            { name: 'ronak', email: 'ronak@gmail.com', password: 'password123', role: 'client' },
            { name: 'ayush', email: 'ayush@gmail.com', password: 'password123', role: 'client' }
        ]);

        const categories = await Category.create([
            { name: 'Decor', description: 'Exquisite brass centerpieces and urlis.' },
            { name: 'Artifacts', description: 'Ancient-inspired brass idols and figurines.' },
            { name: 'Spiritual', description: 'Traditional brass diyas and temple items.' },
            { name: 'Luxury', description: 'High-end etched brass serving and display pieces.' },
            { name: 'Kitchen', description: 'Functional and elegant brass kitchenware.' },
            { name: 'Home', description: 'Modern brass planters and lifestyle additions.' },
            { name: 'Wall Art', description: 'Intricate brass wall hangings and celestial art.' }
        ]);

        const findCat = (name) => categories.find(c => c.name === name)._id;

        const sampleProducts = DUMMY_PRODUCTS.map((p) => {
            return {
                title: p.name,
                description: p.description,
                price: p.price,
                imageUrl: p.image,
                category: findCat(p.category),
                stock: 12
            };
        });

        const createdProducts = await Product.insertMany(sampleProducts);

        // Seed some dummy orders for visibility
        const clientUsers = createdUsers.filter(u => u.role === 'client');
        const ordersData = [];

        clientUsers.forEach((client, index) => {
            const product = createdProducts[index % createdProducts.length];
            ordersData.push({
                user: client._id,
                orderItems: [
                    {
                        title: product.title,
                        qty: 1,
                        price: product.price,
                        product: product._id
                    }
                ],
                shippingAddress: {
                    address: '123 Brass Street',
                    city: 'Jaipur',
                    postalCode: '302001',
                    country: 'India'
                },
                paymentMethod: 'Credit Card',
                totalAmount: product.price + 100,
                isPaid: true,
                paidAt: new Date(),
                isDelivered: index % 2 === 0,
                deliveredAt: index % 2 === 0 ? new Date() : null
            });
        });

        await Order.insertMany(ordersData);

        console.log('Full Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
