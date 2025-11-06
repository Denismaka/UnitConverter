/**
 * Application principale de UnitConverter
 * Convertisseur d'unités professionnel
 */

import {
    convertir,
    convertirTemperature,
    formaterNombre,
    validerValeur,
    LENGTH_UNITS,
    WEIGHT_UNITS,
    VOLUME_UNITS,
} from './utils/converter.js';
import { ajouterHistorique, getHistorique, effacerHistorique, getTheme, sauvegarderTheme, getPrecision, sauvegarderPrecision } from './utils/storage.js';
import { CATEGORIES, UNITES_CONFIG } from './config/units.js';

class ConvertisseurApp {
    constructor() {
        this.categorieActuelle = CATEGORIES.LONGUEUR;
        this.precision = getPrecision();
        this.theme = getTheme();
        this.initialiser();
    }

    initialiser() {
        this.elements = {
            input: document.querySelector('#input'),
            resultat: document.querySelector('#resultat'),
            categorie: document.querySelector('#categorie'),
            uniteSource: document.querySelector('#unites'),
            uniteDestination: document.querySelector('#unitesResultat'),
            swapBtn: document.querySelector('#swapBtn'),
            clearBtn: document.querySelector('#clearBtn'),
            themeBtn: document.querySelector('#themeBtn'),
            precisionSelect: document.querySelector('#precision'),
            historiqueBtn: document.querySelector('#historiqueBtn'),
            historiquePanel: document.querySelector('#historiquePanel'),
            fermerHistorique: document.querySelector('#fermerHistorique'),
            effacerHistoriqueBtn: document.querySelector('#effacerHistorique'),
        };

        this.attacherEvenements();
        this.chargerCategorie();
        this.appliquerTheme();
        this.chargerPrecision();
    }

