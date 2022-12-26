const Router = require('express');
const router = new Router();
const authRouter = require('./AuthRouter');
const itemRouter = require('./ItemRouter');

router.use('/auth', authRouter);
router.use('/items', itemRouter);

module.exports = router;
