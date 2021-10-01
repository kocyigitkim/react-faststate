const FastState = require('../index');


module.exports = class LocalizationState extends FastState {
    constructor() {
        super();
        this.languages = {};
        this.language = null;
        this.get = (key) => {
            const lang = this.languages[this.language];
            if (lang) {
                return lang[key];
            }
            return key;
        };
    }
    define(langCode, langDefinition) {
        this.languages[langCode] = langDefinition;
    }
    set(langCode) {
        this.language = langCode;
    }
}