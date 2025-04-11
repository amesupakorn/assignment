
import { getUserSummary, cache } from "../controllers/index";
import { summarySchema } from "../schemas/schema";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as userService from "../services/userService";
import * as transformer from "../utils/transformer";
import request from "supertest";
import { app } from "../server";

vi.mock("../services/userService");
vi.mock("../utils/transformer");

const mockSummary = {
    Engineering: {
      male: 2,
      female: 1,
      ageRange: "25-40",
      hair: {
        Black: 1,
        Brown: 1,
      },
      addressUser: {
        JohnDoe: "12345",
      },
    },
  };


describe("Test - getUserSummary", () => {
    let req: any, res: any;

    beforeEach(() => {
      req = {};
      res = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
      };
      cache.flushAll();
    });

  it("should return cached data", async () => {
    const cachedData = {
      Engineering: { male: 1 },
    };

    cache.set("user_summary", cachedData);

    await getUserSummary(req, res);

    expect(res.json).toHaveBeenCalledWith({
      data: cachedData,
      cached: true,
    });
  });
  
  it("should match summary schema", async () => {
    cache.set("user_summary", mockSummary);

    await getUserSummary(req, res);

    const result = res.json.mock.calls[0][0].data;

    const parsed = summarySchema.safeParse(result);
    expect(parsed.success).toBe(true);
  });
  
  it("should fetch users and return transformed summary", async () => {
    const mockUsers = [{ id: 1, name: "John" }];
    const mockSummary = {
      Engineering: {
        male: 1,
        female: 0,
        ageRange: "25-40",
        hair: { Black: 1 },
        addressUser: { John: "12345" },
      },
    };

    (userService.fetchUsers as any).mockResolvedValue(mockUsers);
    (transformer.transformUsers as any).mockReturnValue(mockSummary);

    await getUserSummary(req, res);

    expect(userService.fetchUsers).toHaveBeenCalled();
    expect(transformer.transformUsers).toHaveBeenCalledWith(mockUsers);
    expect(res.json).toHaveBeenCalledWith({
      data: mockSummary,
      cached: false,
    });
  });

  describe("GET /users/summary", () => {
    it("should return summary", async () => {
      const res = await request(app).get("/users/summary");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
    });
  });
});