import Basket from '../models/basket.js';

export const getBasket = async (req, res) => {
    try {
        let basket = await Basket.findOne({ userId: req.user._id }).populate("items.productId", "name price foodImage");
        if (!basket) {
            basket = { items: [] };
        }
        res.json(basket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToBasket = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let basket = await Basket.findOne({ userId: req.user._id });
        if (!basket) {
            basket = new Basket({ userId: req.user._id, items: [] });
        }
        if (basket.items.find(item => item.productId.toString() === productId)) {
            const itemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
            basket.items[itemIndex].quantity += quantity;
        } else {
            basket.items.push({ productId, quantity });
        }
        await basket.save();
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFromBasket = async (req, res) => {
    const { productId } = req.body;
    try {
        let basket = await Basket.findOne({ userId: req.user._id });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
        if (basket.items.find(item => item.productId.toString() === productId)) {
            const itemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
            basket.items.splice(itemIndex, 1);
        }
        await basket.save();
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const decreaseFromBasket = async (req, res) => {
    const { productId } = req.body;
    try {
        let basket = await Basket.findOne({ userId: req.user._id });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
        if (basket.items.find(item => item.productId.toString() === productId)) {
            const itemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
            if (basket.items[itemIndex].quantity > 1) {
                basket.items[itemIndex].quantity -= 1;
            } else {
                basket.items.splice(itemIndex, 1);
            }
        }
        await basket.save();
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const mergeBasket = async (req, res) => {
    const { items } = req.body;
    try {
        let basket = await Basket.findOne({ userId: req.user._id });
        if (!basket) {
            basket = new Basket({ userId: req.user._id, items: [] });
        }
        items.forEach(item => {
            const existingItem = basket.items.find(basketItem => basketItem.productId.toString() === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                basket.items.push(item);
            }
        });
        await basket.save();
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};