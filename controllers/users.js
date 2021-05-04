const {User} = require("../models/index");


const infoUser = async (req, res) => {

     try {
        const user = await User.findOne({
            attributes: ["firstName", "lastName", "email"],
            where: {
                id: req.params.id,
            },
        });

        if (!user) {
            res.status(404).json({ err: "User not found" });
        } else {
            res.status(202).json(user);
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }

};

module.exports = infoUser;
