import Address from "../../models/addressModel.js";
import { errorHandler } from "../../utils/error.js";

export const addAddress = async (req, res, next) => {
  try {
    const { userId, address, landmark, city, pincode, phoneno } = req.body;
    if (!userId || !address || !landmark || !city || !pincode || !phoneno) {
      return next(errorHandler(400, "incomplete address"));
    }
    const newAddress = new Address({
      userId,
      address,
      landmark,
      city,
      pincode,
      phoneno,
    });
    await newAddress.save();
    res.status(200).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUserAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(errorHandler(400, "No userId found"));
    const address = await Address.find({ userId });
    if (!address) return next(errorHandler(400, "no addresses found"));
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    next(error);
  }
};
export const editAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId){
      return next(errorHandler(400, "incomplete request"));
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    if (!address) return next(errorHandler(400, "address not found"));
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId){
        return next(errorHandler(400, "incomplete request"));
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) return next(errorHandler(400, "address not found"));
    res.status(200).json({
      success: true,
      message : 'address deleted succesfully'
    });
  } catch (error) {
    next(error);
  }
};
