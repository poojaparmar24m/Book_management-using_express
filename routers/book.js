const express = require("express");
const { books } = require("../data/book.json");
const { users } = require("../data/user.json");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    Success: true,
    Message: "Get All Books Data !!",
    data: books,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const bookData = books.find((data) => data.id === id);

  if (!bookData) {
    return res.status(404).json({
      Success: false,
      Message: "book Not Present In Data !!",
    });
  }

  return res.status(200).json({
    Success: true,
    Message: "Book Found With Their Id",
    data: bookData,
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
  const bookData = books.find((each) => each.id === data.id);
  if (bookData) {
    return res.status(302).json({
      Success: false,
      Message: "Book Data Exits With Id !!",
    });
  }

  books.push(data);
  return res.status(201).json({
    Success: true,
    Message: "Create a New book",
    data: books,
  });
});

router.put("/editBook/:id", (req, res) => {
  const { data } = req.body;
  const { id } = req.params;

  const bookData = books.find((each) => each.id === id);
  if (!bookData) {
    return res.status(404).json({
      Success: false,
      Message: "Book Not Found !!",
    });
  }

  const updateBook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({
    Success: true,
    Message: "Updated Book Data Successfully !!",
    data: updateBook,
  });
});

router.get("/issued/by_user", (req, res) => {
  const IssuedBookByUser = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  // console.log("ieseed books", IssuedBookByUser);
  const issuedbookDetails = [];
  IssuedBookByUser.forEach((each) => {
    const book = books.find((value) => value.id === each.issuedBook);

    (book.issuedBy = each.name),
      (book.issuedDate = each.issuedDate),
      (book.returnDate = each.returnDate);

    issuedbookDetails.push(book);

    // console.log("book data", book);
  });

  if (issuedbookDetails.length === 0) {
    return res.status(404).json({
      Success: false,
      Message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    Success: true,
    Message: "Books Issued By Users",
    data: issuedbookDetails,
  });
});
module.exports = router;
