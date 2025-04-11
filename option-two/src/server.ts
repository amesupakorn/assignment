import express from "express";
import userRoutes from "./routes/route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const PORT = 3000;
export const app = express();

app.use("/users", userRoutes);

app.use("/api-docs", swaggerUi.serve as any);
app.get("/api-docs", swaggerUi.setup(swaggerSpec) as any);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});