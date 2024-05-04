const { createDriver } = require('../config/neo4jDB');
const connectToMongoDB = require('../config/connectMongoDB');
const mongoose = require('mongoose');
const { connectToRedis } = require('../config/redisDB');
const redis = require('redis');
const redisClient = redis.createClient();

let gethomepage = async (req, res) => {

    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    try {
        const startTime = new Date().getTime();
        const result1 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'TP. Hồ Chí Minh'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeHCM = result1.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));

        const result2 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'Đà Lạt'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeDL = result2.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));

        const result3 = await session.run("MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho {TenThanhPho: 'Đà Nẵng'}) WITH tpden, tpdi, t ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho WITH tpden, tpdi, COLLECT(t)[0] AS tuyen RETURN tpden.TenThanhPho, tuyen.QuangDuong, tuyen.ThoiGian, tuyen.GiaVe LIMIT 3;");
        const TuyenXeDN = result3.records.map(record => ({
            Den: record.get('tpden.TenThanhPho'),
            QuangDuong: record.get('tuyen.QuangDuong'),
            ThoiGian: record.get('tuyen.ThoiGian'),
            GiaVe: record.get('tuyen.GiaVe'),
        }));
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn

        console.log('Thời gian truy vấn:', queryTime, 'ms');
        return res.render('pages/home.ejs', { TuyenXe1: TuyenXeHCM, TuyenXe2: TuyenXeDL, TuyenXe3: TuyenXeDN, selectedOption: 'nosql' }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};

