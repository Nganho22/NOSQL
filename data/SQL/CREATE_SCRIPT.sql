CREATE DATABASE FUTA;
USE FUTA;
--UserProfile
CREATE TABLE USERPROFILE(
	IDUser varchar(20) PRIMARY KEY,
	HoTen nvarchar(100),
	SDT varchar(20),
	DiaChi nvarchar(150),
	GioiTinh nvarchar(10),
	Email nvarchar(50),
	NgaySinh date,
	NgheNghiep nvarchar(50),
	MatKhau varchar(10)
)

--ThanhPho
CREATE TABLE ThanhPho (
    IDThanhPho VARCHAR(20) PRIMARY KEY,
    TenThanhPho NVARCHAR(255)
);

--Ben
CREATE TABLE Ben (
    IDBen VARCHAR(20) PRIMARY KEY,
    TenBen NVARCHAR(255)
);

--TuyenXe
CREATE TABLE TuyenXe (
    IDTuyen VARCHAR(20) PRIMARY KEY,
    IDThanhPhoXuatPhat VARCHAR(20),
    IDThanhPhoDen VARCHAR(20),
    IDLoaiXe VARCHAR(20),
    GiaVe DECIMAL(10,2),
    QuangDuong INT,
    ThoiGianAsText NVARCHAR(100)
);

--TuyenBenDen
CREATE TABLE TuyenBenDen (
    IDTuyen VARCHAR(20),
    IDBenDen VARCHAR(20)
    PRIMARY KEY (IDTuyen, IDBenDen)
);

--TuyenBenDi
CREATE TABLE TuyenBenDi (
    IDTuyen VARCHAR(20),
    IDBenDi VARCHAR(20)
    PRIMARY KEY (IDTuyen, IDBenDi)
);

-- Xe
CREATE TABLE Xe (
    BienSoXe VARCHAR(20),
    IDLoai VARCHAR(20),
    SoGhe INT,
    PRIMARY KEY (BienSoXe)
);

-- LoaiXe
CREATE TABLE LoaiXe (
    IDLoaiXe VARCHAR(20),
    TenLoaiXe VARCHAR(50),
    PRIMARY KEY (IDLoaiXe)
);

-- ChuyenXe
CREATE TABLE ChuyenXe (
    IDChuyen VARCHAR(20) PRIMARY KEY,
    IDTuyen VARCHAR(20),
    IDThanhPhoXuatPhat VARCHAR(20),
    IDThanhPhoDen VARCHAR(20),
    LoaiXe VARCHAR(20),
    BienSoXe VARCHAR(20),
    NgayXuatPhat DATE,
    ThoiGianKhoiHanh TIME,
    ThoiGian VARCHAR(20),
    NgayDen DATE,
    ThoiGianDen TIME,
    GiaVe INT,
    TaiXe VARCHAR(20),
    TenTaiXe NVARCHAR(50)
);

-- ChiTietChuyenXe
CREATE TABLE ChiTietChuyenXe (
    IDChuyen VARCHAR(20),
    MaGhe VARCHAR(20),
    TinhTrang INT,
	PRIMARY KEY(IDChuyen,MaGhe)
    
);

--PhuongThuc
CREATE TABLE PHUONGTHUC (
	IDPhuongThuc varchar(20) PRIMARY KEY,
	TenPhuongThuc nvarchar(50),
	LoaiPhuongThuc nvarchar(50)
)

-- HoaDon
CREATE TABLE HOADON (
	IDHoaDon varchar(20) PRIMARY KEY,
	IDChuyen varchar(20),
	IDTuyen varchar(20),
	IDLoaiXe varchar(20),
	TinhTrangThanhToan nvarchar(50),
	PhuongThucThanhToan varchar(20),
	NgayMua DATE,
	IDUser varchar(20),
	SoLuongVe	int		
)

--ChiTietHoaDon
CREATE TABLE CHITIETHOADON (
	IDHoaDon varchar(20),
	MaGhe varchar(10),
	PRIMARY KEY (IDHoaDon, MaGhe)
)
