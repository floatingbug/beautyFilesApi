function validateGetCoreData(req, res, next){
	let { start, count, customerId, name, wohnort, geburtsdatum } = req.query;
    const errors = [];

    if (start !== undefined) {
        start = parseInt(start, 10);
        if (isNaN(start) || start < 0) {
            errors.push({ field: "start", message: "Start muss eine nicht-negative Zahl sein." });
        }
    }

    if (count !== undefined) {
        count = parseInt(count, 10);
        if (isNaN(count) || count <= 0) {
            errors.push({ field: "count", message: "Count muss eine positive Zahl sein." });
        }
    }

    if (name && typeof name !== "string") {
        errors.push({ field: "name", message: "Name muss ein String sein." });
    } else if (name && name.length > 50) {
        errors.push({ field: "name", message: "Name darf maximal 50 Zeichen lang sein." });
    }

    if (wohnort && typeof wohnort !== "string") {
        errors.push({ field: "wohnort", message: "Wohnort muss ein String sein." });
    } else if (wohnort && wohnort.length > 50) {
        errors.push({ field: "wohnort", message: "Wohnort darf maximal 50 Zeichen lang sein." });
    }

    if (geburtsdatum && !/^\d{4}-\d{2}-\d{2}$/.test(geburtsdatum)) {
        errors.push({ field: "geburtsdatum", message: "Geburtsdatum muss im Format YYYY-MM-DD sein." });
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
}


module.exports = {validateGetCoreData};
