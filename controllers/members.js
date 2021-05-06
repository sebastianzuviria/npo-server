
module.exports = {

    createMembers: async (req, res) => {

        const {name} = req.body;
        console.log(name)
        res.json({name})
    }

}