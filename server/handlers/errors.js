module.exports = (app) => {
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = {
                error: true,
                message: err.message
            }
        }
    })
}