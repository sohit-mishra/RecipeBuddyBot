# Chef Buddy Bot

Chef Buddy is a Telegram bot designed to help you discover delicious recipes effortlessly. Whether you're looking for a random recipe or meal ideas based on the ingredients you have, Chef Buddy is here to assist! 👨‍🍳👩‍🍳

---

# Features

- Random Recipe Finder: Get a surprise recipe with the /recipe command.
- Ingredient-Based Search: Find recipes tailored to the ingredients you have using the /custom command.
- Easy to use and beginner-friendly interface

---

# Getting Started

### Prerequisites

To run this bot, you’ll need:

1. Node.js (v14 or later)
2. NPM (comes with Node.js)
3. A Telegram bot token from BotFather.
4. An API key from Spoonacular.

---

# Installation

1. Clone this repository:

```
git clone https://github.com/sohit-mishra/RecipeBuddyBot
cd RecipeBuddyBot
```

2. Install dependencies:

```
npm install
```

3. Create a .env file and add your credentials:

```
BOT_TOKEN=your_telegram_bot_token
SPOONACULAR_API_KEY=your_spoonacular_api_key
```

4. Run the bot:

```
node index.js
```

Open Telegram, search for your bot, and type /start to begin!

--- 

## Commands

| Command   | Description                                   |
| --------- | --------------------------------------------- |
| `/start`  | Start the bot and see the welcome message.    |
| `/recipe` | Get a random recipe suggestion.               |
| `/custom` | Provide ingredients to find tailored recipes. |
