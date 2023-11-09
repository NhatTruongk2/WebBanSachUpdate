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
                case "Them":
                case "Sua":
                    // Add parameters for updating or adding a book
                    cm.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);
                    cm.Parameters.Add("@TenSach", SqlDbType.NVarChar, 255).Value = Request["TenSach"];
                    cm.Parameters.Add("@GiaBan", SqlDbType.Decimal).Value = decimal.Parse(Request["GiaBan"]);
                    cm.Parameters.Add("@MoTa", SqlDbType.NVarChar, -1).Value = Request["MoTa"];
                    cm.Parameters.Add("@AnhBia", SqlDbType.NVarChar, 255).Value = Request["AnhBia"];
                    cm.Parameters.Add("@NgayCapNhat", SqlDbType.DateTime).Value = DateTime.Parse(Request["NgayCapNhat"]);
                    cm.Parameters.Add("@SoLuongTon", SqlDbType.Int).Value = int.Parse(Request["SoLuongTon"]);
                    cm.Parameters.Add("@MaNXB", SqlDbType.Int).Value = int.Parse(Request["MaNXB"]);
                    cm.Parameters.Add("@MaChuDe", SqlDbType.Int).Value = int.Parse(Request["MaChuDe"]);
                    break;
            }

            switch (action)
            {
                case "Sua":
                case "Xoa":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);
                    break;
            }

            switch (action)
            {
                case "TimKiem":
                    // Add parameters for searching books
                    cm.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);
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


        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            switch (action)
            {
              
                case "LietKeSach": 
                    Sach(action);    
                    break;
                case "LietKeChuDe":
                    ChuDe(action);
                    break;
                case "LietKeTacGia":
                    TacGia(action);
                    break;


            }

        }
       




    }
}