const MAP = {
    width: 1100,
    height: 600,
    scale: 170
};


const COLORS = {
    default: "#17171f",
    visited: "#ff1744",
    hover: "#ff6d00",
    stroke: "#444450",
    activeStroke: "#ffffff"
};

const state = {

    visitedCountries: [],

    countryFeatures: [],

    playerStats: {}

};

const elements = {

    worldMap:
        document.getElementById(
            "worldMap"
        ),

    countrySearch:
        document.getElementById(
            "countrySearch"
        ),

    discoverButton:
        document.getElementById(
            "discoverBtn"
        ),

    discoveryOverlay:
        document.getElementById(
            "discoveryOverlay"
        ),

    discoveryCountry:
        document.getElementById(
            "discoveryCountry"
        ),

    closeDiscovery:
        document.getElementById(
            "closeDiscovery"
        ),

    playerLevel:
        document.getElementById(
            "playerLevel"
        ),

    navbarLevel:
        document.getElementById(
            "navbarLevel"
        ),

    playerXP:
        document.getElementById(
            "playerXP"
        ),

    countryCount:
        document.getElementById(
            "countryCount"
        ),

    xpProgress:
        document.getElementById(
            "xpProgress"
        )

};

const svg = d3

    .select(
        elements.worldMap
    )

    .append("svg")

    .attr(
        "viewBox",
        `0 0 ${MAP.width} ${MAP.height}`
    )

    .attr(
        "width",
        "100%"
    )

    .attr(
        "height",
        "100%"
    );


const projection = d3

    .geoNaturalEarth1()

    .scale(
        MAP.scale
    )

    .translate([
        MAP.width / 2,
        MAP.height / 2
    ]);


const countryPath = d3

    .geoPath()

    .projection(
        projection
    );


initialize();


async function initialize() {

    try {

        await loadPlayerData();

        await loadWorldMap();

        updateHUD();

        console.log(
            "🌸 Sekai No Tabi initialized."
        );

    } catch (error) {

        console.error(
            "❌ Initialization failed:",
            error
        );

    }

}

async function loadPlayerData() {

    const [
        visited,
        stats
    ] = await Promise.all([

        fetchJSON(
            "/api/visited"
        ),

        fetchJSON(
            "/api/stats"
        )

    ]);


    state.visitedCountries =
        visited;

    state.playerStats =
        stats;


    console.log(
        "📖 Journey:",
        state.visitedCountries
    );

    console.log(
        "⚔️ Traveler:",
        state.playerStats
    );

}

async function loadWorldMap() {

    const worldData =
        await d3.json(
            "/data/countries.geojson"
        );


    state.countryFeatures =
        worldData.features;


    console.log(
        `🌎 ${state.countryFeatures.length} countries loaded.`
    );


    drawCountries();

}


function drawCountries() {

    svg

        .selectAll(".country")

        .data(
            state.countryFeatures
        )

        .enter()

        .append("path")

        .attr(
            "class",
            "country"
        )

        .attr(
            "d",
            countryPath
        )

        .attr(
            "fill",
            getCountryColor
        )

        .attr(
            "stroke",
            COLORS.stroke
        )

        .attr(
            "stroke-width",
            0.5
        )

        .on(
            "mouseenter",
            handleCountryHover
        )

        .on(
            "mouseleave",
            handleCountryLeave
        )

        .on(
            "click",
            handleCountryClick
        );

}

function getCountryName(
    country
) {

    return country.properties.ADMIN;

}


function isVisited(
    countryName
) {

    return state
        .visitedCountries
        .includes(
            countryName
        );

}


function getCountryColor(
    country
) {

    const countryName =
        getCountryName(
            country
        );


    return isVisited(
        countryName
    )

        ? COLORS.visited

        : COLORS.default;

}

function handleCountryHover(
    event,
    country
) {

    d3.select(this)

        .attr(
            "fill",
            COLORS.hover
        )

        .attr(
            "stroke",
            COLORS.activeStroke
        )

        .attr(
            "stroke-width",
            1.5
        );


    console.log(
        `🌍 ${getCountryName(country)}`
    );

}


function handleCountryLeave(
    event,
    country
) {

    d3.select(this)

        .attr(
            "fill",
            getCountryColor(
                country
            )
        )

        .attr(
            "stroke",
            COLORS.stroke
        )

        .attr(
            "stroke-width",
            0.5
        );

}


function handleCountryClick(
    event,
    country
) {

    discoverCountry(

        getCountryName(
            country
        ),

        this

    );

}

