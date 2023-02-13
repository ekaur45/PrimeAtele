const { CheckAuth } = require("../middlewares/jwr.middleware");
const controller = require("../controllers/admin.controller");
const router = require("express").Router();
router.post("/all-customers",CheckAuth(),controller.allCustomer);
router.get("/export-customers",CheckAuth(),controller.exportCustomers);
router.post("/create-customer",CheckAuth(),controller.createCustomer);
router.post("/edit-customer",CheckAuth(),controller.editCustomer);
router.get("/get-customer",CheckAuth(),controller.getCustomer);
router.get("/get-pickups",CheckAuth(),controller.getPickup);
router.get("/create-pickup",CheckAuth(),controller.createPickup);
router.post("/edit-pickup",CheckAuth(),controller.updatePickup);
router.post("/export",controller.exportCustomers);
module.exports = router;