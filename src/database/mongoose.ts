import mongoose from 'mongoose';

export const connectionFactory = () => mongoose.connect('mongodb://127.0.0.1:27017/book-api-two', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});