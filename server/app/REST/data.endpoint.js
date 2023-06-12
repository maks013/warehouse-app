import Product from "../product";

const dataEndpoint = (router) => {
    router.get("/api/products", async (request, response, next) => {
        try {
            const products = await Product.find();
            response.status(200).send({products});
        } catch (error) {
            response.status(500).send({error: error.message});
        }
    });

    router.get("/api/products/:id", async (request, response, next) => {
        try {
            const product = await Product.findById(request.params.id);

            if (product) {
                response.status(200).send({product});
            } else {
                response.status(404).send({error: "Product not found"});
            }
        } catch (error) {
            response.status(500).send({error: error.message});
        }
    });

    router.post("/api/products", async (request, response, next) => {
        const {
            title,
            description,
            quantity,
            ean_code,
            image
        } = request.body;

        if (!title || !image || !description || !quantity || !ean_code) {
            response.status(400).send({error: "All fields are required."});
            return;
        }

        try {
            const newProduct = new Product({
                title,
                description,
                quantity,
                ean_code,
                image
            });

            const savedProduct = await newProduct.save();

            response.status(201).send({product: savedProduct});
        } catch (error) {
            response.status(500).send({error: error.message});
        }
    });

    router.put("/api/products/:id", async (request, response, next) => {
        const {
            title,
            description,
            quantity,
            ean_code,
            image
        } = request.body;

        if (!title || !image || !description || !quantity || !ean_code) {
            response.status(400).send({error: "All fields are required."});
            return;
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                request.params.id,
                {title, description, quantity, ean_code, image},
                {new: true}
            );

            if (updatedProduct) {
                response.status(200).send({product: updatedProduct});
            } else {
                response.status(404).send({error: "Product not found"});
            }
        } catch (error) {
            response.status(500).send({error: error.message});
        }
    });

    router.delete("/api/products/:id", async (request, response, next) => {
        try {
            const deletedProduct = await Product.findByIdAndRemove(request.params.id);

            if (deletedProduct) {
                response.status(200).send({message: "Product deleted", product: deletedProduct});
            } else {
                response.status(404).send({error: "Product not found"});
            }
        } catch (error) {
            response.status(500).send({error: error.message});
        }
    });
};

export default dataEndpoint;
