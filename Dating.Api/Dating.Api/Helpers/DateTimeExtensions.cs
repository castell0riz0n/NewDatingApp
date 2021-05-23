using System;
using System.Security.Cryptography.Xml;

namespace Dating.Api.Helpers
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob > today.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}