import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage); // khong co dau (), vi lay duoc nhung gi cua cha co nhu req, res
  router.get("/detail/user/:id", homeController.getDetailPage); //
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);
  router.get("/upload", homeController.getUploadFilePage);

  router.get("/about", (req, res) => {
    res.send("Quy doi English 6.5 ");
  });

  return app.use("/", router);
};

export default initWebRoute;
