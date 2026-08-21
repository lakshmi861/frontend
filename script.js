/* =====================================================
   MULTI-CROP SOIL ADVISOR
   Frontend Demo / ESP32 Ready
===================================================== */


/* =====================================================
   CROP PROFILES
===================================================== */

const cropProfiles = {

    tomato: {
        name: "Tomato",
        moisture: [40, 70],
        temperature: [18, 30],
        ph: [5.5, 7.0],
        ec: [1.0, 3.0],
        nitrogen: [40, 100],
        phosphorus: [20, 80],
        potassium: [80, 200]
    },

    rice: {
        name: "Rice",
        moisture: [60, 90],
        temperature: [20, 35],
        ph: [5.5, 7.5],
        ec: [0.5, 2.0],
        nitrogen: [40, 100],
        phosphorus: [20, 60],
        potassium: [40, 100]
    },

    wheat: {
        name: "Wheat",
        moisture: [40, 70],
        temperature: [15, 25],
        ph: [6.0, 7.5],
        ec: [0.5, 2.0],
        nitrogen: [40, 100],
        phosphorus: [20, 60],
        potassium: [40, 100]
    },

    maize: {
        name: "Maize",
        moisture: [45, 75],
        temperature: [18, 30],
        ph: [5.8, 7.0],
        ec: [1.0, 2.5],
        nitrogen: [50, 120],
        phosphorus: [25, 70],
        potassium: [60, 150]
    },

    potato: {
        name: "Potato",
        moisture: [50, 80],
        temperature: [15, 25],
        ph: [5.0, 6.5],
        ec: [0.5, 2.0],
        nitrogen: [40, 100],
        phosphorus: [20, 70],
        potassium: [80, 180]
    },

    onion: {
        name: "Onion",
        moisture: [45, 70],
        temperature: [13, 25],
        ph: [6.0, 7.0],
        ec: [0.8, 2.0],
        nitrogen: [30, 80],
        phosphorus: [20, 60],
        potassium: [50, 120]
    },

    chilli: {
        name: "Chilli",
        moisture: [40, 70],
        temperature: [20, 30],
        ph: [5.5, 7.0],
        ec: [1.0, 2.5],
        nitrogen: [40, 100],
        phosphorus: [20, 70],
        potassium: [70, 160]
    },

    cotton: {
        name: "Cotton",
        moisture: [35, 65],
        temperature: [21, 32],
        ph: [5.5, 8.0],
        ec: [1.0, 3.0],
        nitrogen: [40, 100],
        phosphorus: [20, 70],
        potassium: [60, 150]
    },

    sugarcane: {
        name: "Sugarcane",
        moisture: [60, 85],
        temperature: [20, 35],
        ph: [6.0, 7.5],
        ec: [1.0, 3.0],
        nitrogen: [60, 140],
        phosphorus: [30, 80],
        potassium: [80, 200]
    },

    groundnut: {
        name: "Groundnut",
        moisture: [40, 70],
        temperature: [20, 30],
        ph: [6.0, 7.5],
        ec: [0.5, 2.0],
        nitrogen: [20, 60],
        phosphorus: [20, 70],
        potassium: [50, 120]
    },

    ragi: {
        name: "Ragi",
        moisture: [35, 65],
        temperature: [20, 30],
        ph: [5.5, 7.0],
        ec: [0.5, 2.0],
        nitrogen: [30, 80],
        phosphorus: [15, 50],
        potassium: [40, 100]
    },

    turmeric: {
        name: "Turmeric",
        moisture: [55, 80],
        temperature: [20, 30],
        ph: [5.5, 7.5],
        ec: [0.5, 2.5],
        nitrogen: [40, 100],
        phosphorus: [20, 70],
        potassium: [70, 160]
    },

    banana: {
        name: "Banana",
        moisture: [60, 85],
        temperature: [20, 35],
        ph: [5.5, 7.5],
        ec: [1.0, 3.0],
        nitrogen: [50, 120],
        phosphorus: [30, 80],
        potassium: [100, 250]
    },

    grapes: {
        name: "Grapes",
        moisture: [35, 60],
        temperature: [15, 30],
        ph: [6.0, 7.5],
        ec: [0.5, 2.0],
        nitrogen: [30, 80],
        phosphorus: [20, 70],
        potassium: [80, 180]
    },

    carrot: {
        name: "Carrot",
        moisture: [45, 70],
        temperature: [15, 25],
        ph: [5.5, 7.0],
        ec: [0.5, 2.0],
        nitrogen: [30, 80],
        phosphorus: [20, 60],
        potassium: [50, 120]
    }

};


/* =====================================================
   SENSOR DATA
===================================================== */

