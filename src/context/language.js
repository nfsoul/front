import React, { Component } from "react";
export const LanguageContext = React.createContext();

// could be imported from our translation.json file
const translations = {
    en: {
        welcome: "Welcome",
        greeting: "Hello you're loggedIn!!! Welcome my name is Stan",
        login: "Log In",
        changeLocale: "Change locale to French",
        logout: "Log Out",
        localeIs: "the language is in english",
        content:
            "Are sentiments apartments decisively the especially alteration. Thrown shy denote ten ladies though ask saw. Or by to he going think order event music. Incommode so intention defective at convinced. Led income months itself and houses you. After nor you leave might share court balls. "
    },
    fr: {
        welcome: "Bienvenue",
        greeting: "Bonjour  Vous êtes connecté !!! Bienvenue je m'appelle Stan",
        login: "Connexion",
        changeLocale: "Passer en Anglais",
        logout: "Deconnexion",
        localeIs: "la langue est en Francais",
        content:
            "Regarde fin enlever extreme aux nos mal. Non polies roc certes dur livres ennemi corons nez. Sur sacrifice sanglante mes seulement croissent. Ivres coeur matin gagne grand en ca ah aides. Profonde six les falaises cantines batisses aussitot bon. Cheval encore que allons toi "
    }
};
class LanguageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: "fr",
            translation: translations["fr"]
        };
    }

    switchLocale = () => {
        this.setState(state => {
            const locale = state.locale === "fr" ? "en" : "fr";
            return {
                locale,
                translation: translations[locale]
            };
        });
    };

    render() {
        return (
            <LanguageContext.Provider
                value={{
                    ...this.state,
                    switchLocale: this.switchLocale
                }}
            >
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}

export const Consumer = LanguageContext.Consumer;
export const Provider = LanguageProvider;