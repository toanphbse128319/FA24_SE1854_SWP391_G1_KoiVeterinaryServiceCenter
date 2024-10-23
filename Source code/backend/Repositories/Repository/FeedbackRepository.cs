using Repositories.Model;

namespace Repositories.Repository
{
    public class FeedbackRepository : GenericRepository<Feedback>
    {
        public FeedbackRepository(Context context)
            : base(context)
        {
        }

        public Boolean SaveFeedBack(Feedback feedback)
        {
            feedback.FeedbackID = GetNextID("F");
            base.Create(feedback);
            return true;
        }

        public async Task<Feedback> SaveAndGetFeedbackAsync(Feedback feedback){
            if (feedback.Description == null)
                feedback.Description = "";
            feedback.FeedbackID = GetNextID("F");
            await base.CreateAsync(feedback);
            return feedback;
        }
    }
}
