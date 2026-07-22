const dummyMiddleware = (req, res, next) => {
    req.user = {
        _id: "64a1f3e5c9b1f2a1b2c3d4e5",
        name: "John Doe",
        email: "john.doe@example.com"
    };
    next();
}

export default dummyMiddleware;