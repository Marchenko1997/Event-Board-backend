const express = require('express');
const router = express.Router();

const participantsCtrl = require('../controllers/participants');
const eventsCtrl = require('../controllers/events');

const { validateBody, isValidId } = require('../middleware');
const { schemas } = require('../models/participant');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the event
 *         title:
 *           type: string
 *           description: The title of the event
 *         organizer:
 *           type: string
 *           description: The organizer of the event
 *         eventDate:
 *           type: string
 *           description: The date of the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         imageUrl:
 *           type: string
 *           description: The image url of the event
 *       example:
 *          _id: 66477cfe31c9d7990db23fb8
 *          title: Retro Fetish Burlesque Show
 *          organizer: Worek Kości
 *          eventDate: today 21:00
 *          description: A delicately fetish show, in an elegant retro style. The stage will feature stunning gowns, boas, fans and...
 *          imageUrl: https://goout.net/i/096/961086-800.jpg
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: user's email
 *         birthDate:
 *           type: string
 *           description: User's birth date
 *         eventTitle:
 *           type: string
 *           description: The title of the event
 *         eventImg:
 *           type: string
 *           description: The image of the event
 *         answer:
 *           type: string
 *           description: The answer on the question
 *       example:
 *           name: Tim,
 *           email: asdadsad@mail.com,
 *           birthDate: 1980-02-02,
 *           answer: Friends,
 *           eventTitle: Retro Fetish Burlesque Show,
 *           eventImg: https://goout.net/i/096/961086-800.jpg

 *     PaginatedEventsResponse:
 *       type: object
 *       properties:
 *         totalRecords:
 *           type: integer
 *           description: 'Total number of records available'
 *         currentPage:
 *           type: integer
 *           description: 'Current page number'
 *         totalPages:
 *           type: integer
 *           description: 'Total number of pages available'
 *         events:
 *           type: array
 *           description: 'The list of events'
 *           items:
 *             $ref: '#/components/schemas/Event'

 *     ParticipantsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: 'The auto-generated id of the event'
 *         eventId:
 *           type: string
 *           description: 'Event id'
 *         createdAt:
 *           type: string
 *           description: 'The date and time when the participant registered for event'
 *         user:
 *           type: object
 *           description: User's data
 *           items:
 *             $ref: '#/components/schemas/User'
 *
 *     ParticipantEvents:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           description: 'Event id'
 *         createdAt:
 *           type: string
 *           description: 'The date and time when the participant registered for event'
 *         user:
 *           type: object
 *           description: User's data
 *           items:
 *             $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * tags:
 *   - name: Events
 *     description: API for events
 *   - name: Participants
 *     description: API for participants
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Returns the paginated list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaginatedEventsResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Server error"
 */
router.get('/events', eventsCtrl.getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *     responses:
 *       200:
 *         description: The event data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Server error"
 */
router.get('/events/:id', eventsCtrl.getEventById);

/**
 * @swagger
 * /events/{id}/participants:
 *   get:
 *     summary: Returns the list of all participants that registered for this events
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParticipantsResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Server error"
 */
router.get(
  '/events/:id/participants',
  isValidId,
  participantsCtrl.getAllParticipantsByEventId,
);

/**
 * @swagger
 * /participant/{email}:
 *   get:
 *     summary: The participant data by email
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The auth user's email
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParticipantEvents'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Server error"
 */
router.get('/participant/:email', participantsCtrl.getParticipantByEmail);

/**
 * @swagger
 * /events/{id}/register/participant:
 *   post:
 *     summary: Register a participant for the event
 *     tags: [Participants]
 *     requestBody:
 *       description: Participant object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               birthDate:
 *                 type: date
 *               answer:
 *                 type: string
 *               eventTitle:
 *                 type: string
 *                 description: The title of the event
 *               eventImg:
 *                 type: string
 *                 description: The image of the event
 *             example:
 *                name: Tim,
 *                email: asdadsad@mail.com,
 *                birthDate: 1980-02-02,
 *                answer: Friends,
 *                eventTitle: Retro Fetish Burlesque Show,
 *                eventImg: https://goout.net/i/096/961086-800.jpg
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *            example:
 *             error:
 *              message: "Server error"
 */
router.post(
  '/events/:id/register/participant',
  validateBody(schemas.registerSchema),
  participantsCtrl.registerParticipantToEvent,
);

module.exports = router;
