const axios = require("axios");
module.exports.upcoming = (ctx, bot) => {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_TOKEN}&language=en-US`
        )
        .then((res) => {
            res.data.results.map((item) =>
                item.poster_path &&
                bot.telegram.sendPhoto(
                    ctx.chat.id,
                    `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    {
                        caption: `${item.original_title}\n\nš Relase Date : ${item.release_date}\n\nš Overview : ${item.overview}\n\nā­ Rate : ${item.vote_average}`
                    }
                )
            );
        })
        .catch((err) => console.log(err));
};
