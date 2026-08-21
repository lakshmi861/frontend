#include <Arduino.h>

#define SOIL_MOISTURE_PIN 34
#define PH_SENSOR_PIN 35

void setup()
{
    Serial.begin(115200);

    analogReadResolution(12);

    pinMode(SOIL_MOISTURE_PIN, INPUT);
    pinMode(PH_SENSOR_PIN, INPUT);

    Serial.println();
    Serial.println("================================");
    Serial.println("  MULTI-CROP SOIL ADVISOR");
    Serial.println("  ESP32 SENSOR SYSTEM STARTED");
    Serial.println("================================");
}

void loop()
{
    // -----------------------------
    // SOIL MOISTURE
    // -----------------------------

    int moistureRaw = analogRead(SOIL_MOISTURE_PIN);

    int moisturePercent = map(
        moistureRaw,
        4095,
        0,
        0,
        100
    );

    moisturePercent = constrain(
        moisturePercent,
        0,
        100
    );


    // -----------------------------
    // SOIL pH
    // -----------------------------

    int phRaw = analogRead(PH_SENSOR_PIN);

    float voltage =
        (phRaw / 4095.0) * 3.3;

    // Temporary pH conversion
    // Calibration is required for accurate pH
    float pH =
        7.0 + ((2.50 - voltage) / 0.18);

    pH = constrain(
        pH,
        0.0,
        14.0
    );


    // -----------------------------
    // SERIAL OUTPUT
    // -----------------------------

    Serial.print("MOISTURE=");
    Serial.print(moisturePercent);

    Serial.print(",PH=");
    Serial.println(pH, 2);


    delay(2000);
}
