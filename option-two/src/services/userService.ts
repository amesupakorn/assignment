import axios from "axios";
import { User } from "../types/user";

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get("https://dummyjson.com/users");
  return response.data.users as User[];
}