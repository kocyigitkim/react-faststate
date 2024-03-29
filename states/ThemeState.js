const FastState = require('../index');


class ThemeState extends FastState {
    constructor() {
        super();
        this.themes = {};
        this.theme = "default";
        this.get = (key) => {
            const thm = this.themes[this.theme];
            if (thm) {
                return thm[key];
            }
            return key;
        };
    }
    define(themeName, themeDefinition) {
        this.themes[themeName] = themeDefinition;
    }
    set(themeName) {
        this.theme = themeName;
    }
}

module.exports = { ThemeState };