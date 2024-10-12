using Repositories.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
