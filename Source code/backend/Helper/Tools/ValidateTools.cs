namespace Helper.Tools;

public static class Validate{

    public static bool IsEmpty( string target ){
        if( target == null )
            return true;
        if( target.Count() == 0 )
            return true;
        return false;
    }

}
