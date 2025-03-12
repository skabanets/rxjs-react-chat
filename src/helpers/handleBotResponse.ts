import { botResponses } from '../constants';

import type { BotResponse } from '../types';

export const handleBotResponse = (message: string): BotResponse => {
  if (botResponses[message]) {
    return botResponses[message];
  }
  return botResponses.default;
};
