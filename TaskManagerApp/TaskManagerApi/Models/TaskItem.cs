
namespace TaskManagerApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
