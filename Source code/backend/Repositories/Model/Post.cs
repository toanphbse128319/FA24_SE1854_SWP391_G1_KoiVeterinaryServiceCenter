#nullable disable
using System.ComponentModel.DataAnnotations.Schema;

[Table("Post")]
public class Post{

    public string PostID { get; set; }
    public string PostName { get; set; }
    public string PostCategoryID { get; set; }
    public string Context { get; set; }

}
