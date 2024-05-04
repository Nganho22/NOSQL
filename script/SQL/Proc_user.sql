use DoAn_Futa
go

-- insert
CREATE PROCEDURE InsertUserProfile
    @HoTen nvarchar(100),
    @SDT varchar(20),
    @DiaChi nvarchar(150),
    @GioiTinh nvarchar(10),
    @Email nvarchar(50),
    @NgaySinh date,
    @NgheNghiep nvarchar(50),
    @MatKhau varchar(10)
AS
BEGIN
    DECLARE @NewIDUser varchar(20)

    SELECT @NewIDUser = MAX(IDUser) FROM USERPROFILE
    
    IF @NewIDUser IS NULL
        SET @NewIDUser = 'U000001'
    ELSE
    BEGIN
        DECLARE @Number int
        SET @Number = CAST(SUBSTRING(@NewIDUser, 2, LEN(@NewIDUser) - 1) AS int)
        SET @Number = @Number + 1
        SET @NewIDUser = 'U' + RIGHT('00000' + CAST(@Number AS varchar(20)), 6)
    END

    INSERT INTO USERPROFILE (IDUser, HoTen, SDT, DiaChi, GioiTinh, Email, NgaySinh, NgheNghiep, MatKhau)
    VALUES (@NewIDUser, @HoTen, @SDT, @DiaChi, @GioiTinh, @Email, @NgaySinh, @NgheNghiep, @MatKhau)
END

go

--drop PROCEDURE InsertUserProfile;

EXEC InsertUserProfile 
    @HoTen = N'Nguyễn Thị Hồng Ngọc',
    @SDT = '0123456789',
    @DiaChi = N'227 Nguyễn Văn Cừ, phường 4, quận 5',
    @GioiTinh = N'Nữ',
    @Email = N'Nthn@gmail.com',
    @NgaySinh = '2002-01-01',
    @NgheNghiep = N'Sinh viên',
    @MatKhau = 'vvvvvvvv';

go

select* from USERPROFILE;
go

--update profile
CREATE PROCEDURE UpdateUserProfile
    @IDUser varchar(20),
    @HoTen nvarchar(100),
    @DiaChi nvarchar(150),
    @GioiTinh nvarchar(10),
    @Email nvarchar(50),
    @NgaySinh date,
    @NgheNghiep nvarchar(50),
    @MatKhau varchar(10)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET HoTen = @HoTen,
            DiaChi = @DiaChi,
            GioiTinh = @GioiTinh,
            Email = @Email,
            NgaySinh = @NgaySinh,
            NgheNghiep = @NgheNghiep,
            MatKhau = @MatKhau
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateUserProfile 
    @IDUser = 'U049734',
    @HoTen = N'Nguyễn Hồng Ngọc',
    @DiaChi = N'227 Nguyễn Văn Cừ, phường 4, quận 5, TP. HCM',
    @GioiTinh = N'Nữ',
    @Email = N'Nthn01@gmail.com',
    @NgaySinh = '2002-01-21',
    @NgheNghiep = N'Học sinh',
    @MatKhau = 'vvvvvvv1';

go

select* from USERPROFILE where IDUser = 'U049734';

--update HoTen
CREATE PROCEDURE UpdateName
    @IDUser varchar(20),
    @HoTen nvarchar(100)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET HoTen = @HoTen
        WHERE IDUser = @IDUser;
    END
END;

go
EXEC UpdateName 
    @IDUser = 'U049734',
    @HoTen = N'Nguyễn Thị Hồng Ngọc';
go

--update DiaChi
CREATE PROCEDURE UpdateAddress
    @IDUser varchar(20),
    @DiaChi nvarchar(150)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET DiaChi = @DiaChi
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateAddress 
    @IDUser = 'U049734',
    @DiaChi = N'227 Nguyễn Văn Cừ, phường 5, quận 5, TP. HCM';
go

--update GioiTinh
CREATE PROCEDURE UpdateGender
    @IDUser varchar(20),
    @GioiTinh nvarchar(10)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET GioiTinh = @GioiTinh
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateGender 
    @IDUser = 'U049734',
    @GioiTinh = N'Nữ';
go

select* from USERPROFILE where IDUser = 'U049734';
go

--update Email
CREATE PROCEDURE UpdateEmail
    @IDUser varchar(20),
    @Email nvarchar(50)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET Email = @Email
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateEmail 
    @IDUser = 'U049734',
    @Email = N'Nthn@gmail.com';

go

select* from USERPROFILE where IDUser = 'U049734';
go

--update NgaySinh
CREATE PROCEDURE UpdateDob
    @IDUser varchar(20),
    @NgaySinh date
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET NgaySinh = @NgaySinh
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateDob 
    @IDUser = 'U049734',
    @NgaySinh = '2002-01-01';
go

select* from USERPROFILE where IDUser = 'U049734';
go

--update NgheNghiep
CREATE PROCEDURE UpdateOccupation
    @IDUser varchar(20),
    @NgheNghiep nvarchar(50)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET NgheNghiep = @NgheNghiep
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdateOccupation
    @IDUser = 'U049734',
    @NgheNghiep = N'Sinh viên';
go

select* from USERPROFILE where IDUser = 'U049734';
go

--update MatKhau
CREATE PROCEDURE UpdatePassword
    @IDUser varchar(20),
    @MatKhau varchar(10)
AS
BEGIN

    IF EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        UPDATE USERPROFILE
        SET MatKhau = @MatKhau
        WHERE IDUser = @IDUser;
    END
END;

go

EXEC UpdatePassword
    @IDUser = 'U049734',
    @MatKhau = 'vvvvvvvv';
go

select* from USERPROFILE where IDUser = 'U049734';

--delete
CREATE PROCEDURE DeleteUser
    @IDUser varchar(20)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM USERPROFILE WHERE IDUser = @IDUser)
    BEGIN
        RAISERROR('IDUser không tồn tại.', 16, 1)
        RETURN
	END

    DELETE FROM USERPROFILE
    WHERE IDUser = @IDUser;
END

go
EXEC DeleteUser @IDUser = 'U049734';
go
select* from USERPROFILE where IDUser = 'U049734';
