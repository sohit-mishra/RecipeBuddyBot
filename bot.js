const express = require('express');
const app = express();

const { Telegraf } = require('telegraf');
require('dotenv').config();
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';
const PORT = process.env.PORT || 3000;

bot.start((ctx) => {
    ctx.reply('👋 Welcome to RecipeBuddyBot! 🍲\nI can help you find recipes! Type /recipe or /custom to get started. Let\'s cook something tasty! 🍴');
});

bot.command('recipe', async (ctx) => {
    ctx.reply('Please use /custom to search for recipes based on your ingredients. 🍽️');
});

bot.command('custom', (ctx) => {
    ctx.reply('🤔 Tell me what ingredients you have, and I will suggest a recipe for you! 🥘');
});

bot.on('text', async (ctx) => {
    const ingredients = ctx.message.text.toLowerCase();
    try {
        const response = await axios.get(MEALDB_API_URL, {
            params: {
                s: ingredients, 
            },
        });

        const recipes = response.data.meals;

        if (recipes && recipes.length > 0) {
            const recipe = recipes[0];
            const meal = recipe.strMeal;
            const area = recipe.strArea; 
            const thumbnail = recipe.strMealThumb;
            const youtube = recipe.strYoutube; 

            const message = `Here is a recipe suggestion based on the ingredients "${ingredients}": 🍴\n\n<b>${meal}</b>\n🌍 Area: ${area}\n`;

            if (thumbnail) {
                await ctx.replyWithPhoto(thumbnail, { caption: message, parse_mode: 'HTML' });
            } else {
                ctx.reply(message, { parse_mode: 'HTML' });
            }

            if (youtube) {
                ctx.reply(`📺 Watch the recipe on YouTube: ${youtube}`);
            }

        } else {
            ctx.reply('Sorry, I couldn\'t find a recipe with those ingredients. Please try again with different ingredients! 😕');
        }
    } catch (error) {
        console.error(error);
        ctx.reply('Something went wrong while fetching the recipe. Please try again later. 😓');
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.get('', (req, res) => {
    res.send({ message: 'Hello World 🌍' });
});

app.listen(PORT, () => {
    console.log('Server is working ... 🚀');
});
