import express from 'express';

import * as services from '../services/render.js';
import * as controller from '../controller/controller.js';
const route = express.Router();

/**
 * @description Home Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

/**
 * @description my notepad
 * @method GET /my-notepad
 */
route.get('/my-notepad', services.mynotepad);

// API-routes
route.get('/api/users/', controller.find);

// Add a new route for filtered pagination
route.get('/api/users/filter', controller.filterAndPaginate);
route.post('/api/notepad/add/:id', controller.addToNotepad);
route.get('/api/notepad', controller.findNotepadEntries);
route.delete('/api/notepad/remove/:id', controller.removeFromNotepad);
route.put('/api/notepad/toggle-priority/:id', controller.togglePriority);

export default route;
