import Router from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("access to the product");
});

// router.get("/api/product", (req, res) => {
//   res.send("Hello product!");
// });


router.put("/", (req, res) => {
  res.send("Hello tashaglar!");
});

router.get("/users/:id", (req, res) => {});

router.delete("/users/:id", (req, res) => {});

router.post("/users", (req, res) => {
  console.log(req.body);
});

export default router;
