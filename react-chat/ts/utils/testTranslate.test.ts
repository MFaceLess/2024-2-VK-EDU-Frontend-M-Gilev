import TranslateUtils from "./index";
import { IApiRequest } from "./types";

const testImTooTired: IApiRequest = {
    query: 'My name is Khan (good movie btw)',
    fromLanguage: 'en',
    toLanguage: 'ru',
}

const testBackTranslation: IApiRequest = {
    query: 'Я так устал переписывать проект на тайпескрипте...',
    fromLanguage: 'ru',
    toLanguage: 'en',
}

const testDetectLanguage: IApiRequest = {
    query: 'Sing with me sing for the year, Sing for the laughter, and sing for the tear',
    fromLanguage: 'en',
    toLanguage: 'ru',
}

test('translations', async () => {
    await expect(TranslateUtils.translate(testImTooTired.query,  testImTooTired.fromLanguage, testImTooTired.toLanguage)).resolves.toBe('Меня зовут Кхан (хороший фильм, кстати)');
    await expect(TranslateUtils.translate(testBackTranslation.query,  testBackTranslation.fromLanguage, testBackTranslation.toLanguage)).resolves.toBe('I\'m so tired of rewriting the project on a typescript...');
    await expect(TranslateUtils.translate(testDetectLanguage.query,  testDetectLanguage.fromLanguage, testDetectLanguage.toLanguage)).resolves.toBe('Пой со мной петь в течение года, петь для смеха, и петь для слезы');
});
