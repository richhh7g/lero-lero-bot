export const telegramToken = process.env.TELEGRAM_TOKEN as string;

export const telegramApiUrl = `https//api.telegram.org/bot${telegramToken}`;

export const telegramFileUrl = `https//api.telegram.org/file/bot${telegramToken}`;

export const telegramLangCode = 'pt';

export const telegramMessageLength = 4096;
