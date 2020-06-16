module.exports = options => {
    const jwt = require('jsonwebtoken');
    const sercet = require('../plugins/sercet.js')
    const User = require('../models/User.js')
    const assert = require('http-assert');

    return async (ctx, next) => {
        console.log(ctx.request.headers);
        
        // 获取请求头中的token
        let token = ctx.request.headers.authorization.split(' ').pop()
        assert(token, 401,'无token');
        
        // 校验token
        let {id} = jwt.verify(token, sercet);
        assert(id, 401, 'token错误');

        // 查找user
        let user = await User.findById(id);
        assert(user, 401, '请先登录');

        await next();
    }
}