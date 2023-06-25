import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'
const tuitsModel = mongoose.model('tuitsModel', tuitsSchema);
export default tuitsModel;