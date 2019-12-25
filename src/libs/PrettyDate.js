export default function () {
	var date = new Date();
  var namaBulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var namaHari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var hari = date.getDate();
  var indexBulan = date.getMonth();
  var indexHari = date.getDay();
  var tahun = date.getFullYear();
  return `${namaHari[indexHari]} ${namaBulan[indexBulan]} ${hari}, ${tahun}`;
}