let sensorData = {

    moisture: 52,
    soilTemperature: 25,
    ph: 6.4,
    ec: 1.6,

    nitrogen: 70,
    phosphorus: 45,
    potassium: 110,

    airTemperature: 27,
    humidity: 65

};


let simulationRunning = false;
let simulationTimer = null;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const cropSelect =
    document.getElementById("cropSelect");

const simulationButton =
    document.getElementById("simulationButton");


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const now = new Date();

    document.getElementById("currentTime")
        .textContent = now.toLocaleTimeString();

}


setInterval(updateClock, 1000);

updateClock();


/* =====================================================
   RANDOM NUMBER
===================================================== */

function randomBetween(min, max) {

    return Math.random() * (max - min) + min;

}


/* =====================================================
   SIMULATE SENSOR VALUES
===================================================== */

function generateSensorData() {

    sensorData.moisture =
        Math.round(randomBetween(35, 80));

    sensorData.soilTemperature =
        Number(randomBetween(20, 32).toFixed(1));

    sensorData.ph =
        Number(randomBetween(5.2, 7.8).toFixed(1));

    sensorData.ec =
        Number(randomBetween(0.5, 3.2).toFixed(2));

    sensorData.nitrogen =
        Math.round(randomBetween(20, 130));

    sensorData.phosphorus =
        Math.round(randomBetween(10, 80));

    sensorData.potassium =
        Math.round(randomBetween(40, 180));

    sensorData.airTemperature =
        Number(randomBetween(22, 35).toFixed(1));

    sensorData.humidity =
        Math.round(randomBetween(45, 85));


    updateDashboard();

}


/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    document.getElementById("moistureValue")
        .textContent = sensorData.moisture;

    document.getElementById("soilTempValue")
        .textContent = sensorData.soilTemperature;

    document.getElementById("phValue")
        .textContent = sensorData.ph;

    document.getElementById("ecValue")
        .textContent = sensorData.ec;

    document.getElementById("nitrogenValue")
        .textContent = sensorData.nitrogen;

    document.getElementById("phosphorusValue")
        .textContent = sensorData.phosphorus;

    document.getElementById("potassiumValue")
        .textContent = sensorData.potassium;

    document.getElementById("humidityValue")
        .textContent = sensorData.humidity;


    updateLastUpdate();

    updateSensorStatuses();

    calculateSoilHealth();

    calculateCropSuitability();

    generateAlerts();

    generateRecommendations();

}


/* =====================================================
   LAST UPDATE
===================================================== */

function updateLastUpdate() {

    document.getElementById("lastUpdate")
        .textContent =
        new Date().toLocaleTimeString();

}


/* =====================================================
   CHECK RANGE
===================================================== */

function isInRange(value, range) {

    return value >= range[0] &&
           value <= range[1];

}


/* =====================================================
   SENSOR STATUS
===================================================== */

function updateSensorStatuses() {

    setStatus(
        "moistureStatus",
        sensorData.moisture,
        40,
        70,
        "Moisture"
    );


    setStatus(
        "soilTempStatus",
        sensorData.soilTemperature,
        18,
        30,
        "Temperature"
    );


    setStatus(
        "phStatus",
        sensorData.ph,
        5.5,
        7.5,
        "pH"
    );


    setStatus(
        "ecStatus",
        sensorData.ec,
        0.5,
        3.0,
        "EC"
    );


    setStatus(
        "nitrogenStatus",
        sensorData.nitrogen,
        40,
        100,
        "Nitrogen"
    );


    setStatus(
        "phosphorusStatus",
        sensorData.phosphorus,
        20,
        70,
        "Phosphorus"
    );


    setStatus(
        "potassiumStatus",
        sensorData.potassium,
        50,
        150,
        "Potassium"
    );


    setStatus(
        "humidityStatus",
        sensorData.humidity,
        45,
        80,
        "Humidity"
    );

}


/* =====================================================
   STATUS HELPER
===================================================== */

function setStatus(
    elementId,
    value,
    low,
    high,
    name
) {

    const element =
        document.getElementById(elementId);


    if (value < low) {

        element.textContent =
            `${name} Low`;

        element.style.color =
            "#d97706";

    }

    else if (value > high) {

        element.textContent =
            `${name} High`;

        element.style.color =
            "#dc2626";

    }

    else {

        element.textContent =
            "Normal";

        element.style.color =
            "#16a34a";

    }

}


/* =====================================================
   SOIL HEALTH
===================================================== */

