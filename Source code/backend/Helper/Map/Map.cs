using System.Net;

namespace Helper.Map;
public class Map{
    private readonly HttpClient _client = new HttpClient();

    public string? Address{ get; set; }
    public float Longtitude{ get; set; }
    public float Latidude{ get; set; }
    
    public string getUrlGetLocation( string? address ){
        if( address == null || address.Count() == 0 )
            address = Address;
        if( address == null || address.Count() == 0 )
            return "";
        
        string? url = Configuration.GetConfiguration()["Map:Geoapify"];
        if( url == null )
            throw new Exception("Missing url for api configuration in appsetting.json");
        
        url += "geocode/search?";
        url += "&mode=medium_truck";
        url += $"text={address}";
        url += "&filter=countrycode:vn"; 
        string? apiKey = Configuration.GetConfiguration()["Map:Apikey"];
        if( apiKey == null )
            throw new Exception("Missing apikey configuration in appsetting.json");
        url += "&format=json";
        url += $"&apiKey={apiKey}";
        return url;
    }

    public async Task<string> GetCoordinate( string geoLocationURL ){
        HttpResponseMessage response = await _client.GetAsync( geoLocationURL );
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine( responseBody );
        return "";
    }
}
