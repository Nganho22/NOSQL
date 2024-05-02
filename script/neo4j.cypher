LOAD CSV FROM 'file: ///tuyen.csv' AS row FIELDTERMINATOR ';'
WITH row
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
  RETURN a.IDTuyen, a.GiaVe, a.QuangDuong, a.ThoiGian