function calculateSoilHealth() {

    let score = 0;

    let parameters = [

        {
            value: sensorData.moisture,
            range: [40, 70]
        },

        {
            value: sensorData.soilTemperature,
            range: [18, 30]
        },

        {
            value: sensorData.ph,
            range: [5.5, 7.5]
        },

        {
            value: sensorData.ec,
            range: [0.5, 3]
        },

        {
            value: sensorData.nitrogen,
            range: [40, 100]
        },

        {
            value: sensorData.phosphorus,
            range: [20, 70]
        },

        {
            value: sensorData.potassium,
            range: [50, 150]
        }

    ];


    parameters.forEach(parameter => {

        if (
            parameter.value >= parameter.range[0] &&
            parameter.value <= parameter.range[1]
        ) {

            score += 100 / parameters.length;

        }

        else {

            const distance =
                parameter.value < parameter.range[0]
                    ? parameter.range[0] - parameter.value
                    : parameter.value - parameter.range[1];

            const rangeSize =
                parameter.range[1] - parameter.range[0];

            const partial =
                Math.max(
                    0,
                    1 - distance / rangeSize
                );

            score +=
                (100 / parameters.length) *
                partial;

        }

    });


    score = Math.round(score);


    document.getElementById("healthScore")
        .textContent = score;

    document.getElementById("healthPercent")
        .textContent = score + "%";

    document.getElementById("healthProgress")
        .style.width = score + "%";


    const badge =
        document.getElementById("healthBadge");

    const title =
        document.getElementById("healthTitle");

    const description =
        document.getElementById("healthDescription");


    badge.className = "badge";


    if (score >= 80) {

        badge.classList.add("good");

        badge.textContent = "Excellent";

        title.textContent =
            "Healthy Soil";

        description.textContent =
            "Most soil parameters are within suitable ranges.";

    }

    else if (score >= 60) {

        badge.classList.add("warning");

        badge.textContent = "Moderate";

        title.textContent =
            "Moderately Healthy";

        description.textContent =
            "Some soil parameters need attention.";

    }

    else {

        badge.classList.add("danger");

        badge.textContent = "Poor";

        title.textContent =
            "Soil Needs Attention";

        description.textContent =
            "Several soil parameters are outside recommended ranges.";

    }

}


/* =====================================================
   CROP SUITABILITY
===================================================== */

function calculateCropSuitability() {

    const crop =
        cropProfiles[cropSelect.value];


    if (!crop) return;


    document.getElementById("selectedCropName")
        .textContent = crop.name;


    const checks = [

        isInRange(
            sensorData.moisture,
            crop.moisture
        ),

        isInRange(
            sensorData.soilTemperature,
            crop.temperature
        ),

        isInRange(
            sensorData.ph,
            crop.ph
        ),

        isInRange(
            sensorData.ec,
            crop.ec
        ),

        isInRange(
            sensorData.nitrogen,
            crop.nitrogen
        ),

        isInRange(
            sensorData.phosphorus,
            crop.phosphorus
        ),

        isInRange(
            sensorData.potassium,
            crop.potassium
        )

    ];


    const suitable =
        checks.filter(Boolean).length;


    const percentage =
        Math.round(
            (suitable / checks.length) * 100
        );


    document.getElementById("suitabilityPercent")
        .textContent =
        percentage + "%";


    document.getElementById("suitabilityProgress")
        .style.width =
        percentage + "%";


    const badge =
        document.getElementById("cropBadge");


    badge.className = "badge";


    if (percentage >= 80) {

        badge.classList.add("good");

        badge.textContent =
            "Highly Suitable";

        document.getElementById("cropRecommendation")
            .textContent =
            `${crop.name} is highly suitable for the current soil conditions.`;

    }

    else if (percentage >= 60) {

        badge.classList.add("warning");

        badge.textContent =
            "Moderately Suitable";

        document.getElementById("cropRecommendation")
            .textContent =
            `${crop.name} can be grown, but some soil parameters need improvement.`;

    }

    else {

        badge.classList.add("danger");

        badge.textContent =
            "Low Suitability";

        document.getElementById("cropRecommendation")
            .textContent =
            `${crop.name} may not be suitable without improving soil conditions.`;

    }

}


/* =====================================================
   ALERT GENERATION
===================================================== */

