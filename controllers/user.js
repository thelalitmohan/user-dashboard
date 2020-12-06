import { successAction, failAction } from "../utilities/response";
import {
  save,
  onLogin,
  logoutUser,
  usersList,
  updateUserInfo
} from "../services/user";
import Message from "../utilities/messages";
import { ROLE } from "../utilities/constants";

/**************** Add New User ***********/
export const addUser = async (req, res, next) => {
  const payload = req.body;
  try {
    await save(payload);
    res.status(200).json(successAction(null, Message.userAdded));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** User Login ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** User Logout ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** User Information Update ***********/
export const updateUser = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await updateUserInfo(payload);
    res.status(200).json(successAction(data, Message.userUpdate));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};
