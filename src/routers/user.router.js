const express = require("express");
const {
  createUser,
  get_user,
  get_all_user,
  get_user_by_id,
  update_user_by_id,
  delete_user_by_id,
  forgot_password,
} = require("../controller/user.controller");
const { verify_token } = require("../middleware/middleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", get_user);
router.get("/all-user",verify_token, get_all_user);
router.get("/all-user-by-id/:id",verify_token, get_user_by_id);
router.patch("/update-user-by-id/:id", verify_token,update_user_by_id);
router.delete("/delete-user/",verify_token, delete_user_by_id);
router.post("/forgot-password", forgot_password);

module.exports = router;
