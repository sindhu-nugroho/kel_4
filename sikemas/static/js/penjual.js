const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

// Fungsi untuk menampilkan/menyembunyikan daftar barang
function toggleDaftar(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Fungsi untuk menambah jumlah barang yang dipilih
function tambahBarang(button) {
    var row = button.parentNode.parentNode;
    var jumlahSpan = row.querySelector('td:nth-child(5) span');
    var jumlah = parseInt(jumlahSpan.textContent) + 1;
    jumlahSpan.textContent = jumlah;
    updateTotalHarga();
    hitungBarangDipilih();
}

// Fungsi untuk mengurangi jumlah barang
function kurangiBarang(button) {
    var row = button.parentNode.parentNode;
    var jumlahSpan = row.querySelector('td:nth-child(5) span');
    var jumlah = parseInt(jumlahSpan.textContent);
    if (jumlah > 0) {
        jumlah -= 1;
        jumlahSpan.textContent = jumlah;
        updateTotalHarga();
        hitungBarangDipilih();
    }
}

// Fungsi untuk menghitung total harga
function updateTotalHarga() {
    var totalHarga = 0;
    var rows = document.querySelectorAll('table tr:not(:first-child)');
    rows.forEach(function(row) {
        var jumlahSpan = row.querySelector('td:nth-child(5) span');
        var jumlah = parseInt(jumlahSpan.textContent);
        var hargaPerKg = parseFloat(row.querySelectorAll('td')[2].textContent.split('/')[0].replace('Rp. ', '').replace('.', ''));
        totalHarga += jumlah * hargaPerKg;
    });
    document.getElementById('totalHarga').textContent = totalHarga.toLocaleString();
    updateTotalKeseluruhan(); // Update total keseluruhan setelah mengubah total harga
}

// Fungsi untuk menghitung jumlah barang yang dipilih
function hitungBarangDipilih() {
    var jumlahBarangDipilih = 0;
    var rows = document.querySelectorAll('table tr:not(:first-child)');
    rows.forEach(function(row) {
        var jumlahSpan = row.querySelector('td:nth-child(5) span');
        var jumlah = parseInt(jumlahSpan.textContent);
        jumlahBarangDipilih += jumlah;
    });
    document.getElementById('jumlahBarangDipilih').textContent = jumlahBarangDipilih;
}

// Fungsi untuk menghitung total keseluruhan (total harga - biaya pengiriman)
function updateTotalKeseluruhan() {
    var totalHarga = parseFloat(document.getElementById('totalHarga').textContent.replace(/,/g, ''));
    var biayaPengiriman = parseFloat(document.getElementById('biayaPengiriman').textContent);
    var totalKeseluruhan = totalHarga - biayaPengiriman;
    document.getElementById('totalKeseluruhan').textContent = totalKeseluruhan.toLocaleString();
}

// Fungsi untuk menghitung biaya pengiriman
function hitungBiayaPengiriman() {
    var beratBarang = parseFloat(document.getElementById('beratBarang').value);
    var totalHarga = parseFloat(document.getElementById('totalHarga').textContent.replace(/,/g, ''));
    var biayaJemput = 0;
    var biayaAntar = 0;

    if (beratBarang >= 7 && beratBarang <= 10) {
        biayaJemput = totalHarga * 0;
        biayaAntar = 0;
    } else if (beratBarang > 10) {
        biayaJemput = totalHarga * 0.1;
        biayaAntar = 0;
    } else {
        alert('Berat barang kurang dari 7 kg tidak memenuhi syarat untuk layanan penjemputan atau pengantaran.');
        return;
    }

    var opsiPengiriman = document.querySelector('input[name="opsiPengiriman"]:checked').value;
    var biayaPengiriman;

    if (opsiPengiriman === 'dijemput') {
        biayaPengiriman = biayaJemput;
    } else {
        biayaPengiriman = biayaAntar;
    }

    document.getElementById('biayaJemput').textContent = biayaJemput.toLocaleString();
    document.getElementById('biayaAntar').textContent = biayaAntar.toLocaleString();
    document.getElementById('biayaPengiriman').textContent = biayaPengiriman.toLocaleString();
    document.getElementById('biayaPengiriman').style.display = 'block';
    updateTotalKeseluruhan();
}

// Fungsi untuk menangani penyerahan barang yang dipilih
function submitBarang() {
    var selectedItems = [];
    var rows = document.querySelectorAll('table tr:not(:first-child)');
    var totalHargaBarang = 0;
    rows.forEach(function(row) {
        var jumlahSpan = row.querySelector('td:nth-child(5) span');
        var jumlah = parseInt(jumlahSpan.textContent);
        if (jumlah > 0) {
            var jenisBarang = row.querySelector('td:first-child').textContent;
            var hargaPerKg = parseFloat(row.querySelectorAll('td')[2].textContent.split('/')[0].replace('Rp. ', '').replace('.', ''));
            var totalHargaItem = jumlah * hargaPerKg;
            totalHargaBarang += totalHargaItem;
            selectedItems.push(`${jenisBarang} - Jumlah: ${jumlah} - Total Harga: Rp. ${totalHargaItem.toLocaleString()}`);
        }
    });

    var biayaPengiriman = parseFloat(document.getElementById('biayaPengiriman').textContent.replace(/,/g, ''));
    var totalKeseluruhan = totalHargaBarang - biayaPengiriman;
    var koinDiperoleh = Math.round(totalHargaBarang * 0.001); // Menghitung jumlah koin yang diperoleh (0,001 dari total harga barang)

    if (selectedItems.length > 0) {
        var message = 'Anda telah memilih barang:\n' + selectedItems.join('\n') + '\n\nTotal Harga Barang: Rp. ' + totalHargaBarang.toLocaleString() + '\nBiaya Pengiriman: Rp. ' + biayaPengiriman.toLocaleString() + '\nTotal Keseluruhan: Rp. ' + totalKeseluruhan.toLocaleString() + '\n\nKoin yang Anda peroleh: ' + koinDiperoleh;
        alert(message);

        // Di sini Anda dapat menampilkan jumlah koin yang diperoleh di bagian footer
        var footerKoin = document.createElement('div');
        footerKoin.textContent = 'Koin yang Anda peroleh: ' + koinDiperoleh;
        document.querySelector('footer .footer-content').appendChild(footerKoin);

        // Di sini Anda dapat mengirim data yang dipilih ke server atau melakukan tindakan lain
    } else {
        alert('Tidak ada barang yang dipilih.');
    }
}

// Panggil fungsi untuk menghitung jumlah barang dan total harga saat halaman dimuat
hitungBarangDipilih();
updateTotalHarga();