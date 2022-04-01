const express = require("express");
const mongoose = require("mongoose");
const { Telegraf } = require("telegraf");
const { start } = require("./respond/start");
const { popular } = require("./respond/popular");
const { topRated } = require("./respond/topRated");
const { upcoming } = require("./respond/upcoming");
const { dayTrending } = require("./respond/dayTrending");
const { search } = require("./respond/search");
const StartModel = require("./model/StartModel");
const UserActionsModel = require("./model/UserActionsModel");
const { Webhook, MessageBuilder } = require("discord-webhook-node");

// using discord webhook to send errors in discord
const sentry = new Webhook(process.env.DISCORD_WEBHOOK);
require("dotenv").config();
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.get("/test", (req, res) => {
  res.json({ ok: true });
});
const port = process.env.PORT;
app.listen(port, () => console.log(`app listening on port ${port}!`));

// error handler
process.on("uncaughtException", (err) => {
  const embed = new MessageBuilder()
    .setTitle("Error")
    .setColor("red")
    .setDescription(err.message);
  sentry.send(embed);
});
process.on("unhandledRejection", (err) => {
  const embed = new MessageBuilder()
    .setTitle("Error")
    .setColor("red")
    .setDescription(err.message);
  sentry.send(embed);
});

bot.start(async (ctx) => {
  ctx.reply(`Welcome!   (●'◡'●)`, start());
  const user = await StartModel.findOne({ id: ctx.message.chat.id });
  if (!user) {
    let newStartModel = new StartModel({
      id: ctx.message.chat.id,
      name: ctx.message.chat.first_name,
      username: ctx.message.chat.username,
      date: new Date().toISOString()
    });
    await newStartModel.save();
  }
});

bot.hears("Popular", async (ctx) => {
  ctx.reply(`🎬 Current Popular Movies: `);
  popular(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Popular",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.command("popular", async (ctx) => {
  ctx.reply(`🎬 Current Popular Movies: `);
  popular(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Popular",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.hears("Top Rated", async (ctx) => {
  ctx.reply(`🎬 Top Rated Movies: `);
  topRated(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Top Rated",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.command("toprated", async (ctx) => {
  ctx.reply(`🎬 Top Rated Movies: `);
  topRated(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Top Rated",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.hears("Upcoming", async (ctx) => {
  ctx.reply(`🎬 Upcoming movies in theatres: `);
  upcoming(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Upcoming",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.command("upcoming", async (ctx) => {
  ctx.reply(`🎬 Upcoming movies in theatres: `);
  upcoming(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Upcoming",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.hears("Day Trending", async (ctx) => {
  ctx.reply(`🎬 daily trending movies: `);
  dayTrending(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Day Trending",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.command("daytrending", async (ctx) => {
  ctx.reply(`🎬 daily trending movies: `);
  dayTrending(ctx, bot);
  let newUserAction = new UserActionsModel({
    id: ctx.message.chat.id,
    name: ctx.message.chat.first_name,
    section: "Day Trending",
    username: ctx.message.chat.username,
    date: new Date().toISOString()
  });
  await newUserAction.save();
});

bot.hears("Search", (ctx) => {
  ctx.reply(`🔍 Enter movie name: `);
  bot.on("text", async (ctx) => {
    let query = ctx.message.text;
    search(ctx, bot, query);
    let newUserAction = new UserActionsModel({
      id: ctx.message.chat.id,
      name: ctx.message.chat.first_name,
      section: "Search",
      username: ctx.message.chat.username,
      message: ctx.message.text,
      date: new Date().toISOString()
    });
    await newUserAction.save();
  });
});

bot.command("search", (ctx) => {
  ctx.reply(`🔍 Enter movie name: `);
  bot.on("text", async (ctx) => {
    let query = ctx.message.text;
    search(ctx, bot, query);
    let newUserAction = new UserActionsModel({
      id: ctx.message.chat.id,
      name: ctx.message.chat.first_name,
      section: "Search",
      username: ctx.message.chat.username,
      message: ctx.message.text,
      date: new Date().toISOString()
    });
    await newUserAction.save();
  });
});

const setupMongooseDB = async () => {
  await mongoose
    .connect(process.env.MongoDB_URL, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((err) => {
      console.log(err);
    });
};
setupMongooseDB();
bot
  .launch()
  .then((r) => console.log(r))
  .catch((err) => {
    const embed = new MessageBuilder()
      .setTitle("Bot Not Launch")
      .setColor("red")
      .setDescription(err);
    sentry.send(embed);
  });
