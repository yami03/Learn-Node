const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
// router.get('/', storeController.myMiddleware, storeController.homePage);
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStroe);
router.post('/add', catchErrors(storeController.createStroe));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

module.exports = router;
