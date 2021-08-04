export interface User {
    _id: { $oid: string };
    userName: string;
    email: string;
    phone: string;
  }