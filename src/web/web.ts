import express from "express";
import path from "path";
import expressSession from "express-session";


const app = express();

app.use("/assets", express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve);
  });
};
