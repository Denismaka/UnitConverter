/**
 * Configuration des catégories et unités disponibles
 */

export const CATEGORIES = {
    LONGUEUR: 'longueur',
    POIDS: 'poids',
    VOLUME: 'volume',
    TEMPERATURE: 'temperature',
};

export const UNITES_CONFIG = {
    [CATEGORIES.LONGUEUR]: {
        nom: 'Longueur',
        uniteBase: 'Metre',
        unites: [
            { value: 'Millimetre', label: 'Millimètre (mm)' },
            { value: 'Centimetre', label: 'Centimètre (cm)' },
            { value: 'Decimetre', label: 'Décimètre (dm)' },
            { value: 'Metre', label: 'Mètre (m)' },
            { value: 'Kilometre', label: 'Kilomètre (km)' },
            { value: 'Pouce', label: 'Pouce (in)' },
            { value: 'Pied', label: 'Pied (ft)' },
            { value: 'Yard', label: 'Yard (yd)' },
            { value: 'Mile', label: 'Mile (mi)' },
        ],
    },
    [CATEGORIES.POIDS]: {
        nom: 'Poids',
        uniteBase: 'Gramme',
        unites: [
            { value: 'Milligramme', label: 'Milligramme (mg)' },
            { value: 'Gramme', label: 'Gramme (g)' },
            { value: 'Kilogramme', label: 'Kilogramme (kg)' },
            { value: 'Tonne', label: 'Tonne (t)' },
            { value: 'Once', label: 'Once (oz)' },
            { value: 'Livre', label: 'Livre (lb)' },
        ],
    },
    [CATEGORIES.VOLUME]: {
        nom: 'Volume',
        uniteBase: 'Litre',
        unites: [
            { value: 'Millilitre', label: 'Millilitre (ml)' },
            { value: 'Centilitre', label: 'Centilitre (cl)' },
            { value: 'Decilitre', label: 'Décilitre (dl)' },
            { value: 'Litre', label: 'Litre (l)' },
            { value: 'MetreCube', label: 'Mètre cube (m³)' },
            { value: 'GallonUS', label: 'Gallon US (gal)' },
            { value: 'PinteUS', label: 'Pinte US (pt)' },
            { value: 'OnceFluideUS', label: 'Once fluide US (fl oz)' },
        ],
    },
    [CATEGORIES.TEMPERATURE]: {
        nom: 'Température',
        uniteBase: 'Celsius',
        unites: [
            { value: 'Celsius', label: 'Celsius (°C)' },
            { value: 'Fahrenheit', label: 'Fahrenheit (°F)' },
            { value: 'Kelvin', label: 'Kelvin (K)' },
        ],
    },
};

