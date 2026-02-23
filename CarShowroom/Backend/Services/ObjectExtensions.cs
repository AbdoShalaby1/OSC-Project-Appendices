using System.Collections;
using System.Linq;
using System.Reflection;

public static class ObjectExtensions
{
    public static bool AreAllPropertiesNotNull(this object obj)
    {
        if (obj == null)
        {
            return false;
        }

        // Get all public properties of the object's type
        PropertyInfo[] properties = obj.GetType().GetProperties();

        // Check if any property value is null
        bool anyNull = properties
            .Any(prop => prop.GetValue(obj) == null || prop.GetValue(obj) as string == "" || (prop.GetValue(obj) as IList)?.Count == 0);

        return !anyNull; // Return true if NO properties are null
    }

    public static void PrintObjectProperties(this object obj)
    {
        if (obj == null)
        {
            Console.WriteLine("Object is null.");
            return;
        }

        Console.WriteLine($"--- Properties of {obj.GetType().Name} ---");
        PropertyInfo[] properties = obj.GetType().GetProperties();
        foreach (PropertyInfo prop in properties)
        {
            object? value = prop.GetValue(obj, null);
            Console.WriteLine($"{prop.Name}: {value}");
        }
    }
}
