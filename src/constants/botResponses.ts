import type { BotResponses } from '../types';

export const botResponses: BotResponses = {
  '/hello': 'Hello! How can I assist you today?',
  '/help': [
    'Here are the commands you can use:',
    '/hello - Greet the bot',
    '/help - Show this help message',
    '/reset - Reset chat history info',
    '/quote - Get a random quote',
    '/fact - Get a random fact',
  ],
  '/reset': 'To clear the chat history, please click the "Clear History" button.',
  '/quote': [
    '“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt',
    '“In the middle of difficulty lies opportunity.” – Albert Einstein',
  ],
  '/fact': [
    'Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
    'Fun fact: Octopuses have three hearts – one for each of their gills and one for the rest of their body.',
  ],
  '/weather':
    'Unfortunately, I can’t check the weather, but you can always use a weather app or website for up-to-date information!',
  '/quoteoftheday':
    'Here’s your quote for today: “Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill',
  default: 'Sorry, I didn’t understand that. Type /help for a list of available commands.',
};
