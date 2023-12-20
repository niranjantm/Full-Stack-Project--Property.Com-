import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    name:{
        type:String,
        requiredd:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    regularprice:{
        type:Number,
        required:true
    },
    discountedprice:{
        type:Number,
        
    },
    bathrooms:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    imageUrl:{
        type:Array,
        required:true
    },
    userRef:{
        type:String,
        required:true
    },
},{timestamps:true})

const Listing = mongoose.model("Listing",listingSchema);

export default Listing;