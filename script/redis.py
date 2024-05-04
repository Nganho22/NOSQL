import pandas as pd
import redis

df = pd.read_excel("FINAL.xlsx", sheet_name="UserProfile")

r = redis.Redis(host='localhost', port=6379, db=0)

for index, row in df.iterrows():
    sdt = str(row['SDT'])
    ten = str(row['Ten'])
    dia_chi = str(row['DiaChi'])
    gioi_tinh = str(row['GioiTinh'])
    email = str(row['Email'])
    ngay_sinh = str(row['NgaySinh'])
    nghe_nghiep = str(row['NgheNghiep'])
    mat_khau = str(row['MatKhau'])
    
    r.hmset(sdt, {
        "Ten": ten,
        "DiaChi": dia_chi,
        "GioiTinh": gioi_tinh,
        "Email": email,
        "NgaySinh": ngay_sinh,
        "NgheNghiep": nghe_nghiep,
        "MatKhau": mat_khau
    })


# HMSET user:1 HoTen "Phạm Thị Bình Minh" SDT "09582150175" DiaChi "115 Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM" GioiTinh "Nữ" Email "PhamMinh@gmail.com" NgaySinh "1986-01-31" NgheNghiep "Kỹ sư" MatKhau "GPAGKTJA"

import redis
r = redis.Redis(host='localhost', port=6379, db=0)

sdt = "0112345679"
data = {
    "HoTen": "Nguyễn Thị Hồng Ngọc",
    "DiaChi": "227 Nguyễn Văn Cừ, phường 4, quận 5, TP HCM",
    "GioiTinh": "Nữ",
    "Email": "nthn@gmail.com",
    "NgaySinh": "2002-01-01",
    "NgheNghiep": "Sinh viên",
    "MatKhau": "vvvvvvvvv"
}

r.hmset(sdt, data)

print("Dữ liệu đã được chèn vào Redis.")

import redis

r = redis.Redis(host='localhost', port=6379, db=0)

sdt = "0112345679"
user_info = r.hgetall(sdt)

print("Thông tin người dùng:")
for field, value in user_info.items():
    print(f"{field.decode('utf-8')}: {value.decode('utf-8')}")


import redis

r = redis.Redis(host='localhost', port=6379, db=0)

sdt = "09582150175"

new_info = {
    "Ten": "Phạm Thị Bình Minh",
    "DiaChi": "115 Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
    "GioiTinh": "Nữ",
    "Email": "PhamMinh@gmail.com",
    "NgaySinh": "1986-01-31",
    "NgheNghiep": "Kỹ sư",
    "MatKhau": "GPAGKTJA"
}

r.hmset(sdt, new_info)
print("Thông tin người dùng đã được cập nhật thành công.")


import redis

r = redis.Redis(host='localhost', port=6379, db=0)

sdt = "09582150175"

old_info = r.hgetall(sdt)

new_info = {
    "Ten": "Phạm A Minh",
    "DiaChi": "115 Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
    "GioiTinh": "Nữ",
    "Email": "PhamMinh@gmail.com",
    "NgaySinh": "1986-01-31",
    "NgheNghiep": "Kỹ sư",
    "MatKhau": "GPAGKTJA"
}

all_info = dict(old_info) if old_info else {}
all_info.update(new_info)

print("Thông tin người dùng trước đó:")
if old_info:
    for field, value in old_info.items():
        print(f"{field.decode('utf-8')}: {value.decode('utf-8')}")

print("\nThông tin người dùng mới:")
for field, value in new_info.items():
    print(f"{field}: {value}")

r.hmset(sdt, all_info)


import redis

r = redis.Redis(host='localhost', port=6379, db=0)

sdt = "0112345679"

r.delete(sdt)
print(f"Thông tin của người dùng với số điện thoại {sdt} đã được xóa khỏi Redis.")
