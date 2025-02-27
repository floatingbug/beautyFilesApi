const skinData = {
    sebumgehalt: {
        options: ["normal", "vermindert", "erhöht", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    feuchtigkeitsgehalt: {
        options: ["normal", "vermindert", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    porigkeit: {
        options: ["normalporig", "feinporig", "großporig", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    dickeDerEpidermis: {
        options: ["normal", "dünn", "dick", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    durchblutung: {
        options: ["normal", "schlechtDurchblutet", "starkDurchblutet", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    empfindlichkeit: {
        options: ["aufDruck", "aufTemperatur", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    sonstiges: {
        options: ["rauchen", "medikamente", "saunaSolarium", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    allergien: "", 
    unverträglichkeiten: "", 
    tonusUndTurgor: "",
    besondereErscheinung: {
        options: ["teleangiektasien", "komedonen", "talgzystem", "milien", "pusteln", "starkeVerhornung", "Keine Angabe"],
        currValue: "Keine Angabe",
    },
    sonstiges: "",
};


module.exports = {skinData};
