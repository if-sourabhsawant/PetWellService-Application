namespace AuthApplication.Models
{
    public class User
    {
        // Matches the 'users' table
        public long? AreaId { get; set; }
        public long? CityId { get; set; }
        public long? RoleId { get; set; }
        public long UserId { get; set; }
        public string AadharNo { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string PhoneNo { get; set; }

        // Navigation properties
        public City City { get; set; }
        public Area Area { get; set; }
        public Role Role { get; set; }
    }

    public class Area
    {
        // Matches the 'areas' table
        public long AreaId { get; set; }
        public long? CityId { get; set; }
        public string AreaName { get; set; }
        public City City { get; set; }
    }

    public class City
    {
        // Matches the 'city' table
        public long CityId { get; set; }
        public string CityName { get; set; }
    }

    public class Role
    {
        // Matches the 'roles' table
        public long RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
