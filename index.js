// Inisialisasi Electron
const electron = require('electron')
const url = require('url')
const path = require('path')
// Inisialisasi BrowserWindows
const {app, BrowserWindow, Menu, ipcMain} = electron
// Require MainMenuTemplate
const mainMenuTemplate  = require('./views/main/menu/MainMenuTemplate')

// Membuat Halaman Utama
let mainWindow;

// Ketika aplikasi sudah siap dijalankan
app.on('ready', async () => {
    // Inisialisasi Halaman MainWindow
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 1366,
        height: 768,
        resizable: false,
    })

    // Keluar aplikasi ketika main di Close
    mainWindow.on('closed', () => {
        app.quit();
    })

    // Load URL
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/main/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Membuat Template Menu ( Mengatasi Menu yang tidak digunakan )
    const template = await mainMenuTemplate.getTemplate(app)
    const mainMenu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(mainMenu)
})