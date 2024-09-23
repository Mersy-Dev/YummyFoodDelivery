import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};



// This file is a configuration file for our database connection. It uses mongoose to connect to our MongoDB database. We have a connectDB function that is an async function that uses the mongoose.connect method to connect to our database. We are using the process.env.MONGO_URI environment variable to connect to our database. If the connection is successful, we log a message to the console. If there is an error, we log the error message to the console and exit the process with an exit code of 1. We then export the connectDB function so that we can use it in other files.
