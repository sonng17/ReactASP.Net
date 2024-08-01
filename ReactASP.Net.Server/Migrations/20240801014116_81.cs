using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactASP.Net.Server.Migrations
{
    /// <inheritdoc />
    public partial class _81 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeCount",
                table: "Departments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeCount",
                table: "Departments");
        }
    }
}
