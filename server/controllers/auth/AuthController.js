const bcrypt = require('bcrypt');
const { User } = require('../../models/');
const generateJwt = require('../../helpers/generateJwt');

class AuthController {
    async login (req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne(
            {
                where: {email}
            }
        );

        if (!user) {
            return res.status(400).json();
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(403).json({});
        }

        const token = generateJwt(user.id, user.email);
        return res.json({token});
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.email);
        return res.json({token});
    }

    async register (req, res, next) {
        const {email, password} = req.body;

        const candidate = await User.findOne({ where: {email}})
        if (candidate) {
            return res.status(400).json();
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
            {
                email,
                password: hashPassword,
            }
        );

        return res.json({
            id: user.id,
            email: user.email,
        });
    }
}

module.exports = new AuthController();