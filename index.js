const express = require("express");
const app = express();
app.use(express.json());

// LINE Webhook 入口
app.post("/webhook", (req, res) => {
  console.log("📩 收到 LINE Webhook:", JSON.stringify(req.body, null, 2));

  if (req.body.events && req.body.events.length > 0) {
    const event = req.body.events[0];
    if (event.source.type === "group") {
      console.log("✅ Group ID:", event.source.groupId);
    }
  }

  // 🔑 必須回 200，否則 LINE 視為失敗
  res.sendStatus(200);
});

// Render 要求指定埠號
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Webhook running on port ${PORT}`));
