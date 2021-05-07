const { Organization } = require("../models/index");

const getOrganization = async (req, res) => {

    try{
        const organization = await Organization.findOne({
            attributes: ["name", "image", "phone", "address","welcomeText"],
            include: {
                association: "Social media",
                attributes: ["facebook","instagram","linkedin"]
            },
            where: {
                id: req.params.id,
            },
        });
        if(!organization){
            return res.status(404).json( { message: 'Organization not Found' } );
        }
        else{
            console.log(organization)
            return res.status(200).json(organization);
        }
    }
    catch(err){
        res.status(500).json(err)
    }
};

module.exports = getOrganization;
