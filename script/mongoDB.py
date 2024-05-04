import pandas as pd
import pymongo

df = pd.read_csv("ChiTietChuyenXe.csv")
df_chuyenxe = pd.read_csv("ChuyenXe.csv")
df_tuyenxe = pd.read_csv("TuyenXe.csv")
# Kết nối đến MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017") 
db = client["PROJECT"] 
collection = db["ChuyenXe"] 
data = collection.find()


for index, row in df_chuyenxe.iterrows():
    # Thực hiện các thao tác với từng dòng ở đây
    # Ví dụ:
    chuyenxe={}
    chuyenxe['IDChuyen'] = row['IDChuyen']
    rows = df_tuyenxe.loc[df_tuyenxe['IDTuyen'] == row['IDTuyen']]
    Xe={}
    Xe['BienSoXe']=row['BienSoXe']
    Xe['LoaiXe']=row['TenLoaiXe']
    TaiXe={}
    TaiXe['IDTaiXe']=row['TaiXe']
    TaiXe['TenTaiXe']=row['TenTaiXe']
    chuyenxe['TaiXe']=TaiXe
    chuyenxe['Xe']=Xe
    for index, rowk in rows.iterrows():
        TuyenXe = {}
        TuyenXe["IDTuyen"] = rowk['IDTuyen']
        TuyenXe["DiemXuatPhat"] = rowk["DiemXuatPhat"]
        TuyenXe["DiemDen"] = rowk["DiemDen"]
        chuyenxe['TuyenXe']=TuyenXe

        chuyenxe["GiaVe"] = rowk["GiaVe"]
        chuyenxe["QuangDuong"] = rowk["QuangDuong"]
        chuyenxe["ThoiGian"] = rowk["ThoiGianAsText"]

    
    chuyenxe['NgayXuatPhat'] = row['NgayXuatPhat']
    chuyenxe['ThoiGianXuatPhat'] = row['ThoiGianKhoiHanh']
    chuyenxe['ThoiGian']=row['ThoiGian']
    chuyenxe['NgayDen'] = row['NgayDen']
    chuyenxe['ThoiGianDen'] = row['ThoiGianDen']
    chuyenxe['GiaVe'] = row['GiaVe']
    
    rows = df.loc[df['ChuyenId'] == chuyenxe['IDChuyen']]
    DSGhe=[]
    for index, row in rows.iterrows():
        #Lưu tình trạng ghế vào 1 dict
        Ghe = {}
        Ghe["MaGhe"] = row["MaGhe"]
        Ghe["TinhTrang"] = row["TinhTrang"]
        if row["TinhTrang"]==1:
            NguoiMua={}
            NguoiMua["Ten"]=row["Ten"]
            NguoiMua["SDT"]=row["SDT"]
            NguoiMua["Email"]=row["Email"]
            Ghe["NguoiMua"]=NguoiMua
        #Thêm ghế vào danh sách ghế
        DSGhe.append(Ghe)
    chuyenxe['DSGhe']=DSGhe
    print(chuyenxe)
    collection.insert_one(chuyenxe)

    




