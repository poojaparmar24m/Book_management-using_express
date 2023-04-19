const express = require("express");
const { users } = require("../data/user.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get All Users Data !!",
    data: users,
  });
});

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      Success: false,
      Message: "No Data To Add a Book",
    });
  }
  const userData = users.find((each) => each.id === data.id);

  if (userData) {
    return res.status(404).json({
      success: false,
      message: "User exits With This Id",
    });
  }

  // const Alluser = { ...users, data };
  users.push(data);
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

router.get("/subscription_details/:id", (req, res) => {
  const { id } = req.params;
  const userData = users.find((each) => each.id === id);

  if (!userData) {
    return res.status(404).json({
      success: false,
      Message: "User Not Exits With Id ",
    });
  }
  const getDays = (data = null) => {
    const date = data ? new Date(data) : new Date();
    return Math.floor(date / (1000 * 60 * 60 * 24));
  };

  const subscriptionType = (date) => {
    if (userData.subscriptionType === "Basic") {
      date = date + 90;
    } else if (userData.subscriptionType === "Standard") {
      date = date + 180;
    } else if (userData.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDays(userData.returnDate);
  let currentDate = getDays();
  let subscriptionDate = getDays(userData.subscriptionDate);
  let subscriptionexpiraion = subscriptionType(subscriptionDate);

  console.log("return date", returnDate);
  console.log("current date", currentDate);
  console.log("subscription date", subscriptionDate);
  console.log("subscription expire", subscriptionexpiraion);

  const data = {
    ...userData,
    subscriptionExpired: subscriptionexpiraion < currentDate,
    dayLeftforExpiration:
      subscriptionexpiraion <= currentDate
        ? 0
        : subscriptionexpiraion - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionexpiraion <= currentDate
          ? 100
          : 50
        : 0,
  };

  return res.status(200).json({
    success: true,
    Message: "subscription detail for user is...",
    data,
  });
});
module.exports = router;
