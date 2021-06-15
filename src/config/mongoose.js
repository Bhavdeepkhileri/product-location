const mongoose=require('mongoose');

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});



exports.connect = (envConfig, env) => {
    // print mongoose logs in dev env
    if (env === 'development') {
        mongoose.set('debug', true);
    }
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    });
    return mongoose.connection;
};
