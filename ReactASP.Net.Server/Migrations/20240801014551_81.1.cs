using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactASP.Net.Server.Migrations
{
    /// <inheritdoc />
    public partial class _811 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string[]>(
                name: "Department",
                table: "Employees",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Department",
                table: "Employees");
        }
    }
}
