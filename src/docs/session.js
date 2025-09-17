/**
 * @swagger
 * /api/session/start:
 *   post:
 *     summary: Start WhatsApp session
 *     description: start iniates a WhatsApp Web session and returns a QR code for authentication.
 *     tags:
 *       - Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session started or already authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 qr:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error
 *
 * /api/session/status:
 *   get:
 *     summary: Get WhatsApp session status
 *     description: get the current status of the WhatsApp Web session.
 *     tags:
 *       - Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current session status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error
 *
 * /api/session/delete:
 *   post:
 *     summary: Delete WhatsApp session
 *     description: deletes the WhatsApp Web session and authentication data.
 *     tags:
 *       - Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 deleted:
 *                   type: boolean
 *       500:
 *         description: Server error
 */