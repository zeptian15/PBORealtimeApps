'use strict'

const request = require('request')
const dateFormat = require('dateformat')
const swal = require('sweetalert2')
// Inisialisasi Electron Remote

// Jalankan Fungsi
setupData()
// Button Filter
document.getElementById('btn_filter').addEventListener('click', filterData)

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

function getDataFilter(kelas, status) {
    return new Promise(listFromAPI => {
        setTimeout(() => {
            request.post('http://localhost:3000/kehadiran/filter', {
                json: true,
                form: {
                    kelas: kelas,
                    status: status
                }
            }, (error, response, body) => {
                listFromAPI(body)
                console.log(body)
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
            if (listData[i].status == "Terlambat") {
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

async function filterData() {
    const {
        value: formValues
    } = await swal.fire({
        title: 'Filter Data',
        html: `<select class="form-control" name="kelas" id="kelas">
        <option value="XII RPL 1">XII RPL 1</option>
        <option value="XII RPL 2">XII RPL 2</option>
        <option value="XII RPL 3">XII RPL 3</option>
    </select>` +
            `<select class="form-control" name="status" id="status">
            <option value="Terlambat">Terlambat</option>
            <option value="Tepat">Tepat waktu</option>
        </select>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('kelas').options[document.getElementById('kelas').selectedIndex].text,
                document.getElementById('status').options[document.getElementById('status').selectedIndex].text,
            ]
        }
    })

    if (formValues) {
        swal.fire({
            icon: 'success',
            title: 'Data akan segera ditampilkan!' + formValues[0],
            showConfirmButton: false,
            timer: 1000
        })

        var listFilter = await getDataFilter(formValues[0], formValues[1])
        var listData = await listFilter.results

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
                if (listData[i].status == "Terlambat") {
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
}