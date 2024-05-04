SET STATISTICS TIME ON;
GO
-- Lấy thông tin chuyến xe bao gồm 
--IDChuyen
--ThanhPhoXuatPhat
--ThanhPhoDen
--ThoiGianXuatPhat
--ThoiGianDen
--ThoiGian
--LoaiXe
--BienSoXe

-- Lấy danh sách những người đã mua ghế nào của chuyến xe
CREATE PROCEDURE DanhSachNguoiMuaTheoChuyen @ChuyenId Varchar(20)
AS
BEGIN
	SELECT U.HOTEN AS TenNguoiMua, CH.MAGHE, CX.IDCHUYEN
	FROM CHITIETHOADON CTHD
	JOIN HOADON HD ON CTHD.IDHOADON = HD.IDHOADON
	JOIN USERPROFILE U ON HD.IDUSER = U.IDUSER
	JOIN CHITIETCHUYENXE CH ON CTHD.MAGHE = CH.MAGHE AND HD.IDCHUYEN = CH.IDCHUYEN
	JOIN CHUYENXE CX ON HD.IDCHUYEN = CX.IDCHUYEN
	AND CX.IDCHUYEN=@ChuyenId
	AND CH.TINHTRANG = 1
END;

EXEC DanhSachNguoiMuaTheoChuyen 'C0001';
go
-- Lấy danh sách ghế nào còn trống của chuyến xe
CREATE PROCEDURE LayDSGheTheoChuyen
    @ChuyenId NVARCHAR(10)
AS
BEGIN
    SELECT CH.MAGHE, CX.IDCHUYEN, Ch.TINHTRANG
    FROM CHITIETHOADON CTHD
    JOIN HOADON HD ON CTHD.IDHOADON = HD.IDHOADON
    JOIN USERPROFILE U ON HD.IDUSER = U.IDUSER
    JOIN CHITIETCHUYENXE CH ON CTHD.MAGHE = CH.MAGHE AND HD.IDCHUYEN = CH.IDCHUYEN
    JOIN CHUYENXE CX ON HD.IDCHUYEN = CX.IDCHUYEN
    WHERE CX.IDCHUYEN = @ChuyenId AND CH.TINHTRANG = 0
    ORDER BY CH.MAGHE;
END;

EXEC LayDSGheTheoChuyen 'C0002';


SELECT TINHTRANG FROM CHITIETCHUYENXE

-- LẤY DANH SÁCH KHÁCH HÀNG MUA VÉ TRÊN CHUYẾN XE
SELECT * 
FROM HOADON HD
JOIN CHITIETHOADON CTHD ON CTHD.IDHOADON=HD.IDHOADON
JOIN CHUYENXE CX ON HD.IDCHUYEN = CX.IDCHUYEN
JOIN CHITIETCHUYENXE CTCX ON CTHD.MAGHE = CTCX.MAGHE
AND
HD.IDCHUYEN='C0001'
go
CREATE PROCEDURE DatVe 
@IDChuyen varchar(20)
--@Username nvarchar(200),
--@Mail nvarchar(200),
--@MaGhe varchar(20)
AS
BEGIN Transaction;
	IF NOT EXISTS ( SELECT CX.IDCHUYEN FROM CHUYENXE CX WHERE CX.IDCHUYEN=@IDCHUYEN )
	BEGIN
		RAISERROR('Khong tim duoc chuyen xe', 16, 1)
        ROLLBACK
    END
END;
go
--drop procedure DatVe
EXEC DatVe 
    @ChuyenId = 'C0001',
    @MaGhe = 'A10',
    @IdUser = 'U000001';
go
CREATE PROCEDURE DatVe
    @ChuyenId NVARCHAR(10),
    @MaGhe NVARCHAR(10),
    @IdUser NVARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem IDChuyen có tồn tại trong bảng ChuyenXe không
    IF NOT EXISTS (SELECT 1 FROM CHUYENXE WHERE IDCHUYEN = @ChuyenId)
    BEGIN
        RAISERROR('IDChuyen không tồn tại trong bảng ChuyenXe.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    -- Kiểm tra xem ghế có trong danh sách trả về của proc LayDSGheTheoChuyen không
    IF NOT EXISTS (
        SELECT 1
        FROM Chitietchuyenxe
        WHERE MAGHE = @MaGhe and TINHTRANG=0
    )
    BEGIN
        RAISERROR('Ghế không tồn tại cho chuyến xe này.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;


    -- Nếu ghế có trong danh sách, thực hiện cập nhật lại tình trạng ghế và lưu tên user
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE CHITIETCHUYENXE
        SET TINHTRANG = 1
        WHERE IDCHUYEN = @ChuyenId AND MAGHE = @MaGhe;

        COMMIT TRANSACTION;
        PRINT 'Dat Ve Thanh Cong';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
            PRINT 'Loi xay ra trong qua trinh dat ve';
        END;
    END CATCH;
END;

select * from chitietchuyenxe where idchuyen='C0001' and maghe='A10'