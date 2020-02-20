'use strict'

const request = require('request')
const dateFormat = require('dateformat')
// Inisialisasi Electron Remote

// Jalankan Fungsi
setupData()

function getDataFromAPI() {
    return new Promise(listFromAPI => {
        setTimeout(() => {
            request('http://apirfidpbo.herokuapp.com/kehadiran/semua', {
                json: true
            }, (error, response, body) => {
                listFromAPI(body)
            }, 3000)
        })
    })
}

async function setupData() {
    // Masukan data ke dalam table
    var listFromAPI = await getDataFromAPI()
    var listData = listFromAPI.results

    // Table
    var tbody = document.querySelector('tbody')

    // Handle error data
    if (listData.length > 0) {
        for (var i = 0; i < listData.length; i++) {
            var tr = document.createElement('tr');
            var nama = document.createElement('td');
            var kelas = document.createElement('td');
            kelas.className = 'text-center'
            var waktu = document.createElement('td');
            waktu.className = 'text-center'
            var status = document.createElement('td');
            status.className = 'text-center'

            nama.textContent = listData[i].nama;
            kelas.textContent = listData[i].kelas;
            waktu.textContent = listData[i].waktu;
            status.textContent = listData[i].status;
            // Cek Apakah telat atau tidak
            if(listData[i].status == "Terlambat"){
                status.className = 'btn btn-telat'
            } else {
                status.className = 'btn btn-tepat'
            }

            tr.appendChild(nama);
            tr.appendChild(kelas);
            tr.appendChild(waktu);
            tr.appendChild(status);
            tbody.appendChild(tr);
        }
    }
}