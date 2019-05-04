import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import messages from './locales/bn'

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: 'bn', // set locale
    fallbackLocale: 'bn',
    messages // set locale messages
});

const loadedLanguages = ['bn']; // our default language that is pre-loaded

function setI18nLanguage(lang) {
    i18n.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.documentElement.setAttribute('lang', lang);
    return lang
}

export function changeLanguage(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import(`./locales/${lang}`).then(messages => {
                i18n.setLocaleMessage(lang, messages.default);
                loadedLanguages.push(lang);
                return setI18nLanguage(lang);
            });
        }
        return Promise.resolve(setI18nLanguage(lang));
    }
    return Promise.resolve(lang)
}
