const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const XP_PER_COUNTRY = 500;
const XP_PER_LEVEL = 1000;
const TOTAL_COUNTRIES = 195;

const visitedFile = path.join(
    __dirname,
    "data",
    "visited.json"
);

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.get("/", (req, res) => {

    res.render("index");

});

function getVisitedCountries() {

    try {

        const data =
            fs.readFileSync(
                visitedFile,
                "utf8"
            );

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "❌ Failed to read visited.json:",
            error
        );

        return [];

    }

}

function calculateStats(
    visitedCountries
) {

    const countries =
        visitedCountries.length;

    const totalXP =
        countries *
        XP_PER_COUNTRY;

    const level =
        Math.floor(
            totalXP /
            XP_PER_LEVEL
        ) + 1;

    const currentLevelXP =
        totalXP %
        XP_PER_LEVEL;

    const progress =
        (
            currentLevelXP /
            XP_PER_LEVEL
        ) * 100;


    return {

        level,

        totalXP,

        currentLevelXP,

        xpRequired:
            XP_PER_LEVEL,

        progress,

        countries,

        totalCountries:
            TOTAL_COUNTRIES

    };

}

app.get(
    "/api/visited",
    (req, res) => {

        const visited =
            getVisitedCountries();

        res.json(visited);

    }
);

app.get(
    "/api/stats",
    (req, res) => {

        const visited =
            getVisitedCountries();

        const stats =
            calculateStats(
                visited
            );

        res.json(stats);

    }
);

app.post(
    "/api/visited",
    (req, res) => {

        const country =
            req.body.country;


        if (!country) {

            return res
                .status(400)
                .json({

                    error:
                        "Country name is required."

                });

        }


        const visited =
            getVisitedCountries();

        if (
            visited.includes(
                country
            )
        ) {

            return res.json({

                success: true,

                alreadyVisited: true,

                country,

                visited,

                stats:
                    calculateStats(
                        visited
                    )

            });

        }

        visited.push(
            country
        );

        try {

            fs.writeFileSync(

                visitedFile,

                JSON.stringify(
                    visited,
                    null,
                    2
                )

            );

        } catch (error) {

            console.error(
                "❌ Failed to save country:",
                error
            );

            return res
                .status(500)
                .json({

                    error:
                        "Failed to save country."

                });

        }


        const stats =
            calculateStats(
                visited
            );


        res.json({

            success: true,

            alreadyVisited: false,

            country,

            visited,

            stats

        });

    }
);

app.listen(
    PORT,
    () => {

        console.log(
            `🌸 Sekai No Tabi running at http://localhost:${PORT}`
        );

    }
);