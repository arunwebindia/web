const contact_model = require("../modal/contact.model");
const user_model = require("../modal/user.modal");

const create_contact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const new_contact = new contact_model({
      name,
      email,
      phone,
      subject,
      message,
    });
    const data = await new_contact.save();
    const username = await user_model.findOne({
      email: req?.user?.email ?? "hgsarun@gmail.com",
    });
    if (!data && !username) {
      return res
        .status(401)
        .json({ status: true, message: "Contact us not created." });
    } else {
      username.contact.push(data._id);
      await username.save();
      res
        .status(201)
        .json({ status: true, message: "Thank you for contact me" });
    }
  } catch (error) {
    console.log(error.message, "contact us model..");
    res.status(500).json({ status: false, message: "Getting server issue." });
  }
};

const get_contact = async (req, res) => {
  try {
    const all_contact = await contact_model.find();
    if (!all_contact)
      res
        .status(401)
        .json({ status: true, message: "No found any  contact information" });
    res.status(201).json({ status: true, data: all_contact });
  } catch (error) {
    console.log("get all contact :", error.message);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

const get_contact_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const all_contact = await contact_model.find({ _id: id });
    if (!all_contact)
      res
        .status(401)
        .json({ status: true, message: "No found any  contact information" });
    res.status(201).json({ status: true, data: all_contact });
  } catch (error) {
    console.log("get all contact :", error.message);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

const delete_contact = async (req, res) => {
  try {
    let { id } = req.body;
    let contact_info = await contact_model.findByIdAndDelete({ _id: id });
    if (!contact_info)
      res.status(401).json({ status: true, message: "User not deleted." });
    res.status(201).json({ status: true, message: "Delete successfully." });
  } catch (error) {
    console.log("delete contact error :", error.message);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

module.exports = {
  create_contact,
  get_contact,
  get_contact_by_id,
  delete_contact,
};
