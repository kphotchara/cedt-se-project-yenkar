const express = require("express");
const {
  getCarProviders,
  getCarProvider,
  createCarProvider,
  updateCarProvider,
  deleteCarProvider,
  getNearByCarProviders,
  getCarsForCarProvider
} = require("../controllers/carProviders");

const rentingsRouter = require("./rentings");
const carsRouter = require("./cars")

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getCarProviders)
  .post(protect, authorize("admin"), createCarProvider);

router.use("/:carProviderId/rentings", rentingsRouter);
router.use("/:carProviderId/cars", carsRouter);

router.route("/nearby").get(protect, getNearByCarProviders);

router
  .route("/:id/cars")
  .get(getCarsForCarProvider)

router
  .route("/:id")
  .get(getCarProvider)
  .put(protect, authorize("admin"), updateCarProvider)
  .delete(protect, authorize("admin"), deleteCarProvider);

module.exports = router;
