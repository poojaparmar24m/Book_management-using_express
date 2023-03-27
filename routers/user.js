const express = require("express");
const { users } = require("../data/user.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get All Users Data !!",
    data: users,
  });
});

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const userData = users.find((each) => each.id === id);

  if (userData) {
    return res.status(404).json({
      success: false,
      message: "User exits With This Id",
    });
  }
  const Newdata = {
    Id: id,
    Name: name,
    Surname: surname,
    Email: email,
    SubscriptionType: subscriptionType,
    SubscriptionDate: subscriptionDate,
  };
  users.push(Newdata);

  return res.status(201).json({
    success: true,
    message: "created New User !!",
    data: users,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const userData = users.find((each) => each.id === id);
  if (userData) {
    return res.status(200).json({
      success: true,
      message: "User found With Their Id",
      data: userData,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "User Not Matched !! ",
    });
  }
});

router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  const userData = users.find((each) => each.id === id);
  console.log("userdata", userData);
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User Not matched !!",
    });
  }
  const index = users.indexOf(userData);
  console.log("index", index);
  let data = users.splice(index, 1);
  console.log("data", data);

  return res.status(200).json({
    success: true,
    message: "Delete User with Their Id",
    data: data,
  });
});

router.put("/edituser/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const userData = users.find((each) => each.id === id);
  // console.log("userdata", userData);
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User Not matched !!",
    });
  }

  // console.log("data", data);
  let upadateData = users.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  // console.log("upadate", upadateData);
  return res.status(200).json({
    success: true,
    message: "modify User With their Id",
    data: upadateData,
  });
});
module.exports = router;
