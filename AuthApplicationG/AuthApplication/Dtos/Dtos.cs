namespace AuthApplication.Dtos
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponse
    {
        public string Status { get; set; }
        public UserData Data { get; set; }
    }

    public class UserData
    {
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNo { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string AadharNo { get; set; }
        public string Address { get; set; }
        public CityDto City { get; set; }
        public AreaDto Area { get; set; }
        public RoleDto Role { get; set; }
    }

    public class CityDto
    {
        public long CityId { get; set; }
        public string CityName { get; set; }
    }

    public class AreaDto
    {
        public long AreaId { get; set; }
        public string AreaName { get; set; }
        public CityDto City { get; set; }
    }

    public class RoleDto
    {
        public long RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
