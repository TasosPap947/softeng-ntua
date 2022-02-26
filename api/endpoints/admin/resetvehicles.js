const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const response = require("../../utilities/responseFunctions.js");
const { conString } = require("../../utilities/definitions.js");

function resetvehicles(req, res) {

  const con = mysql.createConnection(conString);

  const format = req.query.format;

  const delete_query = "DELETE FROM Vehicle";
  const insert_query = "INSERT INTO `Vehicle` VALUES ('AT19HLV57173',2004,'OO14E0167','olympia_odos','OO'),('AY38OQF67603',2020,'OO01A7197','olympia_odos','OO'),('BI87HYL81972',2020,'MR98F8272','moreas','MR'),('BK77KNV91142',2007,'OO67L7721','olympia_odos','OO'),('BM25PHF40639',2018,'AO19M3646','aodos','AO'),('BY85QGR11636',2018,'GF64H7689','gefyra','GF'),('BZ76ROL87339',2017,'AO94O1451','aodos','AO'),('CK97FAU13897',2007,'GF85Z5553','gefyra','GF'),('CM15YCB60994',2005,'EG87N4472','egnatia','EG'),('CP56DAO45598',2017,'GF96B8067','gefyra','GF'),('CR31GMR97972',2000,'EG56V3913','egnatia','EG'),('DO24BCW15511',2009,'KO87M8492','kentriki_odos','KO'),('DP11ENT03275',2008,'AO11L5271','aodos','AO'),('DV04FQL29609',2010,'AO87S8322','aodos','AO'),('DW44ZOO26361',2009,'EG74B6896','egnatia','EG'),('EC02LZC49528',2001,'EG23G6966','egnatia','EG'),('ED51EWW52190',2017,'KO38E3788','kentriki_odos','KO'),('EE22TMX10817',2001,'OO29X6651','olympia_odos','OO'),('EG95RTB75032',2013,'NE91T5473','nea_odos','NE'),('EM54HQI58682',2008,'OO58I4183','olympia_odos','OO'),('EN26OAB52983',2002,'GF51E2190','gefyra','GF'),('EV77EDV52985',2001,'NE31Q7933','nea_odos','NE'),('EZ65FLV39493',2012,'MR55V8401','moreas','MR'),('FL13UMN92207',2006,'KO37T8485','kentriki_odos','KO'),('FY47TUN40300',2002,'NE43B7275','nea_odos','NE'),('HA82SCK64299',2001,'MR30M7731','moreas','MR'),('HE38BQH01623',2016,'MR72G8045','moreas','MR'),('HR53SRO94328',2004,'MR93N1400','moreas','MR'),('HT62RDI04611',2000,'AO69I5108','aodos','AO'),('HW75BKT77773',2016,'KO82C5500','kentriki_odos','KO'),('IA29IQS63679',2010,'NE83K9493','nea_odos','NE'),('IC95TLY24827',2020,'OO65G9691','olympia_odos','OO'),('IN99SEN20660',2014,'EG47U1656','egnatia','EG'),('IO09FGE68100',2015,'GF87C4626','gefyra','GF'),('IW53OQE31439',2014,'EG05B7264','egnatia','EG'),('IX01MVL33676',2001,'KO57Z7727','kentriki_odos','KO'),('IZ65WAT29135',2002,'MR39O1247','moreas','MR'),('JD78PQD35395',2002,'EG13U6715','egnatia','EG'),('JE65QJK64802',2002,'GF48M7092','gefyra','GF'),('JF94VYA88954',2000,'OO49W8536','olympia_odos','OO'),('JO50FSF60755',2011,'KO95P1306','kentriki_odos','KO'),('JV67MTI17124',2000,'NE61X5911','nea_odos','NE'),('KB55KTM48860',2009,'KO72G8546','kentriki_odos','KO'),('KF48RSD79865',2012,'MR56E8319','moreas','MR'),('KW50MJG67260',2016,'GF84U4130','gefyra','GF'),('LC72NRN52084',2001,'OO85U6024','olympia_odos','OO'),('LG64ARC91224',2019,'AO27P4628','aodos','AO'),('LM86GYO69819',2010,'GF61W4412','gefyra','GF'),('MA30QLI76818',2019,'GF94Q2036','gefyra','GF'),('MP14WFM40909',2008,'GF62J1185','gefyra','GF'),('MQ65WJJ60020',2009,'KO53F1683','kentriki_odos','KO'),('MU06LHX94338',2016,'EG87C3789','egnatia','EG'),('MX39VOS38645',2018,'AO12K0807','aodos','AO'),('NO82BAX82566',2000,'NE74M6592','nea_odos','NE'),('NY14GZR94632',2011,'NE66B0405','nea_odos','NE'),('NZ35XLQ89678',2015,'NE71H2256','nea_odos','NE'),('OC94ASJ72024',2002,'AO19H6549','aodos','AO'),('OY94SZK34436',2007,'NE97X0282','nea_odos','NE'),('PD45WOT56494',2010,'NE55G3669','nea_odos','NE'),('PE73VJU23485',2010,'AO18S3731','aodos','AO'),('PF04UCA93312',2007,'GF84T8932','gefyra','GF'),('PM58XHX45588',2006,'NE66N5124','nea_odos','NE'),('QH15HWX24570',2009,'MR36J6829','moreas','MR'),('QN12NTR81378',2003,'GF26N8608','gefyra','GF'),('QN23UHH39091',2014,'MR58R4385','moreas','MR'),('QO68DIC93032',2016,'MR26E3126','moreas','MR'),('QO77TFN61853',2004,'KO80I5938','kentriki_odos','KO'),('QP02SYE47964',2010,'NE74M0871','nea_odos','NE'),('QR03XCJ37459',2014,'OO43C8099','olympia_odos','OO'),('QU94IGC75528',2003,'EG52J0268','egnatia','EG'),('QW79CHL42244',2006,'KO64Z6868','kentriki_odos','KO'),('QX75YWC61835',2019,'OO20E8329','olympia_odos','OO'),('RK48BOP88344',2016,'OO41Q9202','olympia_odos','OO'),('RR73DWB65452',2017,'AO13W1028','aodos','AO'),('RR98KQE80731',2020,'MR06V9056','moreas','MR'),('RV87TIY76692',2001,'KO69R5975','kentriki_odos','KO'),('SL09NOT64494',2005,'GF17K5976','gefyra','GF'),('SU00RDZ36214',2014,'AO31K4646','aodos','AO'),('SY96JDQ97089',2004,'AO88V0724','aodos','AO'),('TE24LCO18661',2009,'EG36L0177','egnatia','EG'),('TV81MAQ99005',2000,'EG00X1873','egnatia','EG'),('TZ48CCW54765',2015,'EG79G1284','egnatia','EG'),('UA13YTK28483',2020,'MR57I0349','moreas','MR'),('UF84JOS00561',2020,'GF26E1328','gefyra','GF'),('UO75YNW62238',2003,'KO75W9528','kentriki_odos','KO'),('UP28MBM38391',2010,'NE09V3603','nea_odos','NE'),('VJ92OYV94295',2000,'OO59B1482','olympia_odos','OO'),('VL67TFO75321',2007,'EG76E0993','egnatia','EG'),('VX68BAR38623',2005,'NE80E5551','nea_odos','NE'),('WG11QVY31890',2006,'OO68H9901','olympia_odos','OO'),('WU78BMX13511',2008,'GF52G9102','gefyra','GF'),('WY00MLL63827',2000,'KO44J2006','kentriki_odos','KO'),('XE59BZM26378',2020,'EG47I2811','egnatia','EG'),('XF28DGK65250',2021,'GF52T0389','gefyra','GF'),('XV40HUQ04740',2001,'OO26V4144','olympia_odos','OO'),('XV91YMP27722',2012,'MR63V2295','moreas','MR'),('YH66OKD41942',2019,'KO58G5356','kentriki_odos','KO'),('YL27IFD65117',2006,'AO49I8807','aodos','AO'),('YX66XYW62640',2014,'GF85R2347','gefyra','GF'),('ZY93PCY41868',2006,'KO91P5387','kentriki_odos','KO');";
  con.query(delete_query, (err, result) => {
    if (err) {
      const data = { "status": "failed", "message": err };
      response.general(res, 500, data, format);
    }
    else {
      con.query(insert_query, (err, result) => {
        if (err) {
          const data = { "status": "failed", "message": err };
          response.general(res, 500, data, format);
        }
        else {
          const data = { "status": "OK" };
          response.general(res, 200, data, format);
        }
      });
    }
    con.end();
  });
}

router.post("/admin/resetvehicles", resetvehicles);

module.exports = router;
