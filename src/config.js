export default {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://api.khidmatbd.com',
    tokenKey: location.pathname.indexOf('/admin.html') !== -1 ? '_qlfdsfsf' : '_@r9qwjdq',
    // Password reset payload key
    prpk: '9fsehok3isaewqr'
};
