const experience_model = require("../modal/experience_model.model");
const user_model = require("../modal/user.modal");

const add_experience = async (req, res) => {
  try {
    const file_name = req.file.filename;
    const { email } = req.user ?? { email: "hgsarun@gmail.com" };
    const file_path = `upload/${file_name}`;
    const { title, sub_title, description, start_date, end_date } = req.body;
    const create_exp = new experience_model({
      experience_image: file_path,
      title: title,
      sub_title: sub_title,
      description: description,
      start_date: start_date,
      end_date: end_date,
    });
    const saved_experience = await create_exp.save();
    if (!saved_experience)
      res
        .status(401)
        .json({ status: false, message: "user Experience not saved." });
    let login_user = await user_model.findOne({ email: email });
    if (login_user) {
      login_user.experience.push(saved_experience._id);
      await login_user.save();
      res.status(201).json({ status: true, message: "saved data." });
    } else {
      res.status(401).json({ status: false, message: "not saved data." });
    }
  } catch (error) {
    console.log("experience : ", error.message);
    res.status(500).json({ status: false, message: "Server error." });
  }
};

const edit_experience = async (req, res) => {
  try {
    const { id } = req.params;
    const file_name = req.file.filename;
    const { title, sub_title, description, start_date, end_date } = req.body;
    const file_path = `upload/${file_name}`;
    const update_exp = await experience_model.findByIdAndUpdate(id, {
      experience_image: file_path,
      title: title,
      sub_title: sub_title,
      description: description,
      start_date: start_date,
      end_date: end_date,
    },{new:true});

    if (!update_exp)
     return res
        .status(401)
        .json({ status: false, message: "user Experience not saved." });
    else {
      res.status(201).json({ status: false, message: "not saved data." });
    }
  } catch (error) {
    console.log("experience : ", error.message);
    res.satatus(500).json({ status: false, message: "Server error." });
  }
};

const delete_exp = async (req, res) => {
  try {
    const { id } = req.params;
    const update_exp = await experience_model.findByIdAndDelete(id);
    if (!update_exp)
      res
        .status(401)
        .json({ status: false, message: "user Experience not saved." });
    else {
      res.status(401).json({ status: false, message: "not saved data." });
    }
  } catch (error) {
    console.log("experience : ", error.message);
    res.satatus(500).json({ status: false, message: "Server error." });
  }
};



module.exports = { add_experience ,edit_experience,delete_exp};
