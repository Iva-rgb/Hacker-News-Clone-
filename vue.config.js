module.exports = {
    // options...
    //Fixing CORS error
    devServer: {
        proxy: 'https://hacker-news.firebaseio.com/'
    }
}