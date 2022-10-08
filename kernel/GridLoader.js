export class GridLoader
{
    static #_params;

    static #_isValidJson(object)
    {
        if (typeof(object) == "object") {
            try
            {
                JSON.stringify(object);
                return true;
            }
            catch(e)
            {
                return false
            }
        }
        else if (typeof(object) == "string") {
            try
            {
                JSON.parse(object);
                return true;
            }
            catch(e)
            {
                return false
            }
        }
        return false;
    }

    static #_verifyInitJson(rules, verifing)
    {
        for (let key in rules) {
            let valid = true;
            if (key in verifing && typeof(rules[key]) == typeof(verifing[key])) {
                if (GridLoader.#_isValidJson(rules[key] && !GridLoader.#_isValidJson(verifing[key]))) {
                    valid = false;
                }
            }
            else {
                valid = false;
            }

            if (!valid) {
                verifing[key] = rules[key];
            }
        }

        return verifing;
    }

    static load()
    {
        let defaultSettings = {
            "col-quantity": 12,
            "screen-size": {
                "xsmall": [ -1, 576],
                "small": [576, 768],
                "medium": [768, 992],
                "large": [992, 1200],
                "xlarge": [1200, -1]
            }
        };

        let initJson = getComputedStyle(document.documentElement).getPropertyValue('--tracteur-webfront-init');
        if (GridLoader.#_isValidJson(initJson)) {
            GridLoader.#_params = GridLoader.#_verifyInitJson(defaultSettings, JSON.parse(initJson));
        }
        else {
            GridLoader.#_params = defaultSettings;
        }
    }

    static getParams()
    {
        return GridLoader.#_params;
    }
}