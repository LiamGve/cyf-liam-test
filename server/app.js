import express from "express";
import morgan from "morgan";
import path from "path";

// categorising APIs
import userRoute from "./routes/user";
import starRoute from "./routes/star";
import authRoute from "./routes/auth";

import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

const staticDir = path.join(__dirname, "static");

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

// using middleware in order to routing
app.use("/api/user", userRoute);
app.use("/api/stars", starRoute)
app.use("/api/auth", authRoute)

app.use(express.static(staticDir));
app.use(pushStateRouting("/api", staticDir));

app.use(logErrors());

export default app;
