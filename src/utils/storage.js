/**
 * Gestion du stockage local (LocalStorage)
 */

const STORAGE_KEYS = {
    HISTORIQUE: 'convertisseur_historique',
    THEME: 'convertisseur_theme',
    PRECISION: 'convertisseur_precision',
    FAVORIS: 'convertisseur_favoris',
};

/**
 * Récupère l'historique des conversions
 * @returns {Array} Liste des conversions
 */
export function getHistorique() {
    try {
        const historique = localStorage.getItem(STORAGE_KEYS.HISTORIQUE);
        return historique ? JSON.parse(historique) : [];
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        return [];
    }
}

/**
 * Ajoute une conversion à l'historique
 * @param {Object} conversion - Objet conversion {valeur, uniteSource, uniteDestination, resultat, date}
 */
export function ajouterHistorique(conversion) {
    try {
        const historique = getHistorique();
        const nouvelleConversion = {
            ...conversion,
            date: new Date().toISOString(),
            id: Date.now(),
        };

        // Ajouter au début
        historique.unshift(nouvelleConversion);

        // Limiter à 50 conversions
        const historiqueLimite = historique.slice(0, 50);

        localStorage.setItem(STORAGE_KEYS.HISTORIQUE, JSON.stringify(historiqueLimite));
        return nouvelleConversion;
    } catch (error) {
        console.error('Erreur lors de l\'ajout à l\'historique:', error);
        return null;
    }
}

/**
 * Efface l'historique
 */
export function effacerHistorique() {
    try {
        localStorage.removeItem(STORAGE_KEYS.HISTORIQUE);
    } catch (error) {
        console.error('Erreur lors de l\'effacement de l\'historique:', error);
    }
}

/**
 * Récupère le thème sauvegardé
 * @returns {string} 'light' ou 'dark'
 */
export function getTheme() {
    try {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    } catch (error) {
        return 'light';
    }
}

/**
 * Sauvegarde le thème
 * @param {string} theme - 'light' ou 'dark'
 */
export function sauvegarderTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du thème:', error);
    }
}

/**
 * Récupère la précision sauvegardée
 * @returns {number|null} Nombre de décimales ou null pour auto
 */
export function getPrecision() {
    try {
        const precision = localStorage.getItem(STORAGE_KEYS.PRECISION);
        return precision !== null ? parseInt(precision, 10) : null;
    } catch (error) {
        return null;
    }
}

/**
 * Sauvegarde la précision
 * @param {number|null} precision - Nombre de décimales ou null
 */
export function sauvegarderPrecision(precision) {
    try {
        if (precision === null) {
            localStorage.removeItem(STORAGE_KEYS.PRECISION);
        } else {
            localStorage.setItem(STORAGE_KEYS.PRECISION, precision.toString());
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de la précision:', error);
    }
}

