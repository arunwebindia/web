const { encrypt_password, verifyPassword } = require("../helper/helpers");
const { get_token } = require("../middleware/middleware");
const user_model = require("../modal/user.modal");
const address_model = require("../modal/user_address.modal");

// create new user controller ========================
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, isAdmin, address } = req.body;
    let find_email = await user_model.findOne({ email: email });
    if (Boolean(find_email)) {
      return res
        .status(209)
        .json({ status: false, message: "Email is already exists." });
    } else {
      const addres = new address_model(address);
      const address_result = await addres.save();
      const create_user = new user_model({
        name: name,
        email: email,
        phone: phone,
        hash_password: await encrypt_password(password),
        isAdmin: isAdmin,
        address: address_result?._id ?? null,
      });
      const saved_user = await create_user.save();
      res.status(201).json({
        status: true,
        message: "user Create successfully.",
        data: saved_user,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// create new user controller end========================

// get user controller start ===================
const get_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user_exist = await user_model.findOne({ email: email }).populate("address");
    const password_match = await verifyPassword(password, user_exist.hash_password);
    if (!user_exist || !password_match) {
      return res.status(201).json({
        status: false,
        message: "Your username or password is incorrect.",
      });
    } else {
    let token = get_token(user_exist);
      res.status(201).json({ status: true, message: "User found.", data: user_exist,token:token,expireIn:'1d' });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// get user controller end ===================

// get all user controller start ===================
const get_all_user = async (req, res) => {
  try {
    const user_exist = await user_model.find().populate("address");
    if (!user_exist || user_exist.length === 0) {
      return res.status(404).json({ status: true, message: "User not found." });
    } else {
      res
        .status(200)
        .json({ status: true, message: "User found.", data: user_exist });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// get all user controller end ===================

// get single user controller start ==============
const get_user_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const user_exist = await user_model
      .findById({ _id: id })
      .populate("address");
    if (!user_exist || user_exist.length === 0) {
      return res.status(404).json({ status: true, message: "User not found." });
    } else {
      res
        .status(200)
        .json({ status: true, message: "User found.", data: user_exist });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// get single user controller end ===================

// update single user controller start ==============
const update_user_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, hash_password, isAdmin, address } = req.body;
    const address_exist = await user_model.findByIdAndUpdate(address?._id, {
      address,
    });
    const user_exist = await user_model
      .findByIdAndUpdate(id, { name, email, phone, hash_password, isAdmin })
      .populate("address");
    if (!user_exist || user_exist.length === 0) {
      return res.status(404).json({ status: true, message: "User not found." });
    } else if (!address_exist) {
      return res
        .status(404)
        .json({ status: true, message: "Address did not update" });
    } else {
      res
        .status(200)
        .json({ status: true, message: "User found.", data: user_exist });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// update single user controller end ===================

// delete single user controller start ==============
const delete_user_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    const user_exist = await user_model.findByIdAndDelete(id);
    // if(!user_exist || user_exist.length === 0){
    //     return res.status(404).json({status:true,message:"User not found."})
    // }
    // else{
    //     res.status(200).json({status:true,message:'User found.',data:user_exist});
    // }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, error: "Internal server error." });
  }
};
// delete single user controller end ===================

const forgot_password = async (req,res)=>{
    return res.status(201).json({status:true,message:"Please contact your super admin."})
}

module.exports = {
  createUser,
  get_user,
  get_all_user,
  get_user_by_id,
  update_user_by_id,
  delete_user_by_id,
  forgot_password
};
