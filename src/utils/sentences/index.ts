import { defaultSentences } from './default';
import { developerSentences } from './developer';
import { psychoanalystSentences } from './psychoanalyst';
import { politicSentence } from './politic';

import { telegramMessageLength } from '../constants';

type SentenceType = 'default' | 'developer' | 'psychoanalyst' | 'politic';

export const generate = (sentence: SentenceType, paragraphsNumber = 1) => {
  const sentencesGroups = {
    default: defaultSentences,
    developer: developerSentences,
    psychoanalyst: psychoanalystSentences,
    politic: politicSentence,
  };

  if (!!sentencesGroups[sentence]) {
    const paragraphs = Array(paragraphsNumber).fill(0);

    const newparagraph = paragraphs
      .map(() => {
        return shuffleSentence(sentencesGroups[sentence]);
      })
      .join('\n\n');

    if (newparagraph.length > telegramMessageLength) {
      // const messages = newparagraph.slice(
      //   0,
      //   telegramMessageLength -
      //     newparagraph.split('.')[newparagraph.split('.').length - 2].length
      // );

      let messagesTotal =
        parseInt(String(newparagraph.length / telegramMessageLength)) + 1;
      const lastMessageCharacter =
        newparagraph.length - messagesTotal * telegramMessageLength;

      const messages = Array(messagesTotal).fill(0);

      let messageCount = 0;
      return messages.map((_, i) => {
        const last = messageCount;
        messageCount += telegramMessageLength;

        const index = i + 1;

        if (index === 1) {
          return newparagraph.slice(0, messageCount);
        }

        if (index === messagesTotal) {
          return newparagraph.slice(last, messageCount + lastMessageCharacter);
        }

        return newparagraph.slice(last, messageCount);
      });
    }

    return newparagraph;
  }

  throw new Error('Sentenças não encontradas');
};

const shuffleSentence = (sentences: string[][], phrasesNumber: number = 3) => {
  const phrases = Array(phrasesNumber).fill(0);

  const result = phrases
    .map(() => {
      const sentence = sentences.reduce((prevSentence, currentPiece) => {
        const randomSentence =
          currentPiece[Math.ceil(Math.random() * (currentPiece.length - 1))];

        return prevSentence + randomSentence;
      }, '');

      return sentence;
    })
    .join(' ');

  return result;
};
