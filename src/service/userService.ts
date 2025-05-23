import axios from "axios";
import { type User } from "../types/userTypes";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await axios.get<{ users: User[] }>("https://dummyjson.com/users");
  return data.users;
}
