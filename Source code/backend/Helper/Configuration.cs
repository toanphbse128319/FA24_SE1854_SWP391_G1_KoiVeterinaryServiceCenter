using Microsoft.Extensions.Configuration;

namespace Helper;

public class Configuration{
    public static IConfigurationRoot GetConfiguration()
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        return config;
    }
}
