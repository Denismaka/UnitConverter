# 🚀 UnitConverter

**UnitConverter** est un convertisseur d'unités moderne, performant et professionnel avec support de multiples catégories (longueur, poids, volume, température).

## ✨ Fonctionnalités

### 🎯 Fonctionnalités principales
- ✅ **Multiples catégories** : Longueur, Poids, Volume, Température
- ✅ **Historique** : Sauvegarde des dernières conversions
- ✅ **Mode sombre** : Thème clair/sombre avec persistance
- ✅ **Précision ajustable** : Contrôle du nombre de décimales
- ✅ **Interface moderne** : Design responsive et accessible
- ✅ **Raccourcis clavier** : Navigation au clavier complète

### 📐 Unités supportées

#### Longueur
- Millimètre, Centimètre, Décimètre, Mètre, Kilomètre
- Pouce, Pied, Yard, Mile

#### Poids
- Milligramme, Gramme, Kilogramme, Tonne
- Once, Livre

#### Volume
- Millilitre, Centilitre, Décilitre, Litre, Mètre cube
- Gallon US, Pinte US, Once fluide US

#### Température
- Celsius, Fahrenheit, Kelvin

## 🛠️ Installation

### Prérequis
- Node.js 16+ et npm/yarn/pnpm

### Installation des dépendances

```bash
npm install
```

## 🚀 Utilisation

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build pour production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Prévisualiser le build

```bash
npm run preview
```

## 📁 Structure du projet

```
├── src/
│   ├── app.js              # Application principale
│   ├── config/
│   │   └── units.js        # Configuration des unités
│   └── utils/
│       ├── converter.js    # Logique de conversion
│       └── storage.js      # Gestion du LocalStorage
├── index.html              # Page principale
├── style.css               # Styles CSS
├── package.json            # Configuration npm
├── vite.config.js          # Configuration Vite
└── README.md               # Documentation
```

## 🎨 Personnalisation

### Thèmes
Le thème est géré via des variables CSS dans `style.css`. Vous pouvez facilement modifier les couleurs en changeant les variables `:root` et `[data-theme='dark']`.

### Ajouter des unités
1. Ajoutez l'unité dans `src/config/units.js`
2. Ajoutez la valeur de conversion dans `src/utils/converter.js`
3. L'unité sera automatiquement disponible dans l'interface

## 🧪 Tests

```bash
npm test
```

## 📝 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build
- `npm run lint` - Vérifier le code avec ESLint
- `npm run format` - Formater le code avec Prettier
- `npm test` - Lancer les tests

## 🔧 Technologies utilisées

- **Vite** - Build tool ultra-rapide
- **Vanilla JavaScript (ES6+)** - Pas de framework, performance optimale
- **CSS Variables** - Thèmes dynamiques
- **LocalStorage API** - Persistance des données

## 📱 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 🚀 Améliorations futures

Voir `ROADMAP_PRO.md` pour la liste complète des améliorations prévues.

## 📄 Licence

MIT

## 👤 Auteur

Développé avec ❤️ pour une expérience de conversion optimale.

---

**Note** : Ce projet est en constante évolution. N'hésitez pas à contribuer !

