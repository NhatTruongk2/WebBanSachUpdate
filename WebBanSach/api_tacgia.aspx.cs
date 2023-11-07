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
                case "LietKe":
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
                case "Them":
                case "Sua":
                case "Xoa":
                case "TimKiem":
                case "LietKe":
                    Sach(action);
                    break;
            }
        }




    }
}