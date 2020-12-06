import express from "express";
import Joi from "@hapi/joi";
import { createValidator } from "express-joi-validation";

import { addUser } from "../../controllers/user";
import { ROLE } from "../../utilities/constants";
import { checkToken } from "../../utilities/universal";

const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *   tags: ["user"]
 *   summary: user add api
 *   description: api used to add users
 *   security:
 *    - OAuth2: [admin]   # Use Authorization
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *         type: object
 *         required:
 *          - user add
 *         properties:
 *           first_name:
 *             type: string
 *             required:
 *           last_name:
 *             type: string
 *             required:
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *           role:
 *             type: integer
 *             default: 1
 *             required:
 *   responses:
 *    '200':
 *    description: success
 */

const userSchema = Joi.object({
  first_name: Joi.string()
    .required()
    .label("First name"),
  last_name: Joi.string()
    .optional()
    .allow("")
    .label("Last name"),
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password"),
  role: Joi.number()
    .valid(ROLE.CUSTOMER, ROLE.MERCHANT, ROLE.ADMIN)
    .required()
    .label("Role")
});

app.post(
  "/user",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  addUser
);

export default app;
