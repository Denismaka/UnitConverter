/**
 * Table de conversion vers les mètres (unité de base pour les longueurs)
 * Toutes les valeurs sont en mètres
 */
export const LENGTH_UNITS = {
    Millimetre: 0.001,
    Centimetre: 0.01,
    Decimetre: 0.1,
    Metre: 1,
    Kilometre: 1000,
    Pouce: 0.0254,
    Pied: 0.3048,
    Yard: 0.9144,
    Mile: 1609.344,
};

/**
 * Table de conversion vers les grammes (unité de base pour les poids)
 */
export const WEIGHT_UNITS = {
    Milligramme: 0.001,
    Gramme: 1,
    Kilogramme: 1000,
    Tonne: 1000000,
    Once: 28.3495,
    Livre: 453.592,
};

/**
 * Table de conversion vers les litres (unité de base pour les volumes)
 */
export const VOLUME_UNITS = {
    Millilitre: 0.001,
    Centilitre: 0.01,
    Decilitre: 0.1,
    Litre: 1,
    MetreCube: 1000,
    GallonUS: 3.78541,
    PinteUS: 0.473176,
    OnceFluideUS: 0.0295735,
};

/**
 * Convertit une température
 * @param {number} valeur - La valeur à convertir
 * @param {string} uniteSource - Unité source (Celsius, Fahrenheit, Kelvin)
 * @param {string} uniteDestination - Unité destination
 * @returns {number} La valeur convertie
 */
export function convertirTemperature(valeur, uniteSource, uniteDestination) {
    if (uniteSource === uniteDestination) return valeur;

    // Convertir vers Celsius d'abord
    let celsius;
    switch (uniteSource) {
        case 'Celsius':
            celsius = valeur;
            break;
        case 'Fahrenheit':
            celsius = (valeur - 32) * (5 / 9);
            break;
        case 'Kelvin':
            celsius = valeur - 273.15;
            break;
        default:
            throw new Error(`Unité source inconnue: ${uniteSource}`);
    }

    // Convertir de Celsius vers la destination
    switch (uniteDestination) {
        case 'Celsius':
            return celsius;
        case 'Fahrenheit':
            return celsius * (9 / 5) + 32;
        case 'Kelvin':
            return celsius + 273.15;
        default:
            throw new Error(`Unité destination inconnue: ${uniteDestination}`);
    }
}

/**
 * Convertit une valeur d'une unité à une autre
 * @param {number} valeur - La valeur à convertir
 * @param {string} uniteSource - Unité source
 * @param {string} uniteDestination - Unité destination
 * @param {Object} tableConversion - Table de conversion à utiliser
 * @returns {number} La valeur convertie
 */
export function convertir(valeur, uniteSource, uniteDestination, tableConversion) {
    if (uniteSource === uniteDestination) {
        return valeur;
    }

    if (!tableConversion[uniteSource] || !tableConversion[uniteDestination]) {
        throw new Error('Unités non supportées');
    }

    // Convertir vers l'unité de base puis vers l'unité de destination
    const valeurEnBase = valeur * tableConversion[uniteSource];
    const valeurConvertie = valeurEnBase / tableConversion[uniteDestination];

    return valeurConvertie;
}

/**
 * Formate un nombre pour l'affichage
 * @param {number} nombre - Le nombre à formater
 * @param {number} precision - Nombre de décimales (par défaut: auto)
 * @returns {string} Le nombre formaté
 */
export function formaterNombre(nombre, precision = null) {
    if (isNaN(nombre) || !isFinite(nombre)) {
        return 'Erreur';
    }

    // Si c'est un entier, ne pas afficher de décimales
    if (Number.isInteger(nombre) && precision === null) {
        return nombre.toLocaleString('fr-FR');
    }

    // Limiter les décimales
    const maxDecimals = precision !== null ? precision : 6;
    const nombreArrondi = parseFloat(nombre.toFixed(maxDecimals));

    // Formater avec séparateurs de milliers
    return nombreArrondi.toLocaleString('fr-FR', {
        maximumFractionDigits: maxDecimals,
        minimumFractionDigits: 0,
    });
}

/**
 * Valide une valeur d'entrée
 * @param {string} valeur - La valeur à valider
 * @returns {Object} { valide: boolean, valeur: number|null, erreur: string|null }
 */
export function validerValeur(valeur) {
    if (valeur === '' || valeur === null || valeur === undefined) {
        return { valide: false, valeur: null, erreur: null };
    }

    const nombre = parseFloat(valeur);
    if (isNaN(nombre)) {
        return { valide: false, valeur: null, erreur: 'Valeur invalide' };
    }

    if (!isFinite(nombre)) {
        return { valide: false, valeur: null, erreur: 'Nombre trop grand ou trop petit' };
    }

    return { valide: true, valeur: nombre, erreur: null };
}

