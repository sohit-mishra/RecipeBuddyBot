const { Telegraf } = require('telegraf');
require('dotenv').config();
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

const SPOONACULAR_API_KEY = process.env.API_KEY;
const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

bot.start((ctx) => {
    ctx.reply('Welcome to RecipeBuddyBot! 🍲\nI can help you find recipes! Type /recipe or /custom to get started.');
  });
  
bot.command('recipe', async (ctx) => {
  try {
    const response = await axios.get(SPOONACULAR_API_URL, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number: 1,
        sort: 'random',
      },
    });

    const recipe = response.data.results[0];

    if (recipe) {
      const message = `Here is a random recipe for you: \n\n<b>${recipe.title}</b>\n\n`;
      if (recipe.image) {
        await ctx.replyWithPhoto(recipe.image, { caption: message, parse_mode: 'HTML' });
      } else {
        ctx.reply(message, { parse_mode: 'HTML' });
      }
    } else {
      ctx.reply('Sorry, I couldn\'t find a recipe. Please try again later!');
    }
  } catch (error) {
    console.error(error);
    ctx.reply('Something went wrong while fetching the recipe. Please try again later.');
  }
});

bot.command('custom', (ctx) => {
  ctx.reply('Tell me what ingredients you have, and I will suggest a recipe for you!');
});

bot.on('text', async (ctx) => {
  const ingredients = ctx.message.text.toLowerCase();
  try {
    const response = await axios.get(SPOONACULAR_API_URL, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeIngredients: ingredients,
        number: 1,
      },
    });

    const recipe = response.data.results[0];

    if (recipe) {
      const message = `Here is a recipe suggestion based on the ingredients "${ingredients}": \n\n<b>${recipe.title}</b>\n\n`;
      if (recipe.image) {
        await ctx.replyWithPhoto(recipe.image, { caption: message, parse_mode: 'HTML' });
      } else {
        ctx.reply(message, { parse_mode: 'HTML' });
      }
    } else {
      ctx.reply('Sorry, I couldn\'t find a recipe with those ingredients. Please try again with different ingredients!');
    }
  } catch (error) {
    console.error(error);
    ctx.reply('Something went wrong while fetching the recipe. Please try again later.');
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
