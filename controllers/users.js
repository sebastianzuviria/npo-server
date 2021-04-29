const User = require("../models/user");


const infoUser = async (req, res) => {

     try {
        const user = await User.findAll({
            attributes: ["firstName", "lastName", "email"],
            where: {
                id: req.userid,
            },
        });

        if (user.length > 0) {
            res.status(202).json(user);
        } else {
            res.status(404).json({ err: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }

};

module.exports = infoUser;
