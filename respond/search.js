const axios = require("axios");
module.exports.search = (ctx, bot, search) => {
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_TOKEN}&language=en-US&page=1&include_adult=false&query=${search}`
        )
        .then((res) => {
            if (res.data.results.length > 0) {
                res.data.results.map(
                    (item) =>
                        item.poster_path &&
                        bot.telegram.sendPhoto(
                            ctx.chat.id,
                            `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                            {
                                caption: `${item.original_title}\n\n📅 Relase Date : ${item.release_date}\n\n📝 Overview : ${item.overview}\n\n⭐ Rate : ${item.vote_average}`
                            }
                        )
                );
            } else {
                bot.telegram.sendMessage(ctx.chat.id, "Not Found!");
            }
        })
        .catch((err) => console.log(err));
};
