


# Setup Instructions
```bash
git clone https://github.com/amesupakorn/assignment.git

```

## Option 1: Auto Delete Todo List

Web Link : [https://option-one-iota.vercel.app](https://option-one-iota.vercel.app)

### ⚙️ Installation & Setup

```bash
cd option-one
pnpm install
pnpm run dev
```

### 💻  Run Server

```bash
http://localhost:3000
```

## Option 2: Create Data from API

### ⚙️ Installation & Setup

```bash
cd option-two
pnpm install
pnpm dev
```

### 💻  Run Server

เรียก GET Transformed ผ่าน Postman, Http
```bash
http://localhost:3000/users/summary
```
เรียก GET Transformed ผ่าน Swagger UI

```bash
http://localhost:3000/api-docs/
```

### 🧪 Run Unit Test

(ต้อง run server ไปด้วยเพราะมี Test GET API)

เรียก Test ผ่าน Terminal 
```bash
cd option-two
pnpm test
```
เรียก Test ผ่าน Vitest UI
```bash
cd option-two
pnpm test:ui
```
