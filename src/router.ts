import Router from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { Request, Response } from "express";
import { handleInputErrors } from "./modules/middleware";
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

// TODO: product API

router.get("/product", (req, res) => {});
router.get("/product/:id", (req, res) => {});
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.delete(
  "/product/:id",
  body("id"),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

// TODO: update API

router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  oneOf([
    check("status").equals("IN_PROGRESS"),
    check("status").equals("SHIPPED"),
    check("status").equals("DEPRECATED"),
  ]),
  body("version").optional(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.delete(
  "/update/:id",
  body("id"),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

// TODO: updatepoint API

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updatedId").exists().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

// TODO:  18:17-დან უნდა გავაგრძელო და კიდევ გავდახედო ერრორის თემას და გავაანალიზო

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

router.delete(
  "/updatepoint/:id",
  body("id"),
  handleInputErrors,
  (req: Request, res: Response) => {}
);

export default router;
