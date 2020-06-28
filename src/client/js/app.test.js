import { checkAndHandle } from "./app";
import { fetchGeoname } from "./app";
import { fetchWeatherbit } from "./app";
import { fetchPixabay } from "./app";
import { createCard } from "./app";

describe("Check if this function exists", () => {
    test("Return true", () => {
        expect(checkAndHandle).toBeDefined();
    });
});

describe("Check if this function exists", () => {
    test("Return true", () => {
        expect(fetchGeoname).toBeDefined();
    });
});

describe("Check if this function exists", () => {
    test("Return true", () => {
        expect(fetchWeatherbit).toBeDefined();
    });
});

describe("Check if this function exists", () => {
    test("Return true", () => {
        expect(fetchPixabay).toBeDefined();
    });
});

describe("Check if this function exists", () => {
    test("Return true", () => {
        expect(createCard).toBeDefined();
    });
});