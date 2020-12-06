import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { updateUser } from "../../controllers/user";
import { ROLE } from "../../utilities/constants";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

const userSchema = Joi.object({
  userId: Joi.string()
    .required()
    .label("User Id"),
  firstName: Joi.string()
    .required()
    .label("First name"),
  lastName: Joi.string()
    .optional()
    .allow("")
    .label("Last name"),
  role: Joi.number()
    .valid(ROLE.CUSTOMER, ROLE.ADMIN)
    .required()
    .label("Role")
});

app.post(
  "/user",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  updateUser
);

export default app;
