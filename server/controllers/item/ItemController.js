const { Item } = require('../../models/');

class ItemController {
    async list (req, res) {
        const items = await Item.findAll({where: {user_id: req.user.id}})
        return res.json(items);
    }

    async create (req, res) {
        const item = await Item.create({
            title: req.body.title,
            user_id: req.user.id,
            status: 'open'
        });

        return res.json({item}).status(201);
    }

    async update (req, res) {
        await Item.update(
            {
                status: req.body.status
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        return res.json({}).status(200);
    }

    async remove (req, res) {
        await Item.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.json({}).status(200);
    }
}

module.exports = new ItemController();