    attacherEvenements() {
        // Conversion
        this.elements.input.addEventListener('input', () => this.calculer());
        this.elements.uniteSource.addEventListener('change', () => this.calculer());
        this.elements.uniteDestination.addEventListener('change', () => this.calculer());
        this.elements.categorie.addEventListener('change', () => this.changerCategorie());

        // Boutons
        this.elements.swapBtn.addEventListener('click', () => this.echangerUnites());
        this.elements.clearBtn.addEventListener('click', () => this.effacer());
        this.elements.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.elements.precisionSelect.addEventListener('change', () => this.changerPrecision());
        this.elements.historiqueBtn.addEventListener('click', () => this.toggleHistorique());
        this.elements.fermerHistorique.addEventListener('click', () => this.toggleHistorique());
        this.elements.effacerHistoriqueBtn.addEventListener('click', () => this.effacerHistoriqueComplet());

        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.historiquePanel.classList.contains('open')) {
                this.toggleHistorique();
            }
        });
    }

    chargerCategorie() {
        const config = UNITES_CONFIG[this.categorieActuelle];
        this.elements.categorie.value = this.categorieActuelle;

        // Mettre à jour les options des selects
        this.mettreAJourSelects(config.unites);
    }

    mettreAJourSelects(unites) {
        const html = unites.map((unite) => `<option value="${unite.value}">${unite.label}</option>`).join('');
        this.elements.uniteSource.innerHTML = html;
        this.elements.uniteDestination.innerHTML = html;

        // Sélectionner les premières unités
        if (unites.length > 0) {
            this.elements.uniteSource.value = unites[0].value;
            this.elements.uniteDestination.value = unites[1]?.value || unites[0].value;
        }

        this.calculer();
    }

    changerCategorie() {
        this.categorieActuelle = this.elements.categorie.value;
        this.chargerCategorie();
    }

    obtenirTableConversion() {
        switch (this.categorieActuelle) {
            case CATEGORIES.LONGUEUR:
                return LENGTH_UNITS;
            case CATEGORIES.POIDS:
                return WEIGHT_UNITS;
            case CATEGORIES.VOLUME:
                return VOLUME_UNITS;
            default:
                return null;
        }
    }

    calculer() {
        const validation = validerValeur(this.elements.input.value);

        if (!validation.valide) {
            this.elements.resultat.value = validation.erreur || '';
            return;
        }

        const valeur = validation.valeur;
        const uniteSource = this.elements.uniteSource.value;
        const uniteDestination = this.elements.uniteDestination.value;

        let valeurConvertie;

        try {
            if (this.categorieActuelle === CATEGORIES.TEMPERATURE) {
                valeurConvertie = convertirTemperature(valeur, uniteSource, uniteDestination);
            } else {
                const tableConversion = this.obtenirTableConversion();
                if (!tableConversion) {
                    throw new Error('Catégorie non supportée');
                }
                valeurConvertie = convertir(valeur, uniteSource, uniteDestination, tableConversion);
            }

            const resultatFormate = formaterNombre(valeurConvertie, this.precision);
            this.elements.resultat.value = resultatFormate;

            // Ajouter à l'historique
            if (valeur !== 0) {
                ajouterHistorique({
                    valeur,
                    uniteSource,
                    uniteDestination,
                    resultat: valeurConvertie,
                    categorie: this.categorieActuelle,
                });
            }
        } catch (error) {
            this.elements.resultat.value = 'Erreur de conversion';
            console.error('Erreur de conversion:', error);
        }
    }

    echangerUnites() {
        const temp = this.elements.uniteSource.value;
        this.elements.uniteSource.value = this.elements.uniteDestination.value;
        this.elements.uniteDestination.value = temp;

        // Échanger les valeurs si elles existent
        if (this.elements.input.value && this.elements.resultat.value) {
            const tempValeur = this.elements.input.value;
            this.elements.input.value = this.elements.resultat.value.replace(/\s/g, '');
            this.elements.resultat.value = tempValeur;
        } else {
            this.calculer();
        }
    }

    effacer() {
        this.elements.input.value = '';
        this.elements.resultat.value = '';
        this.elements.input.focus();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.appliquerTheme();
        sauvegarderTheme(this.theme);
    }

    appliquerTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const icon = this.elements.themeBtn.querySelector('span');
        icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }

    changerPrecision() {
        const valeur = this.elements.precisionSelect.value;
        this.precision = valeur === 'auto' ? null : parseInt(valeur, 10);
        sauvegarderPrecision(this.precision);
        this.calculer();
    }

    chargerPrecision() {
        if (this.precision !== null) {
            this.elements.precisionSelect.value = this.precision.toString();
        }
    }

    toggleHistorique() {
        const panel = this.elements.historiquePanel;
        panel.classList.toggle('open');

        if (panel.classList.contains('open')) {
            this.afficherHistorique();
        }
    }

    afficherHistorique() {
        const historique = getHistorique();
        const container = this.elements.historiquePanel.querySelector('.historique-content');

        if (historique.length === 0) {
            container.innerHTML = '<p class="historique-vide">Aucune conversion dans l\'historique</p>';
            return;
        }

        const html = historique
            .slice(0, 20)
            .map((conv) => {
                const config = UNITES_CONFIG[conv.categorie];
                const uniteSource = config.unites.find((u) => u.value === conv.uniteSource)?.label || conv.uniteSource;
                const uniteDestination = config.unites.find((u) => u.value === conv.uniteDestination)?.label || conv.uniteDestination;
                const date = new Date(conv.date).toLocaleString('fr-FR');

                return `
                    <div class="historique-item">
                        <div class="historique-valeur">
                            ${formaterNombre(conv.valeur)} ${uniteSource} = ${formaterNombre(conv.resultat)} ${uniteDestination}
                        </div>
                        <div class="historique-date">${date}</div>
                    </div>
                `;
            })
            .join('');

        container.innerHTML = html;
    }

    effacerHistoriqueComplet() {
        if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
            effacerHistorique();
            this.afficherHistorique();
        }
    }
}

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new ConvertisseurApp();
});

