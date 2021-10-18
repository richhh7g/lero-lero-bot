import './bootstrap';

import { Telegraf } from 'telegraf';

import { telegramLangCode, telegramToken } from './utils/constants';
import { generate } from './utils/sentences';
import { defaultCommands } from './command/default';

class App {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(telegramToken);

    this.init();

    this.commands();
  }

  lauch() {
    this.bot.launch();
  }

  init() {
    this.bot.start((ctx) => {
      ctx.telegram.setMyCommands(defaultCommands, {
        language_code: telegramLangCode,
        scope: { type: 'chat', chat_id: ctx.chat.id },
      });

      ctx.reply(`
        Toda a gente já teve que enrolar ao escrever um texto. Seja durante um artigo, uma carta ou qualquer outro documento, o facto é que, para preencher a enorme quantidade de linhas, precisamos utilizar toda a nossa criatividade. Mas esse problema já tem solução. Com O Fabuloso Gerador de Lero-lero, não precisará mais se preocupar.

Lembre-se: aparência é tudo, conteúdo é nada.
        `);
    });
  }

  commands() {
    this.bot.command('/original', async (ctx) => {
      const lerolero = generate('default');

      if (typeof lerolero === 'string') {
        return await ctx.reply(lerolero);
      }

      const leroleroPromise = lerolero.map(async (paragraph) => {
        return Promise.all([await ctx.reply(paragraph)]);
      });

      return await Promise.all([...leroleroPromise]);
    });

    this.bot.command('/desenvolvedor', (ctx) => {
      const lerolero = generate('developer');

      if (typeof lerolero === 'string') {
        return ctx.reply(lerolero);
      }
    });

    this.bot.command('/filosofico', (ctx) => {
      const lerolero = generate('psychoanalyst');

      if (typeof lerolero === 'string') {
        return ctx.reply(lerolero);
      }
    });

    this.bot.command('/politico', (ctx) => {
      const lerolero = generate('politic');

      if (typeof lerolero === 'string') {
        return ctx.reply(lerolero);
      }
    });
  }
}

new App().lauch();
