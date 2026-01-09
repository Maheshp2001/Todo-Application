using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoListApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedIdentityLatest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "userMailId",
                table: "TodoItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userMailId",
                table: "TodoItems");
        }
    }
}
