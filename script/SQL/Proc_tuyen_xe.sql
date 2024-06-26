﻿
IF OBJECT_ID('XEM_TT_TuyenXe', 'P') IS NOT NULL
    DROP PROCEDURE XEM_TT_TuyenXe;
GO
CREATE PROCEDURE XEM_TT_TuyenXe
    @TPDen NVARCHAR(100),
    @TPDi NVARCHAR(100)
AS
BEGIN
    IF @TPDen IS NOT NULL AND @TPDi IS NOT NULL
    BEGIN
        SELECT tpdi.TenThanhPho AS 'Di', 
               tpden.TenThanhPho AS 'Den', 
               lx.TenLoaiXe AS 'LoaiXe', 
                CAST(t.GiaVe AS VARCHAR(20)) AS 'GiaVe', -- Chỉ lấy phần số nguyên
               t.QuangDuong, 
               t.ThoiGianAsText,
			   t.IDTuyen
        FROM TuyenXe t
        JOIN ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
        JOIN ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        JOIN LoaiXe lx ON lx.IDLoaiXe = t.IDLoaiXe
        WHERE tpden.TenThanhPho = @TPDen AND tpdi.TenThanhPho = @TPDi;
    END
    ELSE IF @TPDen IS NULL AND @TPDi IS NOT NULL
    BEGIN
        SELECT tpdi.TenThanhPho AS 'Di', 
               tpden.TenThanhPho AS 'Den', 
                lx.TenLoaiXe AS 'LoaiXe', 
                CAST(t.GiaVe AS VARCHAR(20)) AS 'GiaVe', -- Chỉ lấy phần số nguyên
               t.QuangDuong, 
               t.ThoiGianAsText,
			     t.IDTuyen
        FROM TuyenXe t
        JOIN ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
        JOIN ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        JOIN LoaiXe lx ON lx.IDLoaiXe = t.IDLoaiXe
        WHERE tpdi.TenThanhPho = @TPDi;
    END
    ELSE IF @TPDi IS NULL AND @TPDen IS NOT NULL
    BEGIN
        SELECT tpdi.TenThanhPho AS 'Di', 
               tpden.TenThanhPho AS 'Den', 
                lx.TenLoaiXe AS 'LoaiXe', 
                CAST(t.GiaVe AS VARCHAR(20)) AS 'GiaVe', -- Chỉ lấy phần số nguyên
               t.QuangDuong, 
               t.ThoiGianAsText,
			     t.IDTuyen
        FROM TuyenXe t
        JOIN ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
        JOIN ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        JOIN LoaiXe lx ON lx.IDLoaiXe = t.IDLoaiXe
        WHERE tpden.TenThanhPho = @TPDen;
    END
    ELSE
    BEGIN
        SELECT tpdi.TenThanhPho AS 'Di', 
               tpden.TenThanhPho AS 'Den', 
                lx.TenLoaiXe AS 'LoaiXe', 
                CAST(t.GiaVe AS VARCHAR(20)) AS 'GiaVe', -- Chỉ lấy phần số nguyên
               t.QuangDuong, 
               t.ThoiGianAsText,
			     t.IDTuyen
        FROM TuyenXe t
        JOIN ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
        JOIN ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        JOIN LoaiXe lx ON lx.IDLoaiXe = t.IDLoaiXe;
    END
END;
GO
IF OBJECT_ID('XEM_TuyenXe_Theo_TPDi', 'P') IS NOT NULL
    DROP PROCEDURE XEM_TuyenXe_Theo_TPDi;
GO
CREATE PROCEDURE XEM_TuyenXe_Theo_TPDi
    @TP NVARCHAR(100)
AS
BEGIN
    IF @TP IS NULL
    BEGIN
        WITH OrderedTuyen AS (
            SELECT
                tpden.TenThanhPho AS Den,
                t.QuangDuong,
                t.ThoiGianAsText AS ThoiGian,
                CAST(t.GiaVe AS VARCHAR(20)) AS GiaVe,
                ROW_NUMBER() OVER (PARTITION BY tpdi.TenThanhPho, tpden.TenThanhPho ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho) AS RowNum
            FROM
                TuyenXe t
            JOIN
                ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
            JOIN
                ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        )
        SELECT TOP 3
            Den,
            QuangDuong,
            ThoiGian,
            GiaVe
        FROM
            OrderedTuyen
        WHERE
            RowNum = 1
        ORDER BY
            Den;
    END;
    ELSE
    BEGIN
        WITH OrderedTuyen AS (
            SELECT
                tpden.TenThanhPho AS Den,
                t.QuangDuong,
                t.ThoiGianAsText AS ThoiGian,
                CAST(t.GiaVe AS VARCHAR(20)) AS GiaVe,
                ROW_NUMBER() OVER (PARTITION BY tpdi.TenThanhPho, tpden.TenThanhPho ORDER BY tpdi.TenThanhPho, tpden.TenThanhPho) AS RowNum
            FROM
                TuyenXe t
            JOIN
                ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
            JOIN
                ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
            WHERE
                tpdi.TenThanhPho = @TP
        )
        SELECT TOP 3
            Den,
            QuangDuong,
            ThoiGian,
            GiaVe
        FROM
            OrderedTuyen
        WHERE
            RowNum = 1
        ORDER BY
            Den;
    END;
END;



Go

IF OBJECT_ID('Xem_DS_Ben_Den', 'P') IS NOT NULL
    DROP PROCEDURE Xem_DS_Ben_Den;
GO
CREATE PROCEDURE Xem_DS_Ben_Den
    @T NVARCHAR(100)
AS
BEGIN
   SELECT B.TenBen AS 'BenDen' FROM TuyenBenDen TDEN, Ben B WHERE TDEN.IDTuyen =@T AND B.IDBen = TDEN.IDBenDen

END;
Go

IF OBJECT_ID('Xem_DS_Ben_Di', 'P') IS NOT NULL
    DROP PROCEDURE Xem_DS_Ben_Di;
GO
CREATE PROCEDURE Xem_DS_Ben_Di
    @T NVARCHAR(100)
AS
BEGIN
   SELECT B.TenBen AS 'BenDi' FROM TuyenBenDi TDi, Ben B WHERE TDi.IDTuyen =@T AND B.IDBen = TDi.IDBenDi

END;
Go

EXEC Xem_DS_Ben_Di @T ='T001'

IF OBJECT_ID('Xem_Tuyen_Theo_ID', 'P') IS NOT NULL
    DROP PROCEDURE Xem_Tuyen_Theo_ID;
GO
CREATE PROCEDURE Xem_Tuyen_Theo_ID
    @T NVARCHAR(20)
AS
BEGIN
   SELECT tpdi.TenThanhPho AS 'Di', 
               tpden.TenThanhPho AS 'Den', 
               lx.TenLoaiXe AS 'LoaiXe', 
                CAST(t.GiaVe AS VARCHAR(20)) AS 'GiaVe', -- Chỉ lấy phần số nguyên
               t.QuangDuong, 
               t.ThoiGianAsText 
        FROM TuyenXe t
        JOIN ThanhPho tpden ON t.IDThanhPhoDen = tpden.IDThanhPho
        JOIN ThanhPho tpdi ON t.IDThanhPhoXuatPhat = tpdi.IDThanhPho
        JOIN LoaiXe lx ON lx.IDLoaiXe = t.IDLoaiXe
        WHERE t.IDTuyen = @T

END;
Go