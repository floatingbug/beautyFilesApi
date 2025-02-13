function validateUser({ jwt }) {
    return (req, res, next) => { 
        const authorizationHeader = req.get("Authorization");

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                errors: [{ message: "Fehlender oder ungültiger Authorization-Header." }]
            });
        }

        const token = authorizationHeader.substring(7);

        jwt.verify(token, process.env.JWT_SECRET, (error, tokenPayload) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    errors: [{ message: "Bitte erneut anmelden." }]
                });
            }

            req.user = tokenPayload;
            next();
        });
    };
}

module.exports = { validateUser };
