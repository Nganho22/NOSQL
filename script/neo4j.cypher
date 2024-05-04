// Insert ThanhPho
LOAD CSV FROM 'file: ///tp.csv' AS row FIELDTERMINATOR ';'
WITH row
WHERE row[0] IS NOT null
UNWIND RANGE(0, size(row) - 1) AS columnNumber
WITH row, columnNumber
MERGE (a:ThanhPho {
  IDThanhPho: row[0],
  TenThanhPho:
  
  
CASE WHEN row[1] IS null THEN 'null' ELSE row[1] END
  })
  RETURN a.IDThanhPho, a.TenThanhPho;
  
// Insert Tuyen
  LOAD CSV FROM 'file: ///tuyen.csv' AS row FIELDTERMINATOR ';'
  WITH row
  WHERE row[0] IS NOT null
  UNWIND RANGE(0, size(row) - 1) AS columnNumber
  WITH row, columnNumber
  MERGE (a:Tuyen {
    IDTuyen: row[0],
    GiaVe:
    
    
CASE WHEN row[1] IS null THEN 'null' ELSE row[1] END,
    QuangDuong:
    
    
CASE WHEN row[2] IS null THEN 'null' ELSE row[2] END,
    ThoiGian:
    
    
CASE WHEN row[3] IS null THEN 'null' ELSE row[3] END
    })
    RETURN a.IDTuyen, a.GiaVe, a.QuangDuong, a.ThoiGian;
    
//Insert Ben
    LOAD CSV FROM 'file: ///ben.csv' AS row FIELDTERMINATOR ';'
    WITH row
    WHERE row[0] IS NOT null
    UNWIND RANGE(0, size(row) - 1) AS columnNumber
    WITH row, columnNumber
    MERGE (a:Ben {
      IDBen: row[0],
      TenBen:
      
      
CASE WHEN row[1] IS null THEN 'null' ELSE row[1] END
      })
      RETURN a.IDBen, a.TenBen;
      
// Insert LoaiXe
      LOAD CSV FROM 'file: ///loaixe.csv' AS row FIELDTERMINATOR ';'
      WITH row
      WHERE row[0] IS NOT null
      UNWIND RANGE(0, size(row) - 1) AS columnNumber
      WITH row, columnNumber
      MERGE (a:LoaiXe {
        IDLoaiXe: row[0],
        TenLoaiXe:
        
        
CASE WHEN row[1] IS null THEN 'null' ELSE row[1] END
        })
        RETURN a.IDLoaiXe, a.TenLoaiXe;
        
//Quan he tuyen & loaixe
        LOAD CSV FROM 'file: ///tuyen_loaixe.csv' AS row FIELDTERMINATOR ';'
        WITH row
        WHERE row[0] IS NOT null AND row[1] IS NOT null
        MATCH (t:Tuyen { IDTuyen: row[0] }), (lx:LoaiXe {TenLoaiXe: row[1]})
        CREATE (t)-[:dung]->(lx);
        
//Quan he tuyen & tp_xuatphat
        LOAD CSV FROM 'file: ///tuyen_tp.csv' AS row FIELDTERMINATOR ';'
        WITH row
        WHERE row[0] IS NOT null AND row[1] IS NOT null AND row[2] IS NOT null
        MATCH (t:Tuyen { IDTuyen: row[0] }), (tpxuatphat:ThanhPho {IDThanhPho: row[1]})
        CREATE (t)-[:XuatPhatTu]->(tpxuatphat);
        
//Quan he tuyen & tp_den
        LOAD CSV FROM 'file: ///tuyen_tp.csv' AS row FIELDTERMINATOR ';'
        WITH row
        WHERE row[0] IS NOT null AND row[1] IS NOT null AND row[2] IS NOT null
        MATCH (t:Tuyen { IDTuyen: row[0] }), (tpden:ThanhPho {IDThanhPho: row[2]})
        CREATE (t)-[:Den]->(tpden);
        
//Quan he tuyen & ben den
        LOAD CSV FROM 'file: ///tuyen_benden.csv' AS row FIELDTERMINATOR ';'
        WITH row
        WHERE row[0] IS NOT null AND row[1] IS NOT null
        MATCH (t:Tuyen { IDTuyen: row[0] }), (benden:Ben {IDBen: row[1]})
        CREATE (t)-[:Tra]->(benden);
        
//Quan he tuyen & ben di
        LOAD CSV FROM 'file: ///tuyen_bendi.csv' AS row FIELDTERMINATOR ';'
        WITH row
        WHERE row[0] IS NOT null AND row[1] IS NOT null
        MATCH (t:Tuyen { IDTuyen: row[0] }), (bendi:Ben {IDBen: row[1]})
        CREATE (t)-[:Don]->(bendi);