function generateAlerts() {

    const container =
        document.getElementById("alertsContainer");


    const alerts = [];


    if (sensorData.moisture < 40) {

        alerts.push({

            type: "warning",

            title: "Low Soil Moisture",

            message:
                "Soil moisture is low. Irrigation may be required."

        });

    }


    if (sensorData.moisture > 75) {

        alerts.push({

            type: "warning",

            title: "High Soil Moisture",

            message:
                "Soil moisture is high. Check drainage to prevent waterlogging."

        });

    }


    if (sensorData.ph < 5.5) {

        alerts.push({

            type: "danger",

            title: "Acidic Soil",

            message:
                "Soil pH is low. Consider appropriate soil amendment."

        });

    }


    if (sensorData.ph > 7.5) {

        alerts.push({

            type: "warning",

            title: "Alkaline Soil",

            message:
                "Soil pH is high. Nutrient availability may be affected."

        });

    }


    if (sensorData.nitrogen < 40) {

        alerts.push({

            type: "warning",

            title: "Low Nitrogen",

            message:
                "Nitrogen level is low. Nitrogen-rich organic or recommended fertilizer may be required."

        });

    }


    if (sensorData.phosphorus < 20) {

        alerts.push({

            type: "warning",

            title: "Low Phosphorus",

            message:
                "Phosphorus level is below the selected reference range."

        });

    }


    if (sensorData.potassium < 50) {

        alerts.push({

            type: "warning",

            title: "Low Potassium",

            message:
                "Potassium level is low. Consider suitable potassium supplementation."

        });

    }


    if (sensorData.ec > 3) {

        alerts.push({

            type: "danger",

            title: "High EC",

            message:
                "Electrical conductivity is high. Check salinity and irrigation quality."

        });

    }


    if (alerts.length === 0) {

        container.innerHTML = `

            <div class="alert good">

                <strong>✅ Soil Conditions Normal</strong>

                <p>
                    No major soil health alerts detected.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    alerts.forEach(alert => {

        const div =
            document.createElement("div");

        div.className =
            `alert ${alert.type}`;

        div.innerHTML = `

            <strong>${alert.title}</strong>

            <p>${alert.message}</p>

        `;

        container.appendChild(div);

    });

}


/* =====================================================
   RECOMMENDATIONS
===================================================== */

function generateRecommendations() {

    const container =
        document.getElementById(
            "recommendationsContainer"
        );


    const recommendations = [];


    if (sensorData.moisture < 40) {

        recommendations.push({

            icon: "💧",

            title: "Irrigation",

            text:
                "Increase irrigation carefully and monitor soil moisture."

        });

    }


    if (sensorData.moisture > 75) {

        recommendations.push({

            icon: "🚰",

            title: "Drainage",

            text:
                "Improve drainage and avoid excessive irrigation."

        });

    }


    if (sensorData.ph < 5.5) {

        recommendations.push({

            icon: "🧪",

            title: "pH Correction",

            text:
                "Consider suitable liming or organic amendments after confirming soil requirements."

        });

    }


    if (sensorData.ph > 7.5) {

        recommendations.push({

            icon: "🌱",

            title: "pH Management",

            text:
                "Use appropriate organic matter and soil-management practices to improve pH conditions."

        });

    }


    if (sensorData.nitrogen < 40) {

        recommendations.push({

            icon: "🌿",

            title: "Nitrogen",

            text:
                "Improve nitrogen availability using suitable fertilizer or organic sources."

        });

    }


    if (sensorData.phosphorus < 20) {

        recommendations.push({

            icon: "🌾",

            title: "Phosphorus",

            text:
                "Consider an appropriate phosphorus source based on soil-test requirements."

        });

    }


    if (sensorData.potassium < 50) {

        recommendations.push({

            icon: "🍃",

            title: "Potassium",

            text:
                "Consider a suitable potassium source based on crop requirements."

        });

    }


    if (recommendations.length === 0) {

        recommendations.push({

            icon: "✅",

            title: "Maintain Current Conditions",

            text:
                "Current soil readings are generally suitable. Continue monitoring regularly."

        });

    }


    container.innerHTML = "";


    recommendations
        .slice(0, 3)
        .forEach(item => {

            const div =
                document.createElement("div");

            div.className =
                "recommendation";

            div.innerHTML = `

                <div class="recommendation-icon">
                    ${item.icon}
                </div>

                <h3>${item.title}</h3>

                <p>${item.text}</p>

            `;

            container.appendChild(div);

        });

}


/* =====================================================
   SIMULATION START / STOP
===================================================== */

simulationButton.addEventListener(
    "click",
    function () {

        if (!simulationRunning) {

            simulationRunning = true;

            simulationButton.textContent =
                "⏹ Stop Sensor Simulation";

            simulationButton.style.background =
                "#dc2626";

            document.getElementById(
                "connectionStatus"
            ).textContent =
                "ESP32 Demo Data Streaming";

            generateSensorData();


            simulationTimer =
                setInterval(
                    generateSensorData,
                    3000
                );

        }

        else {

            simulationRunning = false;

            clearInterval(
                simulationTimer
            );

            simulationButton.textContent =
                "▶ Start Sensor Simulation";

            simulationButton.style.background =
                "#1f8f55";

            document.getElementById(
                "connectionStatus"
            ).textContent =
                "Demo Sensor Mode";

        }

    }
);


/* =====================================================
   CROP CHANGE
===================================================== */

cropSelect.addEventListener(
    "change",
    function () {

        calculateCropSuitability();

        generateAlerts();

        generateRecommendations();

    }
);


/* =====================================================
   INITIAL DASHBOARD
===================================================== */

updateDashboard();