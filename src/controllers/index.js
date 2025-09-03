const {
  createClient,
  getClient,
  sessionState,
} = require("../helpers/index.js");

exports.createClient = async (req, res) => {
  try {
    const client = createClient();
    const st = sessionState.status;

    if (st === "ready" || st === "authenticated") {
      return res.json({ ok: true, status: st });
    }

    if (st === "initializing" || st === "disconnected" || st === "failed") {
      client.initialize().catch((err) => {
        sessionState.status = "failed";
        sessionState.error = String(err);
      });
    }

    const payload = { ok: true, status: sessionState.status };
    if (sessionState.qr) payload.qr = sessionState.qr;
    res.json(payload);
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};

exports.sessionStatus = (req, res) => {
  res.json({ ok: true, ...sessionState });
};

exports.getChatId = async (req, res) => {
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

exports.sendMessage = async (req, res) => {
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

exports.deleteClient = async (req, res) => {
  try {
    if (client) {
      try {
        await client.logout();
      } catch {}
      try {
        await client.destroy();
      } catch {}
      client = null;
    }
    if (fs.existsSync(SESSION_DIR)) {
      fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    }
    sessionState = { status: "idle" };
    res.json({ ok: true, deleted: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};
