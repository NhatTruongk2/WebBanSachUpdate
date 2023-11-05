using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using Newtonsoft.Json;

namespace TacGia
{
    public partial class TacGiaAPI : Page
    {
        void HandleTacGia(string action)
        {
            // Thay đổi chuỗi kết nối dựa trên cấu hình của bạn
            string connectionString = "Data Source=LAPTOP-ECOVO9GP\\SQLEXPRESS;Initial Catalog=QuanLyBanSach;Integrated Security=True";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand cmd = new SqlCommand("sp_TacGia", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@action", SqlDbType.NVarChar, 20).Value = action;

                    if (action == "Them" || action == "Sua")
                    {
                        cmd.Parameters.Add("@MaTacGia", SqlDbType.Int).Value = int.Parse(Request["MaTacGia"]);
                        cmd.Parameters.Add("@TenTacGia", SqlDbType.NVarChar, 255).Value = Request["TenTacGia"];
                        cmd.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 255).Value = Request["DiaChi"];
                        cmd.Parameters.Add("@TieuSu", SqlDbType.NVarChar, 255).Value = Request["TieuSu"];
                        cmd.Parameters.Add("@DienThoai", SqlDbType.NVarChar, 15).Value = Request["DienThoai"];
                    }

                    if (action == "TimKiem")
                    {
                        cmd.Parameters.Add("@TenTacGia", SqlDbType.NVarChar, 255).Value = Request["TenTacGia"];
                    }

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        DataTable dataTable = new DataTable();
                        dataTable.Load(reader);

                        // Chuyển dữ liệu từ DataTable thành JSON
                        string jsonResult = ConvertDataTableToJson(dataTable);

                        Response.Write(jsonResult);
                    }
                }
            }
        }

        private string ConvertDataTableToJson(DataTable dataTable)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;

            foreach (DataRow dataRow in dataTable.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn column in dataTable.Columns)
                {
                    row.Add(column.ColumnName, dataRow[column]);
                }
                rows.Add(row);
            }

            return JsonConvert.SerializeObject(rows); // Sử dụng JsonConvert.SerializeObject từ JSON.NET
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            if (action == "Them" || action == "Sua" || action == "Xoa" || action == "TimKiem" || action == "LietKe")
            {
                HandleTacGia(action);
            }
        }
    }
}