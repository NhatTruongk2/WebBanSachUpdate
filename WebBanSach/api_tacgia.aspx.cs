using SuatAn;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebBanSach
{
    public partial class api_tacgia : System.Web.UI.Page
    {
        void Sach(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_Sach", action);

            switch (action)
            {
                case "ThemSach":
                case "SuaSach":
                    // Add parameters for updating or adding a book
                    
                    cm.Parameters.Add("@TenSach", SqlDbType.NVarChar, 255).Value = Request["TenSach"];
                    cm.Parameters.Add("@GiaBan", SqlDbType.Decimal).Value = decimal.Parse(Request["GiaBan"]);
                    cm.Parameters.Add("@MoTa", SqlDbType.NVarChar, -1).Value = Request["MoTa"];
                    cm.Parameters.Add("@AnhBia", SqlDbType.NVarChar, 255).Value = Request["AnhBia"];
                    cm.Parameters.Add("@NgayCapNhat", SqlDbType.DateTime).Value = DateTime.Parse(Request["NgayCapNhat"]);
                    cm.Parameters.Add("@SoLuongTon", SqlDbType.Int).Value = Request["SoLuongTon"];
                    cm.Parameters.Add("@MaNXB", SqlDbType.Int).Value = Request["MaNXB"];
                    cm.Parameters.Add("@MaChuDe", SqlDbType.Int).Value = Request["MaChuDe"];
                    break;
            }

            switch (action)
            {
                case "SuaSach":
                case "XoaSach":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);
                    break;
            }

            switch (action)
            {
                case "TimKiemSach":
                    // Add parameters for searching books
                    cm.Parameters.Add("@TenSach", SqlDbType.NVarChar, 255).Value = Request["TenSach"];
                    break;
            }

            switch (action)
            {
                case "LietKeSach":
                    // No additional parameters needed for listing books
                    break;
            }



            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }


        void ChuDe(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_ChuDe", action);

            switch (action)
            {
                case "Them":
                case "Sua":
                    // Add parameters for updating or adding a book
                       cm.Parameters.Add("@MaChuDe", SqlDbType.Int).Value = int.Parse(Request["MaChuDe"]);
                    cm.Parameters.Add("@TenChuDe", SqlDbType.NVarChar, 255).Value = Request["TenChuDe"];
                   

                
                    break;
            }

            switch (action)
            {
                case "Sua":
                case "Xoa":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaChuDe", SqlDbType.Int).Value = int.Parse(Request["MaChuDe"]);
                    break;
            }

            switch (action)
            {
                case "TimKiem":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaChuDe", SqlDbType.Int).Value = int.Parse(Request["MaChuDe"]);
                    cm.Parameters.Add("@TenChuDe", SqlDbType.NVarChar, 255).Value = Request["TenChuDe"];
                    break;
            }

            switch (action)
            {
                case "LietKeChuDe":
                    // No additional parameters needed for listing books
                    break;
            }
            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }


        void TacGia(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_TacGia", action);

            switch (action)
            {
                case "ThemTacGia":
                case "SuaTacGia":
                    // Add parameters for updating or adding a book
                    cm.Parameters.Add("@MaTacGia", SqlDbType.Int).Value = int.Parse(Request["MaTacGia"]);
                    cm.Parameters.Add("@TenTacGia", SqlDbType.NVarChar, 255).Value = Request["TenTacGia"];
                    cm.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 255).Value = Request["DiaChi"];
                    cm.Parameters.Add("@TieuSu", SqlDbType.NVarChar, 255).Value = Request["TieuSu"];
                    cm.Parameters.Add("@DienThoai", SqlDbType.NVarChar, 15).Value = Request["Dienthoai"];


                    break;
            }

            switch (action)
            {
                case "SuaTacGia":
                case "XoaTacGia":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaTacGia", SqlDbType.Int).Value = int.Parse(Request["MaTacGia"]);
                    break;
            }

            switch (action)
            {
                case "TimKiemTacGia":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaTacGia", SqlDbType.Int).Value = int.Parse(Request["MaTacGia"]);
                 
                    break;
            }

            switch (action)
            {
                case "LietKeTacGia":
                    // No additional parameters needed for listing books
                    break;
            }
            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }



        void KhachHang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_KhachHang", action);

            switch (action)
            {
                case "ThemKhachHang":
                   
                    cm.Parameters.Add("@HoTen", SqlDbType.NVarChar, 255).Value = Request["HoTen"];
                    cm.Parameters.Add("@TaiKhoan", SqlDbType.NVarChar, 50).Value = Request["TaiKhoan"];
                    cm.Parameters.Add("@MatKhau", SqlDbType.NVarChar, -1).Value = Request["MatKhau"];
                    cm.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Request["Email"];
                    cm.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 255).Value = Request["DiaChi"];
                    cm.Parameters.Add("@DienThoai", SqlDbType.NVarChar, 15).Value = Request["DienThoai"];
                    cm.Parameters.Add("@GioiTinh", SqlDbType.NVarChar, 3).Value = Request["GioiTinh"];
                    cm.Parameters.Add("@NgaySinh", SqlDbType.DateTime).Value = Request["NgaySinh"];
                    break;
                case "SuaKhachHang":
                    // Add parameters for updating or adding a book
                   
                    cm.Parameters.Add("@HoTen", SqlDbType.NVarChar, 255).Value = Request["HoTen"];
                    cm.Parameters.Add("@TaiKhoan", SqlDbType.NVarChar, 50).Value = Request["TaiKhoan"];
                    cm.Parameters.Add("@MatKhau", SqlDbType.NVarChar, -1).Value = Request["MatKhau"];
                    cm.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Request["Email"];
                    cm.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 255).Value = Request["DiaChi"];
                    cm.Parameters.Add("@DienThoai", SqlDbType.NVarChar,15).Value = Request["DienThoai"];
                    cm.Parameters.Add("@GioiTinh", SqlDbType.NVarChar,3).Value = Request["GioiTinh"];
                    cm.Parameters.Add("@NgaySinh", SqlDbType.DateTime).Value = Request["NgaySinh"];
                    break;
            }

            switch (action)
            {
                case "SuaKhachHang":
                case "XoaKhachHang":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaKH", SqlDbType.Int).Value = Request["MaKH"];
                    break;
            }

            switch (action)
            {
                case "TimKiemKhachHang":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaKH", SqlDbType.Int).Value = Request["MaKH"];
                   
                    break;
            }

            switch (action)
            {
                case "LietKeKhachHang":
                    // No additional parameters needed for listing books
                    break;
            }

            switch (action)
            {
                case "DangNhap":
                    cm.Parameters.Add("@TaiKhoan", SqlDbType.NVarChar, 50).Value = Request["TaiKhoan"];
                    cm.Parameters.Add("@MatKhau", SqlDbType.NVarChar, -1).Value = Request["MatKhau"];
                    break;
            }
            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }


        void DonHang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_DonHang", action);

            switch (action)
            {
                case "ThemDonHang":
                case "SuaDonHang":
                    // Add parameters for updating or adding a book
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);
                    cm.Parameters.Add("@DaThanhToan", SqlDbType.Int).Value = int.Parse(Request["DaThanhToan"]);
                    cm.Parameters.Add("@TinhTrangDonHang", SqlDbType.Int).Value = int.Parse(Request["TinhTrangDonHang"]);
                    cm.Parameters.Add("@NgayGiao", SqlDbType.DateTime).Value = Request["NgayDat"];
                    cm.Parameters.Add("@NgayDat", SqlDbType.DateTime).Value = Request["NgayGiao"];
                    cm.Parameters.Add("@MaKH", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);




                    break;
            }

            switch (action)
            {
                case "SuaDonHang":
                case "XoaDonHang":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);
                    break;
            }

            switch (action)
            {
                case "TimKiemDonHang":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);

                    break;
            }

            switch (action)
            {
                case "LietKeDonHang":
                    // No additional parameters needed for listing books
                    break;
            }
            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }

        void ChiTietDonHang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("sp_ChiTietDonHang", action);

            switch (action)
            {
                case "ThemChiTietDonHang":
                case "SuaCTDH":
                    // Add parameters for updating or adding a book
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);
                    cm.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);
                    cm.Parameters.Add("@SoLuong", SqlDbType.Int).Value = int.Parse(Request["SoLuong"]);
                    cm.Parameters.Add("@DonGia", SqlDbType.NVarChar, 255).Value = Request["DonGia"];
                  


                    break;
            }

            switch (action)
            {
                case "SuaTacGia":
                case "XoaCTDH":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);
                    break;
            }

            switch (action)
            {
                case "TimKiemCTDH":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);

                    break;
            }

            switch (action)
            {
                case "LietKeChiTietDonHang":
                    // No additional parameters needed for listing books
                    break;
            }
            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }



        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            switch (action)
            {
              
                // các action dùng cho sách
                case "LietKeSach": 
                    Sach(action);    
                    break;
                case "TimKiemSach":
                    Sach(action);
                    break;
                case "SuaSach":
                    Sach(action);
                    break;
                case "XoaSach":
                    Sach(action);
                    break;
                case "ThemSach":
                    Sach(action);
                    break;

                // các action dùng cho chủ đề
                case "LietKeChuDe":
                    ChuDe(action);
                    break;

                // Các action dùng cho Tác giả


                case "LietKeTacGia":
                    TacGia(action);
                    break;


                    //các action dùng cho khách hàng

                case "LietKeKhachHang":
                    KhachHang(action);
                    break;
                case "ThemKhachHang":
                    KhachHang(action);
                    break;
                case "SuaKhachHang":
                    KhachHang(action);
                    break;
                case "XoaKhachHang":
                    KhachHang(action);
                    break;
                case "TimKiemKhachHang":
                    KhachHang(action);
                    break;
                case "DangNhap":
                    KhachHang(action);
                    break;

                //các action dùng cho chi tiết đơn hàng
                case "ThemDonHang":
                    DonHang(action);
                    break;
                case "SuaDonHang":
                    DonHang(action);
                    break;
                case "XoaDonHang":
                    DonHang(action);
                    break;
                case "TimKiemDonHang":
                    DonHang(action);
                    break;
                case "LietKeDonHang":
                    DonHang(action);
                    break;



            }

        }
       




    }
}