module.exports = options => {
    return async (ctx, next) => {
        let resource = ctx.params.resource;
        console.log(resource);

        let modelName = require('inflection').classify(resource);
        console.log(modelName);

        ctx.Model = require(`../models/${modelName}.js`)


        // return Model;
        await next();

    }
}
