export interface Database_Users {
  document: string;
  country: string;
  store: string;
  users: Login_Response_Users;
  status: Login_Status;
  security_questions: Login_security_questions;
  sessions: Login_Sessions;
}

export interface Login_Response_Users {
  user_id: number;
  stores:string[];
  password: string[];
  creation_ts: string;
  active: number;
  system_pass: number;
  expirate: number;
  user_name: string;
  role_id: number;
  role_name: string;
  status_id: number;
  last_access_ts: string;
  lockable: number;
  retries: number;
  retries_timestamp: string;
  first_name: string;
  last_name: string;
  language_id: number;
}
export interface Login_Response_Data {
  firstName: string;
  initialPass: boolean;
  lastAccessTs: string;
  lastName: string;
  loginRetries: number;
  nickName: string;
  passwordExpiredDate: number; 
  passwordWhitening: boolean;
  role: Login_Role | Object;
  savedQuestions: boolean;
  token: string;
  userId: number;
  userName: string;
}

export interface Login_Status {
  id: number;
  name: string;
}

export interface Login_security_questions {
  user_id: number;
  user_question: string;
  answer: string;
  system_question_key: string;
}

export interface Login_Sessions {
  user_id: string;
  token: string;
  expiration: string;
}

export interface Login_Role {
  roleId: number;
  roleName: string;
  views: Login_Views[];
}
export interface Login_Views {
  children: any[];
  mobile: number;
  name: string;
  order: number;
  parentId: number;
  viewId: number;
  visibleTo: string;
}
export interface exceptionsErrorMsg {
  message: string;
  value: number;
}

export interface LoginResponseError {
  code: number;
  exceptions: exceptionsErrorMsg;
  message: string;
  status: string;
}