async function discoverCountry(
    countryName,
    countryElement = null
) {

    if (
        isVisited(
            countryName
        )
    ) {

        console.log(
            `⚔️ Already discovered: ${countryName}`
        );

        return;

    }


    try {

        const result =
            await saveCountry(
                countryName
            );


        if (!result.success) {

            console.error(
                "❌ Country could not be saved."
            );

            return;

        }


        state.visitedCountries =
            result.visited;


        state.playerStats =
            result.stats;


        markCountry(
            countryName,
            countryElement
        );


        updateHUD();


        showDiscovery(
            countryName
        );


        elements.countrySearch.value =
            "";


        console.log(
            `🔥 DISCOVERED: ${countryName}`
        );

        console.log(
            `🌎 Countries: ${state.visitedCountries.length}`
        );

        console.log(
            "⚔️ Stats:",
            state.playerStats
        );

    } catch (error) {

        console.error(
            "❌ Discovery failed:",
            error
        );

    }

}

async function saveCountry(
    countryName
) {

    return fetchJSON(

        "/api/visited",

        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                country:
                    countryName

            })

        }

    );

}

function markCountry(
    countryName,
    countryElement
) {

    if (countryElement) {

        highlightElement(
            countryElement
        );

        return;

    }


    svg

        .selectAll(
            ".country"
        )

        .filter(
            country =>

                getCountryName(
                    country
                ) === countryName
        )

        .each(
            function () {

                highlightElement(
                    this
                );

            }
        );

}


function highlightElement(
    element
) {

    d3.select(element)

        .attr(
            "fill",
            COLORS.visited
        )

        .attr(
            "stroke",
            COLORS.activeStroke
        )

        .attr(
            "stroke-width",
            2
        );

}

function searchCountry(
    value
) {

    const query =
        value
            .trim()
            .toLowerCase();


    if (!query) {

        alert(
            "Choose a destination, traveler."
        );

        return;

    }


    const country =
        state.countryFeatures.find(
            feature => {

                const name =
                    getCountryName(
                        feature
                    )
                    .toLowerCase();


                return name.includes(
                    query
                );

            }
        );


    if (!country) {

        alert(
            `❌ Destination "${value}" not found.`
        );

        return;

    }


    const countryName =
        getCountryName(
            country
        );


    console.log(
        `🔎 Destination found: ${countryName}`
    );


    discoverCountry(
        countryName
    );

}

elements.discoverButton.addEventListener(

    "click",

    () => {

        searchCountry(
            elements.countrySearch.value
        );

    }

);


elements.countrySearch.addEventListener(

    "keydown",

    event => {

        if (
            event.key === "Enter"
        ) {

            searchCountry(
                elements.countrySearch.value
            );

        }

    }

);

function showDiscovery(
    countryName
) {

    elements.discoveryCountry.textContent =
        countryName.toUpperCase();


    elements.discoveryOverlay.classList.add(
        "active"
    );

}


function hideDiscovery() {

    elements.discoveryOverlay.classList.remove(
        "active"
    );

}


elements.closeDiscovery.addEventListener(

    "click",

    hideDiscovery

);


elements.discoveryOverlay.addEventListener(

    "click",

    event => {

        if (
            event.target ===
            elements.discoveryOverlay
        ) {

            hideDiscovery();

        }

    }

);

function updateHUD() {

    const stats =
        state.playerStats;


    if (!stats) {
        return;
    }


    updateLevel(
        stats
    );

    updateXP(
        stats
    );

    updateCountries(
        stats
    );

    updateProgress(
        stats
    );

}


function updateLevel(
    stats
) {

    const levelText =
        `LEVEL ${stats.level}`;


    if (
        elements.playerLevel
    ) {

        elements.playerLevel.textContent =
            levelText;

    }


    if (
        elements.navbarLevel
    ) {

        elements.navbarLevel.textContent =
            levelText;

    }

}


function updateXP(
    stats
) {

    if (
        elements.playerXP
    ) {

        elements.playerXP.textContent =

            `${stats.currentLevelXP} / ${stats.xpRequired} XP`;

    }

}


function updateCountries(
    stats
) {

    if (
        elements.countryCount
    ) {

        elements.countryCount.textContent =

            `${stats.countries} / ${stats.totalCountries}`;

    }

}


function updateProgress(
    stats
) {

    if (
        elements.xpProgress
    ) {

        elements.xpProgress.style.width =
            `${stats.progress}%`;

    }

}

async function fetchJSON(
    url,
    options = {}
) {

    const response =
        await fetch(
            url,
            options
        );


    if (!response.ok) {

        throw new Error(
            `Request failed: ${response.status}`
        );

    }


    return response.json();

}