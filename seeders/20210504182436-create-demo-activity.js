'use strict';

const { User } = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const { dataValues } = await User.findOne({
      attributes: ["id"]
    });

    await queryInterface.bulkInsert('Activities', [
    {
      content: `<h2>Merienda para los chicos</h2><p>&nbsp;</p><p>Hoy en el merendero @comedorcaritasucia de Barrio 2 de Abril y en Barrio La Arboleda, hicieron un gran esfuerzo entre Carolina, Cacha y todo el equipo para darles la merienda a los chicos.</p><p>Podes seguir colaborando con la campaña <a href="https://www.facebook.com/hashtag/cuarentenasolidaria?__eep__=6&amp;__cft__[0]=AZUdZzgDnXqoQtX_unBxzr3WhyBBx2AeARDjEjscZ6ju_c5g679Y9GQZAFJdv011oRepHes0RlVIHhTKsbU6ZE5LnvTKBu23gqtjqARvditouSJLIEec604gQA7K62qSHVuDiwJ7EbpqhR_wNr8GtSbY&amp;__tn__=*NK-R">#CuarentenaSolidaria</a> en el link en bio. @ Rafael Calzada, Buenos Aires</p><p>&nbsp;</p>`,
      image: 'https://images.pexels.com/photos/6646981/pexels-photo-6646981.jpeg',
      name: 'Iremos a merendar con los chicos',
      userId: dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: `<h2>Cuarentena Solidaria</h2><p>&nbsp;</p><p>La campaña <a href="https://www.facebook.com/hashtag/cuarentenasolidaria?__eep__=6&amp;__cft__[0]=AZVm9Q5BHFzH39OAbHXBj8p8y0FxsuxtVm7A8P3omjDumYBhbIgACp_aomVfmcJf0x6QH5Hou7aXK1EFmCHFiT7Zu26o0KFJYi45VL_bvbSP7UsrSh7gOtP2slU21RYbFJu31ULzeeY5CHUXDn049jst&amp;__tn__=*NK-R">#CuarentenaSolidaria</a> fue un éxito gracias a todos ustedes: ayudaron de tantas maneras diversas, donando mercadería o a través de MercadoPago, difundiendo, haciendo videos y bancandola a full.</p><p>Hoy con @julichahin terminamos de acomodar toda la mercadería que nos permitirá ayudar a 730 familias de 11 merenderos del Conurbano Bonaerense. También gracias a @rochufigueroa y @guarangadadmujer que literalmente se cargaron el laburo al hombro.</p><p>Un gran equipo haciendo grandes cosas con pequeñas acciones de todos que significaron un montón: gente comprometida para cambiar la realidad que nos rodea y que empatiza con los que verdaderamente llevan la lucha adelante: en cada barrio y merendero, cada vecino y cada ciudadano preocupado por el bienestar del otro.</p><p>Esta pandemia unió muchas voluntades y no queríamos dejar de realmente agradecerles a todos: donantes, amigos, voluntarios, familiares. Y a todos aquellos que difundieron: @derechounlz, @stayhomeplz, @camilacrescimbeni, @launiondiario, @eisenhowerfellowships, @radiomitre, @melhaseitel, @fundacionsangenaro, @bonaerense, @juancruzkomar6, @cervezadewey. Y a muchos amigos que hicieron de una iniciativa personal una causa colectiva.</p><p>Como la cuarentena no termina y la normalidad no llega, volveremos a necesitar juntarnos pronto. Aunar nuestros esfuerzos. Y seguir adelante con todo lo que podemos hacer sin olvidarnos que también estamos ayudando un montón simplemente con quedarnos en casa <a href="https://www.facebook.com/hashtag/coronavirusargentina?__eep__=6&amp;__cft__[0]=AZVm9Q5BHFzH39OAbHXBj8p8y0FxsuxtVm7A8P3omjDumYBhbIgACp_aomVfmcJf0x6QH5Hou7aXK1EFmCHFiT7Zu26o0KFJYi45VL_bvbSP7UsrSh7gOtP2slU21RYbFJu31ULzeeY5CHUXDn049jst&amp;__tn__=*NK-R">#CoronavirusArgentina</a> <a href="https://www.facebook.com/hashtag/quedateentucasa?__eep__=6&amp;__cft__[0]=AZVm9Q5BHFzH39OAbHXBj8p8y0FxsuxtVm7A8P3omjDumYBhbIgACp_aomVfmcJf0x6QH5Hou7aXK1EFmCHFiT7Zu26o0KFJYi45VL_bvbSP7UsrSh7gOtP2slU21RYbFJu31ULzeeY5CHUXDn049jst&amp;__tn__=*NK-R">#QuedateEnTuCasa</a>.</p><p>Por último GRACIAS infinitas a todos!</p>`,
      image: 'https://images.pexels.com/photos/6646852/pexels-photo-6646852.jpeg',
      name: 'Participacion en Cuarentena Solidaria',
      userId: dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
