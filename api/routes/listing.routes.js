import express from "express";
import verifyUser from "../utils/verifyUser.js";
import errorHandler from "../utils/error.js";
import Listing from "../models/listing.model.js";

const router = express.Router();

router.get("/created/:id", verifyUser, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "Unauthorised user"));
    } else {
      const data = await Listing.find({ userRef: req.params.id });
      console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/create/:id", verifyUser, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "Unauthorised user"));
    } else {
      const listing = await Listing.create(req.body);
      res.status(201).json(listing);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/delete/:listingId", verifyUser, async (req, res, next) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    return next(errorHandler(401, "Listing not present"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "Unauthorised user"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.listingId);
    res.status(200).json("Delete : OK");
  } catch (error) {
    next(error);
  }
});

router.get("/get/:listingId", async (req, res, next) => {
  console.log(req.params.listingId);
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      return next(errorHandler(400, "No listing found"));
    } else {
      res.status(200).json(listing);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/update/:listingId", verifyUser, async (req, res, next) => {
  if (req.user.id !== req.body.userRef) {
    return next(errorHandler(401, "Unauthorised user"));
  }
  try {
    const data = await Listing.findByIdAndUpdate(
      req.params.listingId,
      req.body,
      { new: true }
    );
    res.status(200).json("Update OK");
  } catch (error) {
    next(error);
  }
});

// --------------------------------------------Listing Search------------------------------------------------

router.get("/get", async (req, res, next) => {
  console.log(req.query)
  try {
    const limit = parseInt(req.query.limit) || 9;

    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === false ||offer === "false" ){
      offer = { $in: [true, false] };
    }else{
      offer=true;
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false ||furnished==="false") {
      furnished = { $in: [true, false] };
    }else{
      furnished=true;
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false || parking==="false") {
      parking = { $in: [true, false] };
    }else{
      parking=true;
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find(
      {name: { $regex:searchTerm, $options:'i' },
        offer:offer,
        furnished:furnished,
        type:type,
        parking:parking}).sort({ [sort]: order }).limit(limit).skip(startIndex)
   res.status(200).json(listings)
  } catch (error) {
    next(error);
  }
});

export default router;