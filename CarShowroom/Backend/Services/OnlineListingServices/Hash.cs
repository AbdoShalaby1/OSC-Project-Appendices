using System.Security.Cryptography;
using System.Text;

namespace CarShowroom.Services.OnlineListingServices
{
    public class Hash
    {
        public static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

    }
}
