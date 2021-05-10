const { Members } = require("../models/index");

const deleteMember = async (req, res) => {
    const id = req.params.id;

    try {
        const memberDelete = await Members.findByPk(id);
        if(memberDelete) {
            await Members.destroy({
                where: { id: id }
            });
            res.status(204).json({ message: 'Member deleted' });
        } else {
            res.status(400).json({ error: 'Member not found' });
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    };
};


module.exports = deleteMember;