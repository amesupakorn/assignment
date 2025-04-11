import { Request, Response } from "express";
import { fetchUsers } from "../services/userService";
import { transformUsers } from "../utils/transformer";
import NodeCache from "node-cache";


export const cache = new NodeCache({ stdTTL: 60 }); 


export async function getUserSummary(req: Request, res: Response) {
  const cacheKey = "user_summary";
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ data: cached, cached: true });

  try {
    const users = await fetchUsers();
    const summary = transformUsers(users);

    cache.set(cacheKey, summary);

    return res.json({
      data: summary,
      cached: false,
    });
  
  } catch (err) {
    res.status(500).json({ message: "Failed to get user summary" });
  }
}