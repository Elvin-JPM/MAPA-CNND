const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { initOracleDb } = require("./db");

const app = express();
const PORT =
  process.env.NODE_ENV === "development"
    ? process.env.PORT_DEV
    : process.env.PORT_PROD || 3000;

// Middleware
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS (simple version, allow all)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigin =
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_URL_PROD
          : process.env.FRONTEND_URL_DEV;
      const isAllowed = origin
        .toLowerCase()
        .startsWith(allowedOrigin.toLowerCase());
      callback(null, isAllowed);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// app.options("*", cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Import and load routes
const routes = ["getMapDataRoute"];

routes.forEach((routeName) => {
  try {
    const routeModule = require(`./routes/${routeName}`);
    app.use("/api", routeModule);
    console.log(`Loaded route: /api/${routeName}`);
  } catch (err) {
    console.error(`Error loading route ${routeName}:`, err);
  }
});

// Start server
(async () => {
  try {
    await initOracleDb();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();
