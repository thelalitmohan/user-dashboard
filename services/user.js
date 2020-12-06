import User from "../collections/user";
import Message from "../utilities/messages";
import {
  encryptpassword,
  generateToken,
  generateRandom
} from "../utilities/universal";
import { LIMIT } from "../utilities/constants";
// import * as Mail from "../utilities/mail";

/********** Save users **********/
export const save = async payload => {
  if (await User.checkEmail(payload.email))
    throw new Error(Message.emailAlreadyExists);
  const password = payload.password;
  payload.password = encryptpassword(password);
  payload.uid = generateRandom(6, false);
  const userData = await User.saveUser({
    ...payload
  });
  return userData;
};

/********** Login users **********/
export const onLogin = async payload => {
  const userData = await User.findOneByCondition({
    email: payload.email,
    password: encryptpassword(payload.password)
  });
  if (!userData) throw new Error(Message.invalidCredentials);
  if (userData.status === 0) throw new Error(Message.accountDeleted);
  if (userData.status === 2) throw new Error(Message.userBlocked);

  let loginToken = generateToken({
    when: new Date(),
    role: userData.role,
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken);
  return {
    _id: data._id,
    email: data.email,
    loginToken: data.loginToken[data.loginToken.length - 1].token,
    lastLogin: data.lastLogin
  };
};

/********** Logout users **********/
export const logoutUser = async payload => {
  return await User.logout(payload.userId, payload.token);
};
