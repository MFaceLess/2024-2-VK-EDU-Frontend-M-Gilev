import TranslateUtils from "./index";


async function runTranslationTests() {
    try {
        const result1 = await TranslateUtils.translate('Привет мир', 'ru', 'en');
        console.log(result1);

        const result2 = TranslateUtils.translate('Hello, world!', 'en', 'ru');
        console.log(result2);

        const result3 = TranslateUtils.translate('Hello, world!', 'en', 'fr');
        console.log(result3);
    } catch (error) {
        console.error('Error during translation: ', error);
    }
}

runTranslationTests();