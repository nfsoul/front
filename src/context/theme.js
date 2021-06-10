import React, { Component } from "react";

// could be imported from our translation.json file
const themes = {
    light: {
        foreground: '#ffffff',
        background: '#222222',
    },
    dark: {
        foreground: '#000000',
        background: '#eeeeee',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark
});

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem("theme") || "",
        };
    }

    toggleTheme = () => {
        this.setState(state => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));

        window.localStorage.setItem('theme', this.state.theme);
    };

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    ...this.state,
                    toggleTheme: this.toggleTheme
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export const Consumer = ThemeContext.Consumer;
export const Provider = ThemeProvider;