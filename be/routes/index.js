const ConsumerController = require("../controllers/consumerController");

const router = require(`express`).Router();

router.get(`/`, (req, res) => {
  res.status(200).json({ message: `Server is running...` });
});
router.get(`/customers`, ConsumerController.getAll);
router.get(`/customers/gender`, ConsumerController.getGenderData);

module.exports = router;