module.exports.start = () => {
    return {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Popular"
                    },
                    {
                        text: "Top Rated"
                    },
                    {
                        text: "Upcoming"
                    }
                ],
                [
                    {
                        text: "Day Trending"
                    },
                    {
                        text: "Search"
                    }
                ]
            ]
        }
    };
};
