/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Retrieve all chats and their IDs
 *     description: Retrieve the current chats and IDs from WhatsApp.
 *     tags:
 *       - Chats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 chats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         nullable: true
 *                       isGroup:
 *                         type: boolean
 *                       isReadOnly:
 *                         type: boolean
 *       400:
 *         description: Session not started
 *       500:
 *         description: Server error
 *
 * /api/message:
 *   post:
 *     summary: Send a message to a chat
 *     description: Send a message to a specific chat ID (user or group).
 *     tags:
 *       - Chats
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *                 example: "6281234567890@c.us"
 *               message:
 *                 type: string
 *                 example: "Hello, world!"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 id:
 *                   type: string
 *                 timestamp:
 *                   type: integer
 *                 ack:
 *                   type: integer
 *       400:
 *         description: Invalid input or session not started
 *       500:
 *         description: Server error
 */