module.exports = options => {
    return async (ctx, next) => {
        let resource = ctx.params.resource;
        let modelName = require('inflection').classify(resource);
        ctx.Model = require(`../models/${modelName}.js`)
        await next();
    }
}
