// Importation des modules nécessaires depuis Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev'); // Vérifie si l'application est en mode développement

let mainWindow; // Déclaration de la fenêtre principale de l'application

// Fonction pour créer la fenêtre de l'application
function createWindow() {
  // Création d'une nouvelle fenêtre de navigateur
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Autorise l'intégration de Node.js dans la page web
    },
  });

  // Suppression de la barre de menu de la fenêtre principale
  mainWindow.setMenu(null);

  // Chargement de l'URL de l'application en fonction de l'environnement (développement ou production)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Environnement de développement
      : `file://${path.join(__dirname, '..', 'build', 'index.html')}` // Environnement de production
  );

  // Gestion de l'événement lorsque la fenêtre est fermée
  mainWindow.on('closed', () => (mainWindow = null));
}

// Événement déclenché lorsque l'application est prête à créer des fenêtres de navigateur
app.on('ready', createWindow);

// Événement déclenché lorsque toutes les fenêtres de l'application sont fermées
app.on('window-all-closed', () => {
  // Quitte l'application si l'utilisateur ne se trouve pas sur 
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Événement déclenché lorsque l'application est activée 
app.on('activate', () => {
  // Recrée la fenêtre principale si elle est nulle
  if (mainWindow === null) {
    createWindow();
  }
});
