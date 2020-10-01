module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/vue-bootstrap-admin-panel/',
    devServer: {
        port: 3000
    }
};
