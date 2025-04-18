const { app, BrowserWindow } = require('electron') //importation de module d'électron

const createWindow = () => { //Création d'une instance browser windows
  const win = new BrowserWindow({
    width: 1200,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => { //Quand l'app sest prête on crée la fenêtre
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

//Quitter l'application si toutes le fenêtres ont été fermées
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
