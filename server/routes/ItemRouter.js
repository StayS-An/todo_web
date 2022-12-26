const Router = require('express');
const router = new Router();
const ItemController = require('../controllers/item/ItemController');
const VerifyJWTToken = require('../middleware/VerifyJWTToken');

router.get(
    '/',
    VerifyJWTToken(process.env.SECRET_KEY),
    ItemController.list
)

router.post(
    '/',
    VerifyJWTToken(process.env.SECRET_KEY),
    ItemController.create
)

router.put(
    '/:id',
    VerifyJWTToken(process.env.SECRET_KEY),
    ItemController.update
)

router.delete(
    '/:id',
    VerifyJWTToken(process.env.SECRET_KEY),
    ItemController.remove
)

module.exports = router;