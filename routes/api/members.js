const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

// GETs all members
router.get("/", (req, res) => {
  // We want to return the members as a JSON object
  res.json(members);
});

// GET a single member. :id is a URL parameter
router.get("/:id", (req, res) => {
  // Does the requested id exist in our members list?
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    // filter the members array
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    // Return a 400 bad request
    res.status(400).json({ message: `No member with the id ${req.params.id}` });
  }
});

// Create a member (We want to make a POST request)
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  // Quick check
  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ message: "Please include a name and an email" });
  }

  members.push(newMember);
  res.json(members);
});

// Update member
router.put("/:id", (req, res) => {
  // Does the requested id exist in our members list?
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member: member });
      }
    });
  } else {
    // Return a 400 bad request
    res.status(400).json({ message: `No member with the id ${req.params.id}` });
  }
});

// DELETE a member
router.delete("/:id", (req, res) => {
  // Does the requested id exist in our members list?
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    // filter out all members that are NOT the one requested to be deleted
    res.json({
      message: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    // Return a 400 bad request
    res.status(400).json({ message: `No member with the id ${req.params.id}` });
  }
});

module.exports = router;
