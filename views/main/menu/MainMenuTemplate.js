exports.getTemplate = (app) => {
    var menuTemplate = [{
            label: 'File',
            submenu: [{
                label: 'Quit Apps',
                click() {
                    app.quit();
                }
            }]
        },
        {
            label: 'Developer Tools',
            submenu: [{
                    role: 'reload'
                },
                {
                    label: 'Toogle Dev Tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            ]
        }
    ]

    return Promise.all(menuTemplate)
}