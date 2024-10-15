using Repositories.Model;

namespace Repositories.Repository
{
    public class FeedbackRepository : GenericRepository<Feedback>
    {
        public FeedbackRepository(Context context)
            : base(context)
        {
        }

        public Boolean  SaveFeedBack(Feedback feedback)
        {
            int index = base.GetAll().Count+1;          
            feedback.FeedbackID = "F"+ index;
            base.Create(feedback);
            return true;
        }

        public async Task<int> SaveFeedbackAsync(Feedback feedback){
            int index = base.GetAll().Count+1;          
            feedback.FeedbackID = "F"+ index;
            return await base.CreateAsync(feedback);
        }
    }
}
