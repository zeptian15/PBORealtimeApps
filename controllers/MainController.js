'use strict'

const request = require('request')
const dateFormat = require('dateformat')
// Inisialisasi Electron
const electron = require('electron')
const url = require('url')
const path = require('path')
const swal = require('sweetalert2')

// Inisialisasi BrowserWindows
const {
    BrowserWindow,
    ipcMain
} = electron

// Jalankan Fungsi
// setupData()
setupTime()
setupDate()
setupPengumuman()

function getDataFromAPI() {
    return new Promise(listFromAPI => {
        setTimeout(() => {
            request('http://apirfidpbo.herokuapp.com/kehadiran', {
                json: true
            }, (error, response, body) => {
                listFromAPI(body)
            }, 3000)
        })
    })
}

function getLastPengumuman() {
    return new Promise(listPengumumanFromAPI => {
        setTimeout(() => {
            request('http://apirfidpbo.herokuapp.com/pengumuman', {
                json: true
            }, (error, response, body) => {
                listPengumumanFromAPI(body)
            }, 3000)
        })
    })
}

async function setupPengumuman(){
    // Masukan data ke dalam table
    var listFromAPI = await getLastPengumuman()
    var listData = listFromAPI.results

    console.log(listData[0].isi)

    // Set Value
    document.getElementById('tv_pengumuman').innerHTML = listData[0].isi
}

// async function setupData() {
//     // Masukan data ke dalam table
//     var listFromAPI = await getDataFromAPI()
//     var listData = listFromAPI.results

//     // Setup statistik
//     var siswaTepat = listFromAPI.siswaTepat
//     document.getElementById('tv_siswa_tepat').innerHTML = siswaTepat
//     var siswaTelat = listFromAPI.siswaTelat
//     document.getElementById('tv_siswa_telat').innerHTML = siswaTelat

//     // Table
//     var tbody = document.querySelector('tbody')

//     // Handle error data
//     if (listData.length > 0) {
//         for (var i = 0; i < 6; i++) {
//             var tr = document.createElement('tr');
//             var nama = document.createElement('td');
//             var kelas = document.createElement('td');
//             var waktu = document.createElement('td');
//             var status = document.createElement('td');

//             nama.textContent = listData[i].nama;
//             kelas.textContent = listData[i].kelas;
//             waktu.textContent = listData[i].waktu;
//             status.textContent = listData[i].status;
//             // Cek Apakah telat atau tidak
//             if (listData[i].status == "Terlambat") {
//                 status.className = 'btn btn-telat'
//             } else {
//                 status.className = 'btn btn-tepat'
//             }

//             tr.appendChild(nama);
//             tr.appendChild(kelas);
//             tr.appendChild(waktu);
//             tr.appendChild(status);
//             tbody.appendChild(tr);
//         }
//     }
// }

function showLoading(isShow) {
    var loadingProgress = document.getElementById('loadingProgress')
    if (isShow) {
        loadingProgress.classList.add('active')
    } else {
        loadingProgress.classList.remove('active')
    }
}

function setupTime() {
    var timeDisplay = document.getElementById('tv_jam');
    var tanggal = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "HH:MM:ss")
    timeDisplay.innerHTML = tanggal;
}
setInterval(setupTime, 1000);

function setupDate() {
    // Kumpulan Hari
    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu']
    var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    var tanggal = new Date().getDate()
    var _hari = new Date().getDay()
    var _bulan = new Date().getMonth()
    var _tahun = new Date().getFullYear()

    var hari = hari[_hari]
    var bulan = bulan[_bulan]
    var tahun = _tahun

    document.getElementById('tv_tanggal').innerHTML = hari + ', ' + tanggal + " " + bulan + " " + tahun
}

// var socket = io('https://apirfidpbo.herokuapp.com');
var socket = io('http://localhost:3000/');

socket.on('new-data', (data) => {
    swal.fire({
        icon: 'success',
        title: 'Selamat pagi!\n' + data + ', Semangat belajar yaa!',
        showConfirmButton: false,
        timer: 3000
    })
    // document.location.reload();
    var tbody = document.querySelector('tbody')
    tbody.children.remove()
    setupData()
    console.log('Updated')
});