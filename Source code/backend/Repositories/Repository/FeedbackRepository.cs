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
            int index = base.GetAll().Count + 1;
            feedback.FeedbackID = "F" + index;
            base.Create(feedback);
            return true;
        }

        public async Task<Feedback> SaveAndGetFeedbackAsync(Feedback feedback){
            if (feedback.Description == null)
                feedback.Description = "";

            int index = base.GetAll().Count+1;          
            feedback.FeedbackID = "F"+ index;
            await base.CreateAsync(feedback);
            return feedback;
        }
    }
}
