using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class BaseDB
    {
        public static async Task<string> ExecuteSPAsync(string storedProcedure, string tvpName, string typeName, DataTable dataTable)
        {
            try
            {
                var str = Environment.GetEnvironmentVariable("ConnectionString"); 
                using SqlConnection conn = new(str);
                conn.Open();

                using SqlCommand cmd = new(storedProcedure, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                var tvParam = cmd.Parameters.AddWithValue(tvpName, dataTable);
                tvParam.SqlDbType = SqlDbType.Structured;
                tvParam.TypeName = typeName;
                var rows = await cmd.ExecuteNonQueryAsync();

                return "Success";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static DataTable CreateDataTable(string[] columns, string[][] data)
        {
            DataTable dt = new();
            foreach (string column in columns)
            {
                dt.Columns.Add(column);
            }

            for (var i = 0; i < data[0].Length; i++)
            {
                DataRow dr = dt.NewRow();
                for (var j = 0; j < columns.Length; j++)
                {
                    dr[columns[j]] = data[j][i];
                }

                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}
