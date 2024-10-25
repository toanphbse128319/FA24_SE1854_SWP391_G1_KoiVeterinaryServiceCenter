#nullable disable

namespace Helper;

public class FileManager
{
    private string _filePath;

    public FileManager(string relativePath)
    {
        _filePath = Directory.GetCurrentDirectory() + relativePath;
        if (File.Exists(_filePath) == false)
            throw new FileNotFoundException("Directory: " + _filePath);

    }

    public string ReadFile()
    {
        StreamReader fileReader = File.OpenText(_filePath);
        string result = null;
        string sub;
        while ((sub = fileReader.ReadLine()) != null)
            result += (sub + '\n');

        return result;
    }
}
