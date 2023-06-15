const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://user:user@db.dtepltb.mongodb.net/?retryWrites=true&w=majority',
    JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
