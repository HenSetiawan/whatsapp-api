import { getClient, sessionState } from "../helpers/index.js";
import fs from "fs";

async function getChatId(req, res) {
  const client = getClient();
  if (!client)
    return res.status(400).json({ ok: false, error: "session not started" });

  try {
    const chats = await client.getChats();
    const result = chats.map((c) => ({
      id: c.id._serialized,
      name: c.name || c.formattedTitle || null,
      isGroup: c.isGroup,
      isReadOnly: c.isReadOnly,
    }));

    res.json({ ok: true, chats: result });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};

async function sendMessage(req, res) {
  const { chatId, message } = req.body || {};

  if (!chatId || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "chatId and message are required" });
  }

  const client = getClient();
  if (!client)
    return res.status(400).json({ ok: false, error: "session not started" });

  const isUser = /@c\.us$/.test(chatId);
  const isGroup = /@g\.us$/.test(chatId);
  if (!isUser && !isGroup) {
    return res.status(400).json({
      ok: false,
      error: "invalid chatId format (expected *@c.us or *@g.us)",
    });
  }

  try {
    const msg = await client.sendMessage(chatId, message);
    res.json({
      ok: true,
      id: msg.id?._serialized,
      timestamp: msg.timestamp,
      ack: msg.ack,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};



export { getChatId, sendMessage };