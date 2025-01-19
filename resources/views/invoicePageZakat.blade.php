<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        blockquote {
            font-family: "Amiri", "Arial", "Tahoma", serif;
            direction: rtl;
            /* Arah teks kanan ke kiri */
        }

        .images {
            width: 300px;
            margin-bottom: 20px;
        }

        .imagesDoa {
            margin-left: 200px;
        }

        .header {
            font-size: 15px;
            font-weight: bold;
            text-decoration: underline;
        }

        .terima {
            margin-top: 10px;
        }

        .content {
            margin-top: 20px;
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .invoice-item {
            margin-bottom: 10px;
        }

        .terima {
            font-weight: bold;
            display: block;
            margin-top: 60px;
            margin-bottom: 10px;
        }

        .footer {
            display: table;
            width: 100%;
        }

        .subfooter {
            display: table-cell;
            width: 50%;
            /* Bagian kiri dan kanan memiliki lebar yang sama */
            text-align: center;
            vertical-align: top;
        }
    </style>
</head>

<body>
    <div class="header">TANDA TERIMA ZAKAT MUSHOLLA ALJIHAAD</div>
    <div class="content">
        <div class="invoice-container">
            <div class="invoice-item">
                <strong>No:</strong> {{ $invoice['no'] }}
            </div>
            <div class="invoice-item">
                <strong>Tanggal:</strong> {{ $invoice['tanggal'] }}
            </div>
            <span class="terima">Telah diterima dari:</span>
            <div class="invoice-item">
                <strong>Nama:</strong> {{ strtoupper($invoice['nama']) }}
            </div>
            <div class="invoice-item">
                <strong>Alamat:</strong> {{ $invoice['alamat'] }}
            </div>
        </div>
        <p>
            Sejumlah <strong>
                @if ($invoice['uang'] != null)
                    UANG
                @else
                    <s>UANG</s>
                @endif
            </strong> /
            <strong>
                @if ($invoice['beras'] != null)
                    BERAS
                @else
                    <s>BERAS</s>
                @endif
            </strong>
            untuk pembayaran <strong>{{ $invoice['jenis'] }}</strong> sebesar Rp {{ $invoice['uang'] ?? '.....' }} /
            {{ $invoice['beras'] ?? '.....' }} Liter
            sejumlah {{ $invoice['jiwa'] }} Jiwa.
        </p>
        <span>
            <img class="imagesDoa"
                src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents(public_path('assets/images/doazakat.png'))) }}">
        </span>
        <i>Ajarakallahu fiima a'thaita wa baaraka fima abqoita wa ja'alallahu laka thahuuran</i>
        <p>
            Artinya: "Semoga Allah senantiasa memberimu pahala pada barang atau
            apa saja yang telah engkau berikan dan mudah-mudahan Allah memberikanmu berkah pada apa saja yang tinggal
            padamu serta mudah mudahan dijadikannya kesucian bagi engkau dan keluarga."
        </p>
    </div>
    <div class="footer">
        <div class="subfooter">
            <p>Mengetahui,</p>
            <p>DKM Musholla Al Jihaad</p>
            <img class="images"
                src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents($invoice['imagesTandaTanganKetua'])) }}">
            <p><strong>Harmen Mardjunin</strong></p>
            <p>Ketua DKM</p>
        </div>
        <div class="subfooter">
            <p>Hormat kami,</p>
            <br>
            <br>
            <img class="images"
                src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents($invoice['imagesTandaTanganPetugas'])) }}">
            <p><strong>{{ $invoice['namaPetugas'] }}</strong></p>
            <p>Petugas Panitia ZIS 1445H</p>
        </div>
    </div>

</body>

</html>
