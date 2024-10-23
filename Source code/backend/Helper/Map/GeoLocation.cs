#nullable disable

namespace Helper.Map;
public class DataSource{
    string sourcename{ get; set; }
    string attribution{ get; set; }
    string license{ get; set; }
    string url{ get; set; }
}

public class TimeZone{
    string name{ get; set; }
    string offset_STD{ get; set; }
    string offset_DST{ get; set; }
    float offset_STD_seconds{ get; set; }
    float offset_DST_seconds{ get; set; }
}

public class Rank{
    string match_type{ get; set; }
    float importance{ get; set; }
    float popularity{ get; set; }
    float confidence{ get; set; }
    float confidence_city_level{ get; set; }
}

public class BoundingBox{
    float lon1{ get; set; }
    float lat1{ get; set; }
    float lon2{ get; set; }
    float lat2{ get; set; }
}

public class GeoLocation{
    string name{ get; set; }
    string country	{ get; set; }
    string country_code{ get; set; }
    string city{ get; set; }
    string postcode{ get; set; }
    string suburb{ get; set; }
    string street{ get; set; }
    string result_type{ get; set; }
    string formatted{ get; set; }
    string address_line1{ get; set; }
    string address_line2{ get; set; }
    string plus_code{ get; set; }
    string plus_code_short{ get; set; }
    string place_id	{ get; set; }
    float lon{ get; set; }
    float lat{ get; set; }

    DataSource datasource{ get; set; }
    TimeZone timezone{ get; set; }
    Rank rank{ get; set; }
    BoundingBox bbox{ get; set; }
}
