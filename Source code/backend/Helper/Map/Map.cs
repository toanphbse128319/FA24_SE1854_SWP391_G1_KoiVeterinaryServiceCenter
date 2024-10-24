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
        
        url += "geocode/search";
        url += "?mode=medium_truck";
        url += $"&text={address}";
        url += "&filter=countrycode:vn"; 
        string? apiKey = Configuration.GetConfiguration()["Map:Apikey"];
        if( apiKey == null )
            throw new Exception("Missing apikey configuration in appsetting.json");
        url += "&format=json";
        url += $"&apiKey={apiKey}";
        return url;
    }

    public async Task<string> GetCoordinate( string geoLocationURL ){
        private string jsonString = "{\"results\":[{\"datasource\":{\"sourcename\":\"openstreetmap\",\"attribution\":\"© OpenStreetMap contributors\",\"license\":\"Open Database License\",\"url\":\"https://www.openstreetmap.org/copyright\"},\"name\":\"Nguyễn Xiển\",\"country\":\"Vietnam\",\"country_code\":\"vn\",\"city\":\"Thủ Đức\",\"postcode\":\"71216\",\"suburb\":\"Long Thanh My Ward\",\"street\":\"Nguyễn Xiển\",\"lon\":106.8291513,\"lat\":10.8433891,\"result_type\":\"street\",\"formatted\":\"Nguyễn Xiển, Long Thanh My Ward, Thủ Đức, 71216, Vietnam\",\"address_line1\":\"Nguyễn Xiển\",\"address_line2\":\"Long Thanh My Ward, Thủ Đức, 71216, Vietnam\",\"timezone\":{\"name\":\"Asia/Ho_Chi_Minh\",\"offset_STD\":\"+07:00\",\"offset_STD_seconds\":25200,\"offset_DST\":\"+07:00\",\"offset_DST_seconds\":25200},\"plus_code\":\"7P28RRVH+9M\",\"plus_code_short\":\"RRVH+9M Thủ Đức, Vietnam\",\"rank\":{\"importance\":0.4533433333333333,\"popularity\":3.6273334104369215,\"confidence\":0,\"confidence_city_level\":1,\"match_type\":\"match_by_street\"},\"place_id\":\"51e63b9dd010b55a4059129b34b2d0af2540f00102f90141107a4800000000c0020492030f4e677579e1bb856e205869e1bb836e\",\"bbox\":{\"lon1\":106.8286808,\"lat1\":10.842821,\"lon2\":106.8295841,\"lat2\":10.844353}},{\"datasource\":{\"sourcename\":\"openstreetmap\",\"attribution\":\"© OpenStreetMap contributors\",\"license\":\"Open Database License\",\"url\":\"https://www.openstreetmap.org/copyright\"},\"name\":\"Nguyễn Xiển\",\"country\":\"Vietnam\",\"country_code\":\"vn\",\"city\":\"Thủ Đức\",\"postcode\":\"71300\",\"suburb\":\"Long Thanh My Ward\",\"street\":\"Nguyễn Xiển\",\"lon\":106.8337123,\"lat\":10.8534362,\"result_type\":\"street\",\"formatted\":\"Nguyễn Xiển, Long Thanh My Ward, Thủ Đức, 71300, Vietnam\",\"address_line1\":\"Nguyễn Xiển\",\"address_line2\":\"Long Thanh My Ward, Thủ Đức, 71300, Vietnam\",\"timezone\":{\"name\":\"Asia/Ho_Chi_Minh\",\"offset_STD\":\"+07:00\",\"offset_STD_seconds\":25200,\"offset_DST\":\"+07:00\",\"offset_DST_seconds\":25200},\"plus_code\":\"7P28VR3M+9F\",\"plus_code_short\":\"VR3M+9F Thủ Đức, Vietnam\",\"rank\":{\"importance\":0.4533433333333333,\"popularity\":3.332700177269517,\"confidence\":0,\"confidence_city_level\":1,\"match_type\":\"match_by_street\"},\"place_id\":\"5178b1d58a5bb55a4059ee71f096f5b42540f00102f9012c01f60100000000c0020492030f4e677579e1bb856e205869e1bb836e\",\"bbox\":{\"lon1\":106.8313404,\"lat1\":10.8480687,\"lon2\":106.835932,\"lat2\":10.8583696}},{\"country_code\":\"vn\",\"street\":\"Nguyễn Xiển\",\"country\":\"Vietnam\",\"county\":\"Quan 8\",\"datasource\":{\"sourcename\":\"openstreetmap\",\"attribution\":\"© OpenStreetMap contributors\",\"license\":\"Open Database License\",\"url\":\"https://www.openstreetmap.org/copyright\"},\"state\":\"Ho Chi Minh\",\"city\":\"Ho Chi Minh City\",\"lon\":106.832277,\"lat\":10.895389,\"result_type\":\"street\",\"formatted\":\"Nguyễn Xiển, Ho Chi Minh City, Ho Chi Minh, Vietnam\",\"address_line1\":\"Nguyễn Xiển\",\"address_line2\":\"Ho Chi Minh City, Ho Chi Minh, Vietnam\",\"timezone\":{\"name\":\"Asia/Ho_Chi_Minh\",\"offset_STD\":\"+07:00\",\"offset_STD_seconds\":25200,\"offset_DST\":\"+07:00\",\"offset_DST_seconds\":25200},\"plus_code\":\"7P28VRWJ+5W\",\"plus_code_short\":\"VRWJ+5W Ho Chi Minh City, Quan 8, Vietnam\",\"rank\":{\"popularity\":4.002276896025924,\"confidence\":0,\"confidence_city_level\":1,\"match_type\":\"match_by_street\"},\"place_id\":\"51a20dc00644b55a40597365506d70ca2540c00204e203266f70656e7374726565746d61703a7374726565743a706f6c796c696e653a3330363732383138\",\"bbox\":{\"lon1\":106.831047,\"lat1\":10.892438,\"lon2\":106.83351,\"lat2\":10.898342}},{\"country_code\":\"vn\",\"street\":\"Đường Nguyễn Xiển\",\"country\":\"Vietnam\",\"county\":\"Quan 8\",\"datasource\":{\"sourcename\":\"openstreetmap\",\"attribution\":\"© OpenStreetMap contributors\",\"license\":\"Open Database License\",\"url\":\"https://www.openstreetmap.org/copyright\"},\"state\":\"Ho Chi Minh\",\"city\":\"Ho Chi Minh City\",\"lon\":106.830242,\"lat\":10.824131,\"result_type\":\"street\",\"formatted\":\"Đường Nguyễn Xiển, Ho Chi Minh City, Ho Chi Minh, Vietnam\",\"address_line1\":\"Đường Nguyễn Xiển\",\"address_line2\":\"Ho Chi Minh City, Ho Chi Minh, Vietnam\",\"timezone\":{\"name\":\"Asia/Ho_Chi_Minh\",\"offset_STD\":\"+07:00\",\"offset_STD_seconds\":25200,\"offset_DST\":\"+07:00\",\"offset_DST_seconds\":25200},\"plus_code\":\"7P28RRFJ+M3\",\"plus_code_short\":\"RRFJ+M3 Ho Chi Minh City, Quan 8, Vietnam\",\"rank\":{\"popularity\":3.588289864682195,\"confidence\":0,\"confidence_city_level\":1,\"match_type\":\"match_by_street\"},\"place_id\":\"51007157af22b55a4059533d997ff4a52540c00204e203266f70656e7374726565746d61703a7374726565743a706f6c796c696e653a3330363732383139\",\"bbox\":{\"lon1\":106.829375,\"lat1\":10.814362,\"lon2\":106.8341,\"lat2\":10.834379}},{\"country_code\":\"vn\",\"housenumber\":\"807\",\"street\":\"Nguyễn Xiển\",\"country\":\"Vietnam\",\"county\":\"Quan 8\",\"datasource\":{\"sourcename\":\"openstreetmap\",\"attribution\":\"© OpenStreetMap contributors\",\"license\":\"Open Database License\",\"url\":\"https://www.openstreetmap.org/copyright\"},\"state\":\"Ho Chi Minh\",\"city\":\"Thủ Đức\",\"lon\":106.831522,\"lat\":10.848686,\"result_type\":\"building\",\"suburb\":\"Long Thanh My Ward\",\"postcode\":\"71300\",\"formatted\":\"807, Nguyễn Xiển, Long Thanh My Ward, Thủ Đức, Ho Chi Minh 71300, Vietnam\",\"address_line1\":\"807, Nguyễn Xiển\",\"address_line2\":\"Long Thanh My Ward, Thủ Đức, Ho Chi Minh 71300, Vietnam\",\"timezone\":{\"name\":\"Asia/Ho_Chi_Minh\",\"offset_STD\":\"+07:00\",\"offset_STD_seconds\":25200,\"offset_DST\":\"+07:00\",\"offset_DST_seconds\":25200},\"plus_code\":\"7P28RRXJ+FJ\",\"plus_code_short\":\"RRXJ+FJ Thủ Đức, Quan 8, Vietnam\",\"rank\":{\"popularity\":3.3565100196353987,\"confidence\":0,\"confidence_city_level\":1,\"match_type\":\"match_by_building\"},\"place_id\":\"51e4f90ca837b55a40596825adf886b22540f00103f901c0a202c002000000c00203e203266f70656e7374726565746d61703a616464726573733a6e6f64652f3131383131333332383030\"}],\"query\":{\"text\":\"Tp, Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh 71200, Vietnam\",\"parsed\":{\"house\":\"tp nguyễn xiển long thạnh mỹ\",\"suburb\":\"quận 9\",\"postcode\":\"71200\",\"city\":\"hồ chí minh\",\"country\":\"vietnam\",\"expected_type\":\"amenity\"}}}";
        HttpResponseMessage response = await _client.GetAsync( geoLocationURL );
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine( responseBody );
        return "";
    }
}