let GetTuyenXe = async (req, res) => {
    const { diemDi, diemDen } = req.body;
    if (Array.isArray(diemDi)) {
        // Nếu diemDi là một mảng, chỉ sử dụng giá trị đầu tiên
        const diemDiValue = diemDi[0];
        console.log("di:", diemDiValue);
    } else {
        // Nếu không, sử dụng giá trị như bình thường
        console.log("di:", diemDi);
    }
    if (Array.isArray(diemDen)) {
        // Nếu diemDi là một mảng, chỉ sử dụng giá trị đầu tiên
        const diemDenValue = diemDen[0];
        console.log("di:", diemDenValue);
    } else {
        // Nếu không, sử dụng giá trị như bình thường
        console.log("di:", diemDen);
    }

    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    let cypher = "MATCH (tpden:ThanhPho";
    if (diemDen) {
        cypher += " {TenThanhPho: '" + diemDen + "'}"
    }
    cypher += ") <-[:Den]-(t:Tuyen)-[:XuatPhatTu]->(tpdi:ThanhPho";
    if (diemDi) {
        cypher += " {TenThanhPho: '" + diemDi + "'}"
    }
    cypher += "), (t)-[:dung]->(lx:LoaiXe) RETURN tpdi.TenThanhPho +' -> ' +tpden.TenThanhPho AS HanhTrinh, lx.TenLoaiXe, t.QuangDuong, t.ThoiGian, t.GiaVe, t.IDTuyen ORDER BY tpdi.TenThanhPho";
    console.log(cypher)
    try {
        const startTime = new Date().getTime();
        const result = await session.run(cypher);

        const TuyenXes = result.records.map(record => ({
            HanhTrinh: record.get('HanhTrinh'),
            LoaiXe: record.get('lx.TenLoaiXe'),
            QuangDuong: record.get('t.QuangDuong'),
            ThoiGian: record.get('t.ThoiGian'),
            GiaVe: record.get('t.GiaVe'),
            IDTuyen: record.get('t.IDTuyen')
        }));
        console.log(TuyenXes)
        //console.log("cypher", cypher)
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn
        console.log('Thời gian truy vấn:', queryTime, 'ms');
        return res.render('pages/TuyenXePage.ejs', { TuyenXes: TuyenXes, selectedOption: 'nosql', di: diemDi, den: diemDen });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};


let GetLoginPage = async (req, res) => {
  try {
      const redisClient = connectToRedis()
      await redisClient.connect()
      let userSession = await redisClient.hGetAll('2810050906.0');
      // console.log(JSON.stringify(userSession, null, 2));
      
      // console.log(req.body)

      return res.render('pages/loginPage.ejs', { selectedOption: 'nosql' });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
  }
};

let login_check = async (req, res) => {
  try {
      const sdt = req.body.sdt;
      const mk = req.body.matKhau;

      redisClient.connect();

      let userSession = await redisClient.hGetAll(sdt);

      if (!userSession || Object.keys(userSession).length === 0) {
          console.log('User not found in Redis');
          return res.status(404).send('User not found');
      }

      if (userSession.MatKhau === mk) {
          console.log('Login successful');
          return res.redirect('/nosql/userprofile');
      } else {
          console.log('Incorrect password');
          return res.status(401).send('Incorrect password');
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
  }
};

let GetSignUpPage = async (req, res) => {
  return res.render('pages/signup.ejs', { selectedOption: 'nosql' });
};

let GetUserProfile = async (req, res) => {
  return res.render('pages/userprofile.ejs', { selectedOption: 'nosql' });
};

let getChiTietTuyen = async (req, res) => {
    const IDTuyen = req.params.IDTuyen;
    var driver = createDriver();
    var session = driver.session({ database: 'futa' });
    let cypher_Don = "MATCH (don:Ben)<-[:Don]-(t:Tuyen {IDTuyen :'" + IDTuyen + "'}) RETURN don.TenBen";
    let cypher_Tra = "MATCH (tra:Ben)<-[:Tra]-(t:Tuyen {IDTuyen :'" + IDTuyen + "'}) RETURN tra.TenBen";
    let cypher = "MATCH (tpden:ThanhPho) <-[:Den]-(t:Tuyen {IDTuyen: '" + IDTuyen + "'})-[:XuatPhatTu]->(tpdi:ThanhPho), (t)-[:dung]->(lx:LoaiXe) RETURN tpdi.TenThanhPho +' -> ' +tpden.TenThanhPho AS HanhTrinh, lx.TenLoaiXe, t.QuangDuong, t.ThoiGian, t.GiaVe, t.IDTuyen"
    try {
        const startTime = new Date().getTime();
        const result1 = await session.run(cypher_Don);
        const result2 = await session.run(cypher_Tra);
        const result3 = await session.run(cypher);
        const Ben_Di = result1.records.map(record => ({
            BenDi: record.get('don.TenBen')
        }));
        const Ben_Den = result2.records.map(record => ({
            BenDen: record.get('tra.TenBen')
        }));
        const TuyenXes = result3.records.map(record => ({
            HanhTrinh: record.get('HanhTrinh'),
            LoaiXe: record.get('lx.TenLoaiXe'),
            QuangDuong: record.get('t.QuangDuong'),
            ThoiGian: record.get('t.ThoiGian'),
            GiaVe: record.get('t.GiaVe'),
        }));
        //console.log("cypher", cypher)
        const endTime = new Date().getTime(); // Thời gian kết thúc truy vấn
        const queryTime = endTime - startTime; // Thời gian thực hiện truy vấn
        console.log('Thời gian truy vấn:', queryTime, 'ms');
        return res.render('pages/CTTuyen.ejs', { BenDi: Ben_Di, BenDen: Ben_Den, TuyenXes: TuyenXes, selectedOption: 'nosql', IDTuyen: IDTuyen }); // Change 'nosql' to 'sql' if SQL is selected
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
        await driver.close();
    }
};


let GetDatVePage = async (req, res) => {
    try {
      // Kết nối đến MongoDB
      await connectToMongoDB();
      // Lấy dữ liệu chuyến xe từ collection ChuyenXe
      const collection = mongoose.connection.collection("ChuyenXe");
  
      const result = await collection.find({ IDChuyen: "C0011" }).toArray();
  
      // Xử lý kết quả trước khi gửi về client
      const ChuyenXe = result.map((record) => ({
        Ten: record.IDChuyen,
        Tuyen: record.TuyenXe,
        ThoiGian: record.ThoiGian,
        Xe: record.Xe,
        GiaVe: record.GiaVe,
        DSGhe: record.DSGhe,
        NgayXuatPhat: record.NgayXuatPhat,
        ThoiGianXuatPhat: record.ThoiGianXuatPhat,
      }));
  
      // console.log("ChuyenXe DSGhe:");
      // ChuyenXe.forEach((chuyen) => {
      //   console.log("REquest",req.body)
      // });
      console.log("Request", req.body);
      const formData = req.body;
  
      if (Object.keys(formData).length === 0 && formData.constructor === Object) {
        // Nếu không có dữ liệu, render trang "DatVe.ejs"
        return res.render("pages/DatVe.ejs", {
          ChuyenXe: ChuyenXe,
          selectedOption: "nosql",
        });
      } else {
        // Nếu có dữ liệu, chuyển hướng đến trang "HoaDon.ejs" và truyền dữ liệu FormData
        formData.IDChuyen = "C0011";
        // console.log(formData)
        const queryString = new URLSearchParams(formData).toString(); // Chuyển FormData thành query string
        return res.redirect(`/nosql/HoaDon?${queryString}`);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return res.status(500).send("Internal Server Error");
    } finally {
      // Đóng kết nối MongoDB sau khi hoàn tất
      mongoose.connection.close();
    }
  };
  
  let GetHoaDonPage = async (req, res) => {
    try {
      const url = require("url");
      const querystring = require("querystring");
      // Đọc query string từ URL
      const urlParams = querystring.parse(url.parse(req.url).query);
  
      const TenKhachHang = urlParams.name;
      const Email = urlParams.email;
      const SDT = urlParams.phone;
      const DSGhe = urlParams.selectedSeat
        ? urlParams.selectedSeat.split(",")
        : [];
      const Total = urlParams.Total;
      const IDChuyen = urlParams.IDChuyen;
  
      await connectToMongoDB();
      // Lấy dữ liệu chuyến xe từ collection ChuyenXe
      const collection = mongoose.connection.collection("ChuyenXe");
  
      const result = await collection.find({ IDChuyen: IDChuyen }).toArray();
      const ChuyenXe = result.map((record) => ({
        Ten: record.IDChuyen,
        Tuyen: record.TuyenXe,
        ThoiGian: record.ThoiGian,
        Xe: record.Xe,
        GiaVe: record.GiaVe,
        DSGhe: record.DSGhe,
        NgayXuatPhat: record.NgayXuatPhat,
        ThoiGianXuatPhat: record.ThoiGianXuatPhat,
      }));
      // Xử lý kết quả trước khi gửi về client
      const HoaDon = {
        Ten: TenKhachHang,
        Email: Email,
        SDT: SDT,
        DSGhe: DSGhe,
        TongTien: Total,
        IDChuyen: IDChuyen,
      };
  
      for (const seat of DSGhe) {
        console.log("HoaDon:", HoaDon);
        const filter = { IDChuyen: IDChuyen, "DSGhe.MaGhe": seat };
  
        const update = {
          $set: {
            "DSGhe.$.TinhTrang": 1,
            "DSGhe.$.NguoiMua": {
              // Thêm thông tin người mua vào object NguoiMua
              Ten: TenKhachHang,
              SDT: SDT,
              Email: Email,
            },
          },
        }; // Cập nhật TinhTrang thành 1
        const result = await collection.updateOne(filter, update);
  
        console.log("seat", seat);
        console.log("filter", filter);
        console.log("update", update);
        console.log("result", result);
  
        console.log(
          `Updated document with seat ${seat}: ${result.modifiedCount} document(s) affected.`
        );
      }
  
      console.log(`Successfully updated ${DSGhe.length} documents.`);
      // Khi button được bấm thì mới thực hiện đoạn này
      if (req.body && req.body.btnClicked === "true") {
        return res.render("pages/ThanhToanThanhCong.ejs", {
          selectedOption: "nosql",
        });
      }
  
      return res.render("pages/HoaDon.ejs", {
        HoaDon: HoaDon,
        ChuyenXe: ChuyenXe,
        selectedOption: "nosql",
      });
    } catch (error) {
      console.error("Error retrieving data:", error);
      return res.status(500).send("Internal Server Error");
    } finally {
      // Đóng kết nối MongoDB sau khi hoàn tất
      mongoose.connection.close();
    }
  };
  
  // -----------------------------------------------------
  
  let GetThanhToanThanhCong = async (req, res) => {
    return res.render("pages/ThanhToanThanhCong.ejs", {
      selectedOption: "nosql",
    });
  };

  // -------------------------------------------------
  // Hàm để định dạng lại ngày thành "dd/mm/yyyy"
const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB');
  return formattedDate;
};

// Hàm để định dạng lại thời gian thành "hh:mm"
const formatTime = (timeString) => {
  // Tách giờ và phút từ chuỗi thời gian
  const [hours, minutes] = timeString.split(':');

  // Định dạng lại thời gian thành "hh:mm"
  const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

  return formattedTime;
};

// Hàm định dạng tiền
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

const { isValid, parseISO, startOfDay } = require('date-fns');


function searchChuyenXe() {
  const diemDi = document.getElementById('DiemXuatPhat-input').value;
  const diemDen = document.getElementById('DiemDen-input').value;
  const ngayXuatPhat = document.getElementById('departure-date').value;
  const soVe = document.getElementById('quantity').value;

  const filterBuoi = Array.from(document.querySelectorAll('input[name="filterBuoi"]:checked')).map(checkbox => checkbox.value);
  const filterLoaiXe = Array.from(document.querySelectorAll('input[name="filterLoaiXe"]:checked')).map(checkbox => checkbox.value);

  // Tạo URL với các tham số
  const url = `/nosql/timchuyenxe?diemDi=${diemDi}&diemDen=${diemDen}&ngayXuatPhat=${ngayXuatPhat}&soVe=${soVe}&filterBuoi=${filterBuoi.join(',')}&filterLoaiXe=${filterLoaiXe.join(',')}`;

  // Chuyển hướng đến trang /nosql/timchuyenxe với các tham số
  window.location.href = url;
}


let GetTimChuyenXe = async (req, res) => {
  try {
      // Nhận dữ liệu từ yêu cầu (request)
      const { diemDi, diemDen, ngayXuatPhat, soVe } = req.body;


      let parsedDate;
      // Kiểm tra ngày xuất phát có hợp lệ không
      if (ngayXuatPhat) {
          parsedDate = parseISO(ngayXuatPhat);
          if (!isValid(parsedDate)) {
              throw new Error('Ngày xuất phát không hợp lệ');
          }
      } else {
          // Nếu không có ngày xuất phát, sử dụng ngày hiện tại
          parsedDate = new Date();
      }

      // Chỉ lấy ngày từ ngày hiện tại
      const today = startOfDay(new Date(parsedDate));

      // Kiểm tra điều kiện soVe <= soGhe
      if (soVe <= 0) {
          throw new Error('Số vé không hợp lệ');
      }

      // Kết nối đến MongoDB
      await connectToMongoDB();

      // Truy vấn cơ sở dữ liệu MongoDB để lấy danh sách chuyến xe thỏa mãn điều kiện
      const collection = mongoose.connection.collection('TimChuyenXe');
      const query = {};
      if (diemDi) {
          query.DiemXuatPhat = diemDi;
      }
      if (diemDen) {
          query.DiemDen = diemDen;
      }
      // Thêm điều kiện để chỉ lấy chuyến xe từ ngày hiện tại trở đi
      query.NgayXuatPhat = { $gte: today };
      // Thêm điều kiện để lấy chuyến xe với số vé nhỏ hơn hoặc bằng số ghế
      query.SoVe = { $lte: soVe };

      // Truy vấn cơ sở dữ liệu
      const allChuyenXe = await collection.find(query).toArray();

      // Xử lý kết quả trước khi gửi về client
      const chuyenXeList = allChuyenXe.map((record) => {
          // Định dạng lại các thuộc tính ngày
          const formattedNgayXuatPhat = formatDate(record.NgayXuatPhat);
          const formattedNgayDen = formatDate(record.NgayDen);
          const formattedThoiGianKhoiHanh = formatTime(record.ThoiGianKhoiHanh);
          const formattedThoiGianDen = formatTime(record.ThoiGianDen);
          const formattedGiaVe = formatPrice(record.GiaVe)
          return {
              DiemXuatPhat: record.DiemXuatPhat,
              NgayXuatPhat: formattedNgayXuatPhat,
              ThoiGianKhoiHanh: formattedThoiGianKhoiHanh,
              DiemDen: record.DiemDen,
              NgayDen: formattedNgayDen,
              ThoiGianDen: formattedThoiGianDen,
              LoaiXe: record.TenLoaiXe,
              GiaVe: formattedGiaVe,
              ThoiGian: record.ThoiGian,
              SoGhe: record.SoGhe
          };
      });

      // Trả về trang web với danh sách chuyến xe đã tìm thấy
      return res.render("pages/timchuyenxe.ejs", {
          ChuyenXeList: chuyenXeList,
          selectedOption: "nosql",
      });
  } catch (error) {
      console.error("Error retrieving data:", error);
      return res.status(500).send("Internal Server Error");
  } finally {
      // Đóng kết nối MongoDB sau khi hoàn tất
      mongoose.connection.close();
  }
};

module.exports = {
    gethomepage,
    GetLoginPage,
    login_check,
    GetUserProfile,
    GetSignUpPage,
    GetDatVePage,
    GetTuyenXe,
    getChiTietTuyen,
    GetHoaDonPage,
    GetThanhToanThanhCong,
    searchChuyenXe,
    GetTimChuyenXe
}
