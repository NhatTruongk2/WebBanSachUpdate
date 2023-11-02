using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;

namespace websach
{
    public partial class api : Page
    {
        void HandleChiTietDonHang(string action)
        {
            using (SqlConnection connection = new SqlConnection("your_connection_string_here"))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand("sp_ChiTietDonHang", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@MaDonHang", SqlDbType.Int).Value = int.Parse(Request["MaDonHang"]);
                    cmd.Parameters.Add("@MaSach", SqlDbType.Int).Value = int.Parse(Request["MaSach"]);

                    if (action == "Add" || action == "Edit")
                    {
                        cmd.Parameters.Add("@SoLuong", SqlDbType.Int).Value = int.Parse(Request["SoLuong"]);
                        cmd.Parameters.Add("@DonGia", SqlDbType.NChar, 10).Value = Request["DonGia"];
                    }

                    cmd.Parameters.Add("@Action", SqlDbType.NVarChar, 50).Value = action;

                    string jsonResult = (string)cmd.ExecuteScalar();
                    Response.Write(jsonResult);
                }
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            if (action == "Add" || action == "Edit" || action == "Delete" || action == "Search")
            {
                HandleChiTietDonHang(action);
            }
        }
    }
}
