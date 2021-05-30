const { Organization, Socialmediacontact} = require('../models/index');

const getOrganization = async (req, res) => {

    try{
        const organization = await Organization.findOne({
            attributes: ['id', 'name', 'image', 'phone', 'address','welcomeText'],
            include: {
                association: 'socialmedia',
                attributes: ['facebook','instagram','linkedin']
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


const updateOrganization = async (req, res) => {
    console.log(req.body);
    const {name, image, facebook, instagram,linkedin, welcomeText} = req.body
    try{

        const idOrganization = await Organization.findOne( {
            attributes: ['id']
        } );

        const id= idOrganization.dataValues.id;

        const organizationUpdate = await Organization.update({
            name,
            image,
            welcomeText
        }, { where: { id } });

        const socialmediaUpdate = await Socialmediacontact.update({
            facebook,
            instagram,
            linkedin
        }, { where: {organizationId:id }});

        return res.status(200).json({message: 'Información actualizada'});
    }
    catch(err){
        res.status(500).json(err)
    }
};


module.exports = {getOrganization, updateOrganization};
