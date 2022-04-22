
import { NotFound } from "../utils/errorsClass";

const dato= {
    id:"123",
    password: "1234",
    document:"12345678",
    name: "test",
    email: "test@gmail.test",
    age: 23
};

export const getUser = ({document}) => {
  if (document && dato.document === document) {
    return dato;
  } else {
    throw new NotFound("The document or password is invalid");
  }
};
