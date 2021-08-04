import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addUser,
  getusers,
  getOneUser,
  updateUser,
  deleteuser,
} from "../controllers/user.controllers.ts";

const router = new Router();

router
  .get("/api/user", getusers) 
  .get("/api/user/:id", getOneUser) 
  .post("/api/user", addUser) 
  .put("/api/user/:id", updateUser) 
  .delete("/api/user/:id", deleteuser)
export default